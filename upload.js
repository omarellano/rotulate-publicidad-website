/* ============================================================
   Rotulate Publicidad — Contact Form Logic (Formspree)
   ============================================================ */

const RATE_LIMIT_MS = 60000;
let lastSubmitTime = 0;

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('cotizar');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvnypyr';

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot anti-spam
        const honeypot = document.getElementById('website-url')?.value;
        if (honeypot) return;

        // Rate limiting
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            const secsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
            showFormError('Por favor espera ' + secsLeft + ' segundos antes de enviar de nuevo.');
            return;
        }

        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const telefono = document.getElementById('telefono')?.value.trim();
        const servicio = document.getElementById('servicio')?.value;
        const mensaje = (document.getElementById('mensaje')?.value || '').trim().substring(0, 2000);

        if (!nombre || !email || !servicio) {
            shakeInvalid();
            return;
        }

        if (nombre.length > 100 || email.length > 254) {
            showFormError('Los datos ingresados exceden la longitud permitida.');
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

        setLoading(true);
        formError.style.display = 'none';

        try {
            const formData = new FormData();
            formData.append('nombre', nombre.substring(0, 100));
            formData.append('email', email.substring(0, 254));
            formData.append('telefono', telefono.substring(0, 20));
            formData.append('servicio', servicio);
            formData.append('mensaje', mensaje);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);

            const resp = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData,
                signal: controller.signal,
            });
            clearTimeout(timeout);

            if (!resp.ok) {
                const detail = await resp.text().catch(() => '');
                throw new Error('Error ' + resp.status + (detail ? ': ' + detail : ''));
            }

            lastSubmitTime = Date.now();
            form.style.display = 'none';
            formSuccess.style.display = 'flex';

            if (window.dataLayer) {
                window.dataLayer.push({ event: 'cotizacion_enviada' });
            }

        } catch (err) {
            console.error('Error al enviar:', err);
            if (err.name === 'AbortError') {
                showFormError('Tiempo de espera agotado. Por favor intenta de nuevo.');
            } else {
                showFormError('Hubo un problema al enviar. Por favor escríbenos directamente por WhatsApp o al email.');
            }
        } finally {
            setLoading(false);
        }
    });

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
});
