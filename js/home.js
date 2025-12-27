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
        el.style.transitionDelay = `${index * 0.09}s`;
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

/* =====================================================
   ANIMACIÓN DE NÚMEROS (STATS)
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  const counters = document.querySelectorAll(".stat-number");
  let started = false; // Para que no se ejecute dos veces

  const startCounting = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // Duración en ms (2 segundos)
      const increment = target / (duration / 16); // 60fps aprox

      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        
        if (current < target) {
          // Formato especial para +50.000 (con punto de mil)
          if(target > 1000) {
             counter.innerText = "+" + Math.ceil(current).toLocaleString('es-AR');
          } else if (target === 100) { // Caso porcentaje
             counter.innerText = Math.ceil(current) + "%"; 
          } else {
             counter.innerText = "+" + Math.ceil(current);
          }
          requestAnimationFrame(updateCounter);
        } else {
          // Valor final limpio
          if(target > 1000) {
             counter.innerText = "+" + target.toLocaleString('es-AR');
          } else if (target === 100) {
             counter.innerText = target + "%";
          } else {
             counter.innerText = "+" + target;
          }
        }
      };

      updateCounter();
    });
  };

  // Observer para disparar cuando se ve la sección
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      startCounting();
      started = true;
    }
  }, { threshold: 0.5 }); // Se activa cuando se ve el 50% de la sección

  if(statsSection) {
    observer.observe(statsSection);
  }
});

/* =====================================================
   ANIMACIÓN DE NÚMEROS (STATS)
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-section");
  const counters = document.querySelectorAll(".stat-number");
  let started = false; // Control para que corra solo una vez

  const startCounting = () => {
    counters.forEach(counter => {
      // Obtenemos el valor final del HTML
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // 2 segundos de animación
      const increment = target / (duration / 16); // Cálculo de velocidad

      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        
        if (current < target) {
          // Mientras cuenta:
          if(target > 1000) {
             // Si es miles, usamos formato con punto (15.000)
             counter.innerText = "+" + Math.ceil(current).toLocaleString('es-AR');
          } else {
             // Si es chico, número directo (25)
             counter.innerText = "+" + Math.ceil(current);
          }
          requestAnimationFrame(updateCounter);
        } else {
          // Valor final exacto:
          if(target > 1000) {
             counter.innerText = "+" + target.toLocaleString('es-AR');
          } else {
             counter.innerText = "+" + target;
          }
        }
      };

      updateCounter();
    });
  };

  // El Observer activa la animación cuando llegas a la sección
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      startCounting();
      started = true;
    }
  }, { threshold: 0.5 }); // Se activa al ver el 50% de la sección

  if(statsSection) {
    observer.observe(statsSection);
  }
});