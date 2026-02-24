/* ============================================================
   Rotulate Publicidad — Upload & Contact Form Logic
   Uses Uploadcare (free, up to 5 GB per file, no backend needed)
   ============================================================

   🔐 CONFIGURACIÓN REQUERIDA ANTES DE PRODUCCIÓN:
   1. Uploadcare: registrate en https://uploadcare.com y reemplaza
      'demopublickey' en index.html con tu Public Key real.
   2. Formspree: registrate en https://formspree.io, crea un form
      y reemplaza YOUR_FORM_ID abajo con tu ID real.
   ============================================================ */

/* ── Rate limiter básico anti-spam ────────────────────────── */
const RATE_LIMIT_MS = 60000; // 1 minuto entre envíos
let lastSubmitTime = 0;

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Uploadcare Widget Setup ─────────────────────────── */
    const widget = uploadcare && uploadcare.Widget('#file-upload');
    const uploadZone = document.getElementById('upload-zone');
    const fileList = document.getElementById('upload-file-list');
    const progressWrap = document.getElementById('upload-progress-wrap');
    const progressBar = document.getElementById('upload-progress-bar');
    const progressLabel = document.getElementById('upload-progress-label');

    let uploadedFileGroup = null; // stores the Uploadcare file group object

    if (widget) {
        // When files are selected / uploaded
        widget.onUploadComplete((fileGroup) => {
            uploadedFileGroup = fileGroup;
            renderFileList(fileGroup.files());
            progressWrap.style.display = 'none';
            uploadZone.classList.add('upload-zone--done');
        });

        // Progress tracking
        widget.onChange((fileGroup) => {
            if (!fileGroup) { renderFileList([]); return; }

            fileGroup.promise().progress((uploadInfo) => {
                const pct = Math.round((uploadInfo.progress || 0) * 100);
                progressWrap.style.display = 'flex';
                progressBar.style.width = pct + '%';
                progressLabel.textContent = `Subiendo... ${pct}%`;
            });
        });
    }

    /* ── 2. Custom Drag & Drop Zone (triggers Uploadcare) ───── */
    uploadZone.addEventListener('click', (e) => {
        // Don't re-open if clicking inside the file list
        if (e.target.closest('.upload-file-list, .upload-file-item')) return;
        if (widget) widget.openDialog();
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
        // Uploadcare intercepts native file drops automatically
        // but we open dialog as fallback for browsers that don't
        if (widget && e.dataTransfer.files.length) {
            widget.value(uploadcare.fileFrom('object', e.dataTransfer.files[0]));
        }
    });

    /* ── 3. Render uploaded file list ───────────────────────── */
    /* 🔒 SEGURIDAD: uso de textContent para prevenir XSS —
       nunca insertar fileInfo.name o cdnUrl directamente en innerHTML */
    function renderFileList(files) {
        fileList.innerHTML = '';
        if (!files || files.length === 0) {
            uploadZone.classList.remove('upload-zone--done');
            return;
        }

        files.forEach((filePromise) => {
            filePromise.done((fileInfo) => {
                const ext = (fileInfo.name || '').split('.').pop().toLowerCase();
                const size = formatSize(fileInfo.size);

                // Construir el elemento sin innerHTML para evitar XSS
                const item = document.createElement('div');
                item.className = 'upload-file-item';

                const icon = document.createElement('span');
                icon.className = 'ufi-icon';
                icon.textContent = getFileIcon(ext); // textContent, nunca innerHTML

                const info = document.createElement('div');
                info.className = 'ufi-info';

                const name = document.createElement('strong');
                name.textContent = fileInfo.name || 'Archivo'; // textContent seguro

                const sizeEl = document.createElement('span');
                sizeEl.textContent = size;

                info.appendChild(name);
                info.appendChild(sizeEl);

                const link = document.createElement('a');
                link.className = 'ufi-remove';
                // Validar que cdnUrl sea una URL de Uploadcare antes de usarla
                const safeCdnUrl = (fileInfo.cdnUrl || '').startsWith('https://ucarecdn.com/')
                    ? fileInfo.cdnUrl
                    : '#';
                link.href = safeCdnUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer'; // seguridad: evita acceso al window padre
                link.title = 'Ver archivo';
                link.textContent = '↗';

                item.appendChild(icon);
                item.appendChild(info);
                item.appendChild(link);
                fileList.appendChild(item);
            });
        });
    }

    function formatSize(bytes) {
        if (!bytes) return '';
        if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + ' GB';
        if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
        return (bytes / 1024).toFixed(0) + ' KB';
    }

    function getFileIcon(ext) {
        const icons = {
            pdf: '📄', ai: '🎨', psd: '🖼', png: '🖼', jpg: '🖼', jpeg: '🖼',
            mp4: '🎬', mov: '🎬', zip: '📦', rar: '📦', svg: '🎨', eps: '🎨',
        };
        return icons[ext] || '📎';
    }

    /* ── 4. Form submission ─────────────────────────────────── */
    const form = document.getElementById('cotizar');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 🔒 Anti-spam: honeypot — si el campo oculto tiene valor, es un bot
        const honeypot = document.getElementById('website-url')?.value;
        if (honeypot) {
            console.warn('Bot detectado — envío bloqueado.');
            return; // silencio total para no dar pistas al bot
        }

        // 🔒 Anti-spam: rate limiting — mínimo 1 minuto entre envíos
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

        // 🔒 Validación de longitud máxima (defensa en profundidad)
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

        // 🔒 Validación de formato de teléfono (si fue proporcionado)
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

        // Recolectar URLs de archivos de Uploadcare
        let fileUrls = [];
        if (uploadedFileGroup) {
            uploadedFileGroup.files().forEach((fp) => {
                fp.done((fi) => {
                    // Validar que sea una URL legítima de Uploadcare
                    if (fi.cdnUrl && fi.cdnUrl.startsWith('https://ucarecdn.com/')) {
                        fileUrls.push(fi.cdnUrl);
                    }
                });
            });
            await new Promise(r => setTimeout(r, 300));
        }

        // ⚠️  PENDIENTE: reemplaza YOUR_FORM_ID con tu ID de Formspree
        //    Regístrate gratis en https://formspree.io
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
        const isConfigured = !FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID');

        if (!isConfigured) {
            // Formulario aún no configurado — mostrar error claro al usuario
            showFormError('El formulario está en mantenimiento. Por favor contáctanos directamente por WhatsApp o email.');
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            return;
        }

        const mensaje = (document.getElementById('mensaje')?.value || '').trim().substring(0, 2000);

        const payload = {
            nombre: nombre.substring(0, 100),
            email: email.substring(0, 254),
            telefono: telefono.substring(0, 20),
            servicio,
            mensaje,
            archivos: fileUrls.length > 0 ? fileUrls.join('\n') : 'Sin archivos adjuntos',
        };

        try {
            const resp = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (resp.ok) {
                lastSubmitTime = Date.now(); // registrar tiempo de envío exitoso
                form.style.display = 'none';
                formSuccess.style.display = 'flex';
            } else {
                throw new Error(`Error del servidor: ${resp.status}`);
            }
        } catch (err) {
            // 🔒 Mostrar error real — no fingir éxito
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
            // Actualizar mensaje de error con textContent (seguro contra XSS)
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
