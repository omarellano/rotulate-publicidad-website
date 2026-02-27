/* ============================================================
   Rotulate Publicidad — Upload & Contact Form Logic
   Native file input + Formspree (no external upload service needed)
   ============================================================ */

/* ── Rate limiter básico anti-spam ────────────────────────── */
const RATE_LIMIT_MS = 60000; // 1 minuto entre envíos
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10 MB (límite Formspree free)
let lastSubmitTime = 0;

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Native File Input Setup ──────────────────────────── */
    const fileInput = document.getElementById('file-upload');
    const uploadZone = document.getElementById('upload-zone');
    const fileList = document.getElementById('upload-file-list');

    let selectedFiles = []; // stores the selected File objects

    /* ── 2. Click to open file picker ────────────────────────── */
    uploadZone.addEventListener('click', (e) => {
        if (e.target.closest('.upload-file-item')) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        addFiles(fileInput.files);
    });

    /* ── 3. Drag & Drop ──────────────────────────────────────── */
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

    /* ── 4. Add files & validate ─────────────────────────────── */
    function addFiles(newFiles) {
        for (const file of newFiles) {
            // Evitar duplicados por nombre+tamaño
            const exists = selectedFiles.some(f => f.name === file.name && f.size === file.size);
            if (!exists) {
                selectedFiles.push(file);
            }
        }

        // Validar tamaño total
        const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
        if (totalSize > MAX_TOTAL_SIZE) {
            showFormError('Los archivos exceden el límite de 10 MB. Reduce el tamaño o envía menos archivos.');
            selectedFiles = selectedFiles.slice(0, -newFiles.length); // revertir
        }

        renderFileList();
    }

    /* ── 5. Render uploaded file list ────────────────────────── */
    function renderFileList() {
        fileList.innerHTML = '';

        if (selectedFiles.length === 0) {
            uploadZone.classList.remove('upload-zone--done');
            return;
        }

        uploadZone.classList.add('upload-zone--done');

        selectedFiles.forEach((file, index) => {
            const ext = (file.name || '').split('.').pop().toLowerCase();
            const size = formatSize(file.size);

            const item = document.createElement('div');
            item.className = 'upload-file-item';

            const icon = document.createElement('span');
            icon.className = 'ufi-icon';
            icon.textContent = getFileIcon(ext);

            const info = document.createElement('div');
            info.className = 'ufi-info';

            const name = document.createElement('strong');
            name.textContent = file.name || 'Archivo';

            const sizeEl = document.createElement('span');
            sizeEl.textContent = size;

            info.appendChild(name);
            info.appendChild(sizeEl);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'ufi-remove';
            removeBtn.title = 'Quitar archivo';
            removeBtn.textContent = '✕';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                selectedFiles.splice(index, 1);
                renderFileList();
            });

            item.appendChild(icon);
            item.appendChild(info);
            item.appendChild(removeBtn);
            fileList.appendChild(item);
        });
    }

    function formatSize(bytes) {
        if (!bytes) return '';
        if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
        return (bytes / 1024).toFixed(0) + ' KB';
    }

    function getFileIcon(ext) {
        const icons = {
            pdf: '📄', ai: '🎨', psd: '🖼', png: '🖼', jpg: '🖼', jpeg: '🖼',
            svg: '🎨', eps: '🎨', zip: '📦', rar: '📦',
        };
        return icons[ext] || '📎';
    }

    /* ── 6. Form submission via FormData ─────────────────────── */
    const form = document.getElementById('cotizar');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvnypyr';

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Anti-spam: honeypot
        const honeypot = document.getElementById('website-url')?.value;
        if (honeypot) {
            console.warn('Bot detectado — envío bloqueado.');
            return;
        }

        // Anti-spam: rate limiting
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            const secsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
            showFormError(`Por favor espera ${secsLeft} segundos antes de enviar de nuevo.`);
            return;
        }

        // Validación básica
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const telefono = document.getElementById('telefono')?.value.trim();
        const servicio = document.getElementById('servicio')?.value;

        if (!nombre || !email || !servicio) {
            shakeInvalid();
            return;
        }

        // Validación de longitud máxima
        if (nombre.length > 100 || email.length > 254) {
            showFormError('Los datos ingresados exceden la longitud permitida.');
            return;
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.classList.add('input-shake');
                emailInput.style.borderColor = 'var(--color-accent-orange)';
                setTimeout(() => { emailInput.classList.remove('input-shake'); emailInput.style.borderColor = ''; }, 600);
            }
            return;
        }

        // Validación de formato de teléfono
        if (telefono && !/^[\+]?[\d\s\-\(\)]{7,20}$/.test(telefono)) {
            const telInput = document.getElementById('telefono');
            if (telInput) {
                telInput.classList.add('input-shake');
                telInput.style.borderColor = 'var(--color-accent-orange)';
                setTimeout(() => { telInput.classList.remove('input-shake'); telInput.style.borderColor = ''; }, 600);
            }
            return;
        }

        // Estado de carga
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        formError.style.display = 'none';

        const mensaje = (document.getElementById('mensaje')?.value || '').trim().substring(0, 2000);

        // Construir mensaje con info de archivos adjuntos
        let mensajeFinal = mensaje;
        if (selectedFiles.length > 0) {
            const fileNames = selectedFiles.map(f => `${f.name} (${formatSize(f.size)})`).join(', ');
            mensajeFinal += `\n\nArchivos adjuntos (${selectedFiles.length}): ${fileNames}\n(El cliente debe enviar los archivos por WhatsApp o email)`;
        }

        // Enviar solo datos de texto a Formspree (plan gratuito no soporta archivos)
        const formData = new FormData();
        formData.append('nombre', nombre.substring(0, 100));
        formData.append('email', email.substring(0, 254));
        formData.append('telefono', telefono.substring(0, 20));
        formData.append('servicio', servicio);
        formData.append('mensaje', mensajeFinal);

        try {
            const resp = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData,
            });

            if (resp.ok) {
                lastSubmitTime = Date.now();
                form.style.display = 'none';
                formSuccess.style.display = 'flex';
                if (window.dataLayer) {
                    window.dataLayer.push({ event: 'cotizacion_enviada' });
                }
                // Si tenía archivos, mostrar nota para enviarlos por WhatsApp
                if (selectedFiles.length > 0) {
                    const successP = formSuccess.querySelector('p');
                    if (successP) {
                        successP.innerHTML = 'Recibimos tu cotización. Te contactaremos en menos de 24 hrs.<br><strong>Envía tus archivos por <a href="https://wa.me/529984007987" target="_blank" rel="noopener noreferrer">WhatsApp</a> o a <a href="mailto:cotizaciones@rotulatepublicidad.com">cotizaciones@rotulatepublicidad.com</a></strong>';
                    }
                }
            } else {
                throw new Error(`Error del servidor: ${resp.status}`);
            }
        } catch (err) {
            console.error('Error al enviar formulario:', err);
            showFormError('Hubo un problema al enviar. Por favor escríbenos directamente por WhatsApp o al email.');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    function showFormError(msg) {
        const errorEl = document.getElementById('form-error');
        if (errorEl) {
            const p = errorEl.querySelector('p');
            if (p) p.textContent = '⚠️ ' + msg;
            errorEl.style.display = 'flex';
        }
    }

    function shakeInvalid() {
        const inputs = form.querySelectorAll('input:invalid, select:invalid');
        inputs.forEach((el) => {
            el.classList.add('input-shake');
            el.style.borderColor = 'var(--color-accent-orange)';
            setTimeout(() => { el.classList.remove('input-shake'); el.style.borderColor = ''; }, 600);
        });
    }
});
