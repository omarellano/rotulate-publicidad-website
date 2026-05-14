/**
 * Rotulate Publicidad — Firebase Upload & Contact Form Logic
 * Manages file uploads to Firebase Storage and lead storage in Firestore.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Firebase if config exists
    if (typeof firebaseConfig === 'undefined') {
        console.error('Firebase configuration missing. Please check firebase-config.js');
        return;
    }

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const storage = firebase.storage();

    // 2. Elements
    const form = document.getElementById('cotizar');
    const fileInput = document.getElementById('file-upload');
    const uploadZone = document.getElementById('upload-zone');
    const fileListDisplay = document.getElementById('upload-file-list');
    
    const progressContainer = document.getElementById('upload-progress-container');
    const progressBar = document.getElementById('upload-progress-bar');
    const progressText = document.getElementById('upload-progress-text');
    const progressPercent = document.getElementById('upload-progress-percent');
    
    const submitBtn = document.getElementById('submit-btn');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    let selectedFiles = [];

    // 3. File Selection Logic
    uploadZone.addEventListener('click', (e) => {
        if (e.target.closest('.ufi-remove')) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        addFiles(fileInput.files);
        fileInput.value = ''; // Reset for same file selection
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

    function addFiles(files) {
        for (let file of files) {
            const exists = selectedFiles.some(f => f.name === file.name && f.size === file.size);
            if (!exists) selectedFiles.push(file);
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
            const item = document.createElement('div');
            item.className = 'upload-file-item';
            item.innerHTML = `
                <span class="ufi-icon">${getFileIcon(file.name.split('.').pop())}</span>
                <div class="ufi-info">
                    <strong>${file.name}</strong>
                    <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button type="button" class="ufi-remove" data-index="${index}">✕</button>
            `;
            fileListDisplay.appendChild(item);
        });

        // Add remove listeners
        document.querySelectorAll('.ufi-remove').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                selectedFiles.splice(idx, 1);
                renderFileList();
            };
        });
    }

    function getFileIcon(ext) {
        const icons = { pdf: '📄', ai: '🎨', psd: '🖼', png: '🖼', jpg: '🖼', zip: '📦' };
        return icons[ext.toLowerCase()] || '📎';
    }

    // 4. Submission Logic
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if (!nombre || !email || !servicio) {
            alert('Por favor completa los campos obligatorios.');
            return;
        }

        try {
            setLoading(true);
            const uploadedFileUrls = [];

            // A. Upload Files to Storage
            if (selectedFiles.length > 0) {
                progressContainer.style.display = 'block';
                
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    const timestamp = Date.now();
                    const fileName = `${timestamp}_${file.name}`;
                    const storageRef = storage.ref(`cotizaciones/${fileName}`);
                    
                    const uploadTask = storageRef.put(file);

                    await new Promise((resolve, reject) => {
                        uploadTask.on('state_changed', 
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                updateProgress(progress, `Subiendo: ${file.name}`);
                            }, 
                            (error) => reject(error), 
                            async () => {
                                const url = await uploadTask.snapshot.ref.getDownloadURL();
                                uploadedFileUrls.push({ name: file.name, url: url });
                                resolve();
                            }
                        );
                    });
                }
            }

            // B. Save Data to Firestore
            await db.collection('cotizaciones').add({
                nombre,
                email,
                telefono,
                servicio,
                mensaje,
                archivos: uploadedFileUrls,
                fecha: firebase.firestore.FieldValue.serverTimestamp(),
                estado: 'nuevo'
            });

            // C. Success
            form.style.display = 'none';
            formSuccess.style.display = 'flex';
            if (window.dataLayer) window.dataLayer.push({ event: 'cotizacion_firebase_ok' });

        } catch (error) {
            console.error('Error en el proceso:', error);
            formError.style.display = 'flex';
        } finally {
            setLoading(false);
        }
    });

    function updateProgress(percent, text) {
        progressBar.style.width = `${percent}%`;
        progressPercent.textContent = `${Math.round(percent)}%`;
        progressText.textContent = text;
    }

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        submitBtn.innerHTML = isLoading ? 
            '<span class="loading-spinner"></span> Procesando...' : 
            'Enviar Solicitud de Cotización →';
    }
});
