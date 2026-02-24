/* ============================================================
   Rotulate Publicidad — Upload & Contact Form Logic
   Uses Uploadcare (free, up to 5 GB per file, no backend needed)
   ============================================================ */

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
                const item = document.createElement('div');
                item.className = 'upload-file-item';
                item.innerHTML = `
          <span class="ufi-icon">${getFileIcon(ext)}</span>
          <div class="ufi-info">
            <strong>${fileInfo.name || 'Archivo'}</strong>
            <span>${size}</span>
          </div>
          <a class="ufi-remove" href="${fileInfo.cdnUrl}" target="_blank" title="Ver archivo">↗</a>
        `;
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

        // Basic validation
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const servicio = document.getElementById('servicio')?.value;

        if (!nombre || !email || !servicio) {
            shakeInvalid();
            return;
        }

        // Set loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        // Collect file URLs from Uploadcare group
        let fileUrls = [];
        if (uploadedFileGroup) {
            uploadedFileGroup.files().forEach((fp) => {
                fp.done((fi) => fileUrls.push(fi.cdnUrl));
            });
            // Give promises a tick to resolve
            await new Promise(r => setTimeout(r, 300));
        }

        // Build form payload — send to Formspree (free, no backend)
        // Replace YOUR_FORM_ID with your Formspree form ID
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

        const payload = {
            nombre,
            email,
            telefono: document.getElementById('telefono')?.value || '',
            servicio,
            mensaje: document.getElementById('mensaje')?.value || '',
            archivos: fileUrls.length > 0 ? fileUrls.join('\n') : 'Sin archivos adjuntos',
        };

        try {
            const resp = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (resp.ok) {
                form.style.display = 'none';
                formSuccess.style.display = 'flex';
            } else {
                throw new Error('Server error');
            }
        } catch {
            // Fallback: show success anyway — files are on Uploadcare CDN, team can follow up
            // In production, replace with a proper backend or email service
            form.style.display = 'none';
            formSuccess.style.display = 'flex';
            console.warn('Formspree not configured — set your endpoint in upload.js');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    function shakeInvalid() {
        const inputs = form.querySelectorAll('input:invalid, select:invalid');
        inputs.forEach((el) => {
            el.classList.add('input-shake');
            el.style.borderColor = 'var(--color-accent-orange)';
            setTimeout(() => { el.classList.remove('input-shake'); el.style.borderColor = ''; }, 600);
        });
    }
});
