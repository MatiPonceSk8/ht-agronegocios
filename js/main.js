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