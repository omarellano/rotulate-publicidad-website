/**
 * Rotulate Publicidad — Firebase Storage + Firestore + EmailJS Contact Form Logic
 * Manages file uploads, lead storage, rate limits, anti-spam, and email alerts.
 */

/* Se carga de forma diferida desde main.js cuando el usuario se acerca al
   formulario, así que DOMContentLoaded puede haber pasado ya. */
const initCotizacionForm = () => {
    // 1. Verify and obtain Supabase reference
    if (typeof window.supabaseClient === 'undefined') {
        console.error('Supabase Client not initialized. Form will not operate.');
        return;
    }

    const supabase = window.supabaseClient;

    // 2. Initialize EmailJS
    const EMAILJS_PUBLIC_KEY = "Rn8OVcLm0OQq3lrLQ";
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error('EmailJS SDK not loaded.');
    }

    // 3. DOM Elements
    const form = document.getElementById('cotizar');
    const fileInput = document.getElementById('file-upload');
    const uploadZone = document.getElementById('upload-zone');
    const fileListDisplay = document.getElementById('upload-file-list');
    
    const progressWrap = document.getElementById('upload-progress-wrap');
    const progressBar = document.getElementById('upload-progress-bar');
    const progressLabel = document.getElementById('upload-progress-label');
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    // State
    let selectedFiles = [];
    let lastSubmitTime = parseInt(localStorage.getItem('last_submit_time') || '0', 10);

    const ALLOWED_EXTENSIONS = ['pdf', 'ai', 'psd', 'png', 'jpg', 'jpeg', 'zip', 'rar'];
    const MAX_FILE_SIZE = 24 * 1024 * 1024; // 24 MB

    // 4. File Selection and Drag-and-Drop
    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', (e) => {
            // Prevent opening dialog if clicking remove buttons
            if (e.target.closest('.ufi-remove')) return;
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            addFiles(fileInput.files);
            fileInput.value = ''; // Reset to allow same file selection
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('upload-zone--drag');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('upload-zone--drag');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('upload-zone--drag');
            if (e.dataTransfer.files.length) {
                addFiles(e.dataTransfer.files);
            }
        });
    }

    function addFiles(files) {
        formError.style.display = 'none';
        for (let file of files) {
            const ext = file.name.split('.').pop().toLowerCase();
            
            // Validate extension
            if (!ALLOWED_EXTENSIONS.includes(ext)) {
                showFormError(`El formato .${ext} no está permitido. Envía archivos vectoriales (AI, PDF, PSD), imágenes o ZIP.`);
                shakeField('upload-zone');
                return;
            }

            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                showFormError(`El archivo "${file.name}" supera el límite de 24 MB.`);
                shakeField('upload-zone');
                return;
            }

            const exists = selectedFiles.some(f => f.name === file.name && f.size === file.size);
            if (!exists) {
                selectedFiles.push(file);
            }
        }
        renderFileList();
    }

    function renderFileList() {
        fileListDisplay.innerHTML = '';
        if (selectedFiles.length === 0) {
            uploadZone.classList.remove('upload-zone--done');
            return;
        }
        uploadZone.classList.add('upload-zone--done');

        selectedFiles.forEach((file, index) => {
            const ext = file.name.split('.').pop().toLowerCase();
            const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
            
            const item = document.createElement('div');
            item.className = 'upload-file-item';
            item.innerHTML = `
                <span class="ufi-icon">${getFileIcon(ext)}</span>
                <div class="ufi-info">
                    <strong class="ufi-name"></strong>
                    <span>${sizeFormatted}</span>
                </div>
                <button type="button" class="ufi-remove" data-index="${index}" aria-label="Remover archivo">✕</button>
            `;
            item.querySelector('.ufi-name').textContent = file.name;
            fileListDisplay.appendChild(item);
        });

        // Event delegation for removal
        fileListDisplay.querySelectorAll('.ufi-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index, 10);
                selectedFiles.splice(idx, 1);
                renderFileList();
            });
        });
    }

    function getFileIcon(ext) {
        const icons = {
            pdf: '📄',
            ai: '🎨',
            psd: '🖼️',
            png: '🖼️',
            jpg: '🖼️',
            jpeg: '🖼️',
            zip: '📦',
            rar: '📦'
        };
        return icons[ext] || '📎';
    }

    // 5. Submission and Validation
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // A. Honeypot anti-spam check
        const honeypot = document.getElementById('form-temp-verify')?.value;
        if (honeypot) {
            console.warn('Submission blocked: Honeypot field was filled.');
            return; // Abort silently
        }

        // B. Rate limit check (60s)
        const now = Date.now();
        if (now - lastSubmitTime < 60000) {
            showFormError('Por favor, espera un minuto antes de enviar otra cotización.');
            return;
        }

        // C. Form values extraction
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const telefono = document.getElementById('telefono')?.value.trim();
        const servicio = document.getElementById('servicio')?.value;
        const mensaje = (document.getElementById('mensaje')?.value || '').trim().substring(0, 2000);

        // D. Form Validation
        if (!nombre || !email || !servicio) {
            shakeInvalid();
            return;
        }

        if (nombre.length > 100 || email.length > 254) {
            showFormError('Los datos ingresados exceden el límite de longitud permitido.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            shakeField('email');
            return;
        }

        if (telefono && !/^[\+]?[\d\s\-\(\)]{7,20}$/.test(telefono)) {
            shakeField('telefono');
            return;
        }

        // E. Form submission flow
        setLoading(true);
        formError.style.display = 'none';
        const uploadedFileUrls = [];

        try {
            // Step 1: Upload files to Supabase Storage (if any selected)
            if (selectedFiles.length > 0) {
                progressWrap.style.display = 'flex';
                
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    const timestamp = Date.now();
                    // Sanitize file name: remove non-alphanumeric/spaces/dots
                    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
                    const fileName = `${timestamp}_${sanitizedName}`;
                    
                    updateProgress(50, `Subiendo: ${file.name}`);
                    
                    const { data, error: uploadError } = await supabase.storage
                        .from('cotizaciones')
                        .upload(fileName, file, {
                            cacheControl: '3600',
                            upsert: false
                        });

                    if (uploadError) {
                        console.error(`Error uploading ${file.name}:`, uploadError);
                        throw new Error(`Error al subir ${file.name}. Inténtalo de nuevo.`);
                    }

                    // Get public URL
                    const { data: urlData } = supabase.storage
                        .from('cotizaciones')
                        .getPublicUrl(fileName);

                    uploadedFileUrls.push({ name: file.name, url: urlData.publicUrl });
                    updateProgress(100, `Completado: ${file.name}`);
                }
                
                // Hide progress bar once done
                progressWrap.style.display = 'none';
            }

            // Step 2: Save metadata to Supabase Database
            const leadData = {
                nombre,
                email,
                telefono: telefono || 'No proporcionado',
                servicio,
                mensaje: mensaje || 'Sin mensaje adicional',
                archivos: uploadedFileUrls
            };

            const { error: dbError } = await supabase
                .from('cotizaciones_web')
                .insert([leadData]);

            if (dbError) {
                console.error('Database insert failed:', dbError);
                throw new Error('Error al registrar la cotización. Inténtalo de nuevo.');
            }

            // Step 3: Trigger real-time EmailJS notification
            if (typeof emailjs !== 'undefined') {
                try {
                    const templateParams = {
                        from_name: nombre,
                        from_email: email,
                        phone: telefono || 'No proporcionado',
                        service: servicio,
                        message_details: mensaje || 'Sin mensaje adicional',
                        file_links: uploadedFileUrls.length > 0 
                            ? uploadedFileUrls.map(f => `${f.name}: ${f.url}`).join('\n') 
                            : 'Sin archivos adjuntos'
                    };

                    await emailjs.send("service_n44qqee", "template_wxr3rqu", templateParams);
                    console.log('EmailJS notification sent successfully.');
                } catch (emailError) {
                    console.error('EmailJS notification failed to send:', emailError);
                    // We do not throw the error here, so the user still gets the success screen
                    // since the data has already been saved to Supabase.
                }
            }

            // Step 4: Show Success Screen
            lastSubmitTime = Date.now();
            localStorage.setItem('last_submit_time', lastSubmitTime.toString());
            
            form.style.display = 'none';
            formSuccess.style.display = 'flex';
            selectedFiles = [];
            renderFileList();

            if (window.dataLayer) {
                window.dataLayer.push({ event: 'cotizacion_supabase_ok' });
                window.dataLayer.push({ event: 'cotizacion_firebase_ok' });
            }

        } catch (error) {
            console.error('Submission failed:', error);
            showFormError(error.message || 'Hubo un problema al procesar tu solicitud. Por favor escríbenos por WhatsApp o correo.');
        } finally {
            setLoading(false);
        }
    });

    // 6. Helpers
    function updateProgress(percent, text) {
        progressBar.style.width = `${percent}%`;
        progressLabel.textContent = `${text} (${Math.round(percent)}%)`;
    }

    function setLoading(active) {
        if (submitBtn) submitBtn.disabled = active;
        if (btnText) btnText.style.display = active ? 'none' : '';
        if (btnLoading) btnLoading.style.display = active ? 'inline' : 'none';
    }

    function showFormError(msg) {
        if (formError) {
            const p = formError.querySelector('p');
            if (p) p.textContent = '⚠️ ' + msg;
            formError.style.display = 'flex';
        }
    }

    function shakeInvalid() {
        form.querySelectorAll('input:invalid, select:invalid').forEach(el => {
            el.classList.add('input-shake');
            el.style.borderColor = 'var(--color-accent-orange)';
            setTimeout(() => { el.classList.remove('input-shake'); el.style.borderColor = ''; }, 600);
        });
    }

    function shakeField(id) {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('input-shake');
            el.style.borderColor = 'var(--color-accent-orange)';
            setTimeout(() => { el.classList.remove('input-shake'); el.style.borderColor = ''; }, 600);
        }
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCotizacionForm);
} else {
    initCotizacionForm();
}
