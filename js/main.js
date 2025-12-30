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
   3. CONEXIÓN CON GOOGLE SHEETS (BACKEND PROPIO)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
      event.preventDefault(); // Evitamos recarga
      
      const submitBtn = contactForm.querySelector('.btn-submit-pro');
      const status = document.getElementById("formMsg");
      const originalBtnText = submitBtn.innerHTML;

      // 1. Feedback Visual
      submitBtn.innerHTML = 'Procesando... <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      status.innerHTML = ""; 

      // 2. Preparamos los datos
      const data = new FormData(contactForm);

      try {
        // 3. Enviamos a Google Script
        // NOTA: Google Scripts requiere 'method: POST' y body FormData.
        // No usaremos headers JSON para evitar problemas de CORS con Google.
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data
        });

        // 4. Verificamos respuesta
        // Google siempre devuelve status 200 si llegó bien al script
        if (response.ok) {
          // ÉXITO: Vamos a la página de gracias
          window.location.href = "thank-you.html";
        } else {
          throw new Error("Error en la respuesta del servidor");
        }

      } catch (error) {
        console.error("Error!", error.message);
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        status.innerHTML = '<div style="color: #d32f2f; margin-top: 10px; font-weight:600;">⚠️ Hubo un problema. Intenta nuevamente.</div>';
      }
    });
  }
});