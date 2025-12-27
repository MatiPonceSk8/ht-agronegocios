document.addEventListener("DOMContentLoaded", () => {
  const servicios = document.querySelectorAll(".servicio-detalle");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("servicio-visible");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  servicios.forEach((servicio) => observer.observe(servicio));
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Configuración del Observer para las animaciones de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agrega la clase 'visible' cuando el elemento entra en pantalla
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

    // Seleccionamos todos los elementos con clases de animación
    const targets = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    // Los observamos
    targets.forEach(el => observer.observe(el));
});