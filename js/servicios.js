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