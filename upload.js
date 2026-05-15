/* ============================================================
   Rotulate Publicidad — Upload & Contact Form Logic
   Firebase Storage + Firestore + Formspree backup
   ============================================================ */

const RATE_LIMIT_MS = 60000;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25 MB con Firebase
const STORAGE_TIMEOUT_MS = 60000;
let lastSubmitTime = 0;

document.addEventListener('DOMContentLoaded', () => {

    /* ── Firebase init (graceful fallback) ───────────────────── */
    let db = null;
    let storage = null;
    let firebaseReady = false;

    try {
        if (typeof firebase !== 'undefined' && typeof firebaseConfig !== 'undefined') {
            db = firebase.firestore();
            storage = firebase.storage();
            firebaseReady = true;
        }
    } catch (e) {
        console.warn('Firebase no disponible, usando solo Formspree:', e);
    }

    /* ── 1. Native File Input Setup ─────────────────────────── */
    const fileInput = document.getElementById('file-upload');
    const uploadZone = document.getElementById('upload-zone');
    const fileList = document.getElementById('upload-file-list');

    let selectedFiles = [];
    let isSubmitting = false;
    let cancelRequested = false;
    let activeUploadTask = null;
    let activeFetchController = null;
    let activeStorageTimeout = null;

    /* ── 2. Click to open file picker ───────────────────────── */
    uploadZone.addEventListener('click', (e) => {
        if (e.target.closest('.upload-file-item')) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        addFiles(fileInput.files);
    });

    /* ── 3. Drag & Drop ─────────────────────────────────────── */
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

    /* ── 4. Add files & validate ────────────────────────────── */
    function addFiles(newFiles) {
        if (isSubmitting) return;

        for (const file of newFiles) {
            const exists = selectedFiles.some(f => f.name === file.name && f.size === file.size);
            if (!exists) {
                selectedFiles.push(file);
            }
        }

        const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
        if (totalSize > MAX_TOTAL_SIZE) {
            showFormError('Los archivos exceden el límite de 25 MB. Reduce el tamaño o envía menos archivos.');
            selectedFiles = selectedFiles.slice(0, -newFiles.length);
        }

        renderFileList();
    }

    /* ── 5. Render file list ────────────────────────────────── */
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
                if (isSubmitting) return;
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

    function sanitizeFileName(name) {
        return name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 100);
    }

    /* ── 6. Progress UI ─────────────────────────────────────── */
    const progressWrap = document.getElementById('upload-progress-wrap');
    const progressBar = document.getElementById('upload-progress-bar');
    const progressLabel = document.getElementById('upload-progress-label');

    function showProgress(text, percent) {
        const safePercent = Math.max(0, Math.min(100, Math.round(percent || 0)));
        if (progressWrap) progressWrap.style.display = 'flex';
        if (progressLabel) progressLabel.textContent = text || 'Subiendo...';
        if (progressBar) progressBar.style.width = safePercent + '%';
        if (progressBar) progressBar.setAttribute('aria-valuenow', String(safePercent));
    }

    function hideProgress() {
        if (progressWrap) progressWrap.style.display = 'none';
        if (progressBar) progressBar.style.width = '0%';
        if (progressBar) progressBar.setAttribute('aria-valuenow', '0');
        if (progressLabel) progressLabel.textContent = 'Subiendo...';
    }

    function setSubmitState(active) {
        isSubmitting = active;
        uploadZone.classList.toggle('upload-zone--uploading', active);
        uploadZone.classList.toggle('upload-zone--locked', active);
        fileInput.disabled = active;

        if (btnText) {
            btnText.textContent = active
                ? (selectedFiles.length > 0 ? 'Cancelar carga' : 'Cancelar envio')
                : 'Enviar Cotización →';
        }
        if (btnLoading) btnLoading.style.display = 'none';
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.toggle('submit-btn--cancel', active);
            submitBtn.setAttribute('aria-busy', active ? 'true' : 'false');
        }
    }

    function cancelSubmission() {
        if (!isSubmitting || cancelRequested) return;

        cancelRequested = true;
        showProgress('Cancelando carga...', 100);

        if (activeStorageTimeout) {
            clearTimeout(activeStorageTimeout);
            activeStorageTimeout = null;
        }
        if (activeUploadTask && typeof activeUploadTask.cancel === 'function') {
            activeUploadTask.cancel();
        }
        if (activeFetchController) {
            activeFetchController.abort();
        }
    }

    function ensureNotCanceled() {
        if (cancelRequested) {
            const err = new Error('Envio cancelado por el usuario');
            err.name = 'AbortError';
            throw err;
        }
    }

    /* ── 7. Upload files to Firebase Storage ────────────────── */
    async function uploadFilesToFirebase() {
        if (!firebaseReady || !storage || selectedFiles.length === 0) return [];

        const uploadedFiles = [];
        const filesToUpload = selectedFiles.slice();
        const totalFiles = filesToUpload.length;

        for (let i = 0; i < totalFiles; i++) {
            ensureNotCanceled();

            const file = filesToUpload[i];
            const timestamp = Date.now();
            const safeName = sanitizeFileName(file.name);
            const path = 'cotizaciones/' + timestamp + '_' + safeName;
            const ref = storage.ref(path);

            showProgress('Subiendo archivo ' + (i + 1) + ' de ' + totalFiles + ': ' + file.name, Math.round((i / totalFiles) * 100));

            await new Promise((resolve, reject) => {
                activeStorageTimeout = setTimeout(function () {
                    if (activeUploadTask && typeof activeUploadTask.cancel === 'function') {
                        activeUploadTask.cancel();
                    }
                    reject(new Error('Storage timeout'));
                }, STORAGE_TIMEOUT_MS);

                activeUploadTask = ref.put(file);
                activeUploadTask.on('state_changed',
                    function (snap) {
                        if (cancelRequested) return;
                        const fileProgress = (snap.bytesTransferred / snap.totalBytes) * 100;
                        const overallProgress = ((i + fileProgress / 100) / totalFiles) * 100;
                        showProgress('Subiendo archivo ' + (i + 1) + ' de ' + totalFiles + ': ' + file.name, overallProgress);
                    },
                    function (err) {
                        if (activeStorageTimeout) {
                            clearTimeout(activeStorageTimeout);
                            activeStorageTimeout = null;
                        }
                        activeUploadTask = null;
                        console.error('Error subiendo archivo:', err);
                        reject(err);
                    },
                    async function () {
                        try {
                            if (activeStorageTimeout) {
                                clearTimeout(activeStorageTimeout);
                                activeStorageTimeout = null;
                            }
                            ensureNotCanceled();
                            var url = await activeUploadTask.snapshot.ref.getDownloadURL();
                            uploadedFiles.push({ name: file.name, size: file.size, url: url });
                            activeUploadTask = null;
                            resolve();
                        } catch (err) {
                            activeUploadTask = null;
                            reject(err);
                        }
                    }
                );
            });
        }

        return uploadedFiles;
    }

    /* ── 8. Form submission ─────────────────────────────────── */
    const form = document.getElementById('cotizar');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvnypyr';

    submitBtn?.addEventListener('click', (e) => {
        if (!isSubmitting) return;
        e.preventDefault();
        cancelSubmission();
    });

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

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
            showFormError('Por favor espera ' + secsLeft + ' segundos antes de enviar de nuevo.');
            return;
        }

        // Validación
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const telefono = document.getElementById('telefono')?.value.trim();
        const servicio = document.getElementById('servicio')?.value;

        if (!nombre || !email || !servicio) {
            shakeInvalid();
            return;
        }

        if (nombre.length > 100 || email.length > 254) {
            showFormError('Los datos ingresados exceden la longitud permitida.');
            return;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            var emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.classList.add('input-shake');
                emailInput.style.borderColor = 'var(--color-accent-orange)';
                setTimeout(function () { emailInput.classList.remove('input-shake'); emailInput.style.borderColor = ''; }, 600);
            }
            return;
        }

        if (telefono && !/^[\+]?[\d\s\-\(\)]{7,20}$/.test(telefono)) {
            var telInput = document.getElementById('telefono');
            if (telInput) {
                telInput.classList.add('input-shake');
                telInput.style.borderColor = 'var(--color-accent-orange)';
                setTimeout(function () { telInput.classList.remove('input-shake'); telInput.style.borderColor = ''; }, 600);
            }
            return;
        }

        // Estado de carga
        cancelRequested = false;
        setSubmitState(true);
        formError.style.display = 'none';

        var mensaje = (document.getElementById('mensaje')?.value || '').trim().substring(0, 2000);

        try {
            var uploadedFiles = [];

            // A. Subir archivos a Firebase Storage (con timeout de 30s por archivo)
            if (firebaseReady && storage && selectedFiles.length > 0) {
                try {
                    uploadedFiles = await uploadFilesToFirebase();
                    showProgress('Archivos subidos. Enviando cotizacion...', 100);
                } catch (storageErr) {
                    console.warn('Firebase Storage falló, continuando sin archivos:', storageErr);
                    ensureNotCanceled();
                    uploadedFiles = [];
                }
            }

            // B. Guardar en Firestore (fire-and-forget — nunca bloquear la UX)
            ensureNotCanceled();

            if (firebaseReady && db) {
                db.collection('cotizaciones').add({
                    nombre: nombre.substring(0, 100),
                    email: email.substring(0, 254),
                    telefono: telefono.substring(0, 20),
                    servicio: servicio,
                    mensaje: mensaje,
                    archivos: uploadedFiles,
                    fecha: firebase.firestore.FieldValue.serverTimestamp(),
                    estado: 'nuevo'
                }).catch(function (err) { console.warn('Firestore write:', err); });
            }

            // C. Enviar a Formspree (fuente principal, con timeout de 15s)
            var filesSummary = '';
            if (uploadedFiles.length > 0) {
                filesSummary = '\n\nArchivos subidos (' + uploadedFiles.length + '): ' + uploadedFiles.map(function (f) { return f.name; }).join(', ');
            } else if (selectedFiles.length > 0) {
                filesSummary = '\n\nArchivos seleccionados (sin subir): ' + selectedFiles.map(function (f) { return f.name; }).join(', ');
            }

            var formData = new FormData();
            formData.append('nombre', nombre.substring(0, 100));
            formData.append('email', email.substring(0, 254));
            formData.append('telefono', telefono.substring(0, 20));
            formData.append('servicio', servicio);
            formData.append('mensaje', mensaje + filesSummary);

            if (selectedFiles.length === 0) {
                showProgress('Enviando cotizacion...', 40);
            }

            activeFetchController = new AbortController();
            var fetchTimeout = setTimeout(function () { activeFetchController.abort(); }, 15000);

            var resp = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData,
                signal: activeFetchController.signal,
            });
            clearTimeout(fetchTimeout);
            activeFetchController = null;

            ensureNotCanceled();

            if (!resp.ok) {
                throw new Error('Formspree respondió con error ' + resp.status);
            }

            // D. Éxito
            lastSubmitTime = Date.now();
            hideProgress();
            form.style.display = 'none';
            formSuccess.style.display = 'flex';

            if (window.dataLayer) {
                window.dataLayer.push({ event: 'cotizacion_enviada' });
            }

        } catch (err) {
            console.error('Error al enviar:', err);
            hideProgress();
            if (err.name === 'AbortError' || cancelRequested) {
                showFormError('Envio cancelado. Puedes revisar los archivos y volver a intentar.');
                return;
            }
            showFormError('Hubo un problema al enviar. Por favor escríbenos directamente por WhatsApp o al email.');
        } finally {
            if (activeStorageTimeout) {
                clearTimeout(activeStorageTimeout);
                activeStorageTimeout = null;
            }
            activeUploadTask = null;
            activeFetchController = null;
            setSubmitState(false);
        }
    });

    function showFormError(msg) {
        var errorEl = document.getElementById('form-error');
        if (errorEl) {
            var p = errorEl.querySelector('p');
            if (p) p.textContent = '⚠️ ' + msg;
            errorEl.style.display = 'flex';
        }
    }

    function shakeInvalid() {
        var inputs = form.querySelectorAll('input:invalid, select:invalid');
        inputs.forEach(function (el) {
            el.classList.add('input-shake');
            el.style.borderColor = 'var(--color-accent-orange)';
            setTimeout(function () { el.classList.remove('input-shake'); el.style.borderColor = ''; }, 600);
        });
    }
});
