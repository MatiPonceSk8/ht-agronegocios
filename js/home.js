/* =====================================================
   SLIDER DE INSUMOS AGROQUÍMICOS
   - Cambia imagen y texto automáticamente
   - Permite navegación manual (prev / next)
   - Muestra indicadores (dots)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DATA DE PRODUCTOS
     ========================= */
  const agroData = [
    {
      title: "Glifosato Power Plus II",
      desc: "Control total de malezas. Herbicida sistémico granulado de máxima concentración y absorción.",
      img: "assets/img/agroquimicos/glifosato power plus 2.png"
    },
    {
      title: "2,4-D Etil Hexil",
      desc: "Especialista en hoja ancha. Herbicida selectivo de baja volatilidad para tus barbechos.",
      img: "assets/img/agroquimicos/2,4D etil hexil.png"
    },
    {
      title: "Paraquat Sigma",
      desc: "Velocidad de acción. Desecante de contacto ideal para 'Doble Golpe' sin residualidad.",
      img: "assets/img/agroquimicos/paraquat.png"
    }
  ];

  /* =========================
     ELEMENTOS DEL DOM
     ========================= */
  const titleEl = document.getElementById("agro-title");
  const descEl = document.getElementById("agro-desc");
  const imgEl = document.getElementById("agro-img");
  const dotsContainer = document.getElementById("agro-dots");
  const nextBtn = document.querySelector(".agro-nav.next");
  const prevBtn = document.querySelector(".agro-nav.prev");

  let agroIndex = 0;
  let autoSlideInterval;

  /* =========================
     ACTUALIZAR SLIDER
     ========================= */
  function updateSlider() {
    titleEl.textContent = agroData[agroIndex].title;
    descEl.textContent = agroData[agroIndex].desc;
    imgEl.src = agroData[agroIndex].img;
    renderDots();
  }

  /* =========================
     DOTS / INDICADORES
     ========================= */
  function renderDots() {
    dotsContainer.innerHTML = "";

    agroData.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");

      if (index === agroIndex) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        agroIndex = index;
        updateSlider();
        restartAutoSlide();
      });

      dotsContainer.appendChild(dot);
    });
  }

  /* =========================
     NAVEGACIÓN MANUAL
     ========================= */
  nextBtn.addEventListener("click", () => {
    agroIndex = (agroIndex + 1) % agroData.length;
    updateSlider();
    restartAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    agroIndex = (agroIndex - 1 + agroData.length) % agroData.length;
    updateSlider();
    restartAutoSlide();
  });

  /* =========================
     AUTO SLIDE
     ========================= */
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      agroIndex = (agroIndex + 1) % agroData.length;
      updateSlider();
    }, 3000); // 3 segundos
  }

  function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  /* =========================
     INIT
     ========================= */
  updateSlider();
  startAutoSlide();

});

/* =====================================================
   SCROLL REVEAL – TARJETAS SOLUCIONES INTEGRALES
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const offset = 100;

    reveals.forEach((el, index) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - offset) {
        el.classList.add("active");
        el.style.transitionDelay = `${index * 0.12}s`;
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});