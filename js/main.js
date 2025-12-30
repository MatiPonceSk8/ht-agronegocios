document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. LÓGICA DEL MENÚ (Solo si existe)
     ===================================== */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    document.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }

  /* =====================================
     2. LÓGICA DEL FAB (Botón Contacto)
     ===================================== */
  const contactFab = document.querySelector('.contact-fab');
  const fabMain = document.querySelector('.fab-main');

  // Verificamos si existen estos elementos antes de agregarles eventos
  if (contactFab && fabMain) {
    
    // Al hacer click en el botón principal (sobrecito)
    fabMain.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que el click se propague al documento
      contactFab.classList.toggle('open');
    });

    // Al hacer click en cualquier otro lado de la página, se cierra
    document.addEventListener('click', (e) => {
      if (!contactFab.contains(e.target)) {
        contactFab.classList.remove('open');
      }
    });
  }
  
});

/* =========================================================
   3. MANEJO DEL FORMULARIO DE CONTACTO (AJAX + REDIRECCIÓN)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
      contactForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // 1. Frenamos el envío tradicional HTML
        
        const status = document.getElementById("formMsg");
        const submitBtn = contactForm.querySelector('.btn-submit-pro');
        const originalBtnText = submitBtn.innerHTML;

        // 2. Feedback visual para el usuario (UX Profesional)
        submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        status.innerHTML = ""; // Limpiamos mensajes previos

        const data = new FormData(event.target);

        try {
          // 3. Enviamos los datos a Formspree "por detrás" (Fetch)
          const response = await fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
          });

          // 4. Verificamos la respuesta
          if (response.ok) {
            // ÉXITO TOTAL: Redirección relativa (funciona en Local y Github)
            window.location.href = "thank-you.html"; 
            
          } else {
            // ERROR (Ej: Captcha inválido o problema en Formspree)
            const jsonData = await response.json();
            submitBtn.innerHTML = originalBtnText; // Restauramos botón
            submitBtn.disabled = false;
            
            // Mostramos el error exacto que nos da Formspree
            if (jsonData.errors) {
              status.innerHTML = `<div style="color: #d32f2f; margin-top: 10px; font-weight:600;">⚠️ ${jsonData.errors.map(error => error.message).join(", ")}</div>`;
            } else {
              status.innerHTML = '<div style="color: #d32f2f; margin-top: 10px; font-weight:600;">⚠️ Ocurrió un error. Revisa el Captcha e intenta de nuevo.</div>';
            }
          }
        } catch (error) {
          // ERROR DE RED (Internet caído, etc)
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          status.innerHTML = '<div style="color: #d32f2f; margin-top: 10px; font-weight:600;">⚠️ Error de conexión. Verifica tu internet.</div>';
        }
      });
    }

});