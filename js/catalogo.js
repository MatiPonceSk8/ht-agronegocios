document.addEventListener("DOMContentLoaded", () => {
    
  // BASE DE DATOS DE PRODUCTOS
  const productos = [
    // --- HERBICIDAS EXISTENTES ---
    {
      id: 1,
      categoria: "herbicida",
      tag: "Herbicida Total",
      titulo: "Glifosato Power Plus II",
      descripcion: "Concentrado soluble (SL). Control post-emergente sistémico de malezas anuales y perennes. Fórmula balanceada para rápida absorción.",
      specs: { "Concentración": "79% WG", "Acción": "Sistémica" },
      img: "assets/img/agroquimicos/glifosato power plus 2.png",
      link: "https://wa.me/5493585025485?text=Info%20Glifosato"
    },
    {
      id: 2,
      categoria: "herbicida",
      tag: "Herbicida Hormonal",
      titulo: "2,4-D Etil Hexil",
      descripcion: "Herbicida sistémico de baja volatilidad (Éster). Excelente penetración en cutículas cerosas para control de hoja ancha.",
      specs: { "Formulación": "EC", "Volatilidad": "Baja" },
      img: "assets/img/agroquimicos/2,4D etil hexil.png",
      link: "https://wa.me/5493585025485?text=Info%202-4D"
    },
    {
      id: 3,
      categoria: "herbicida",
      tag: "Herbicida Selectivo",
      titulo: "Imazetapir 10%",
      descripcion: "Acción residual y sistémica para soja, maní y alfalfa. Controla gramíneas y latifoliadas por absorción foliar y radicular.",
      specs: { "Uso": "Pre/Post Emergencia", "Cultivos": "Soja, Maní" },
      img: "assets/img/agroquimicos/imazetapir.png",
      link: "https://wa.me/5493585025485?text=Info%20Imazetapir"
    },
    {
      id: 4,
      categoria: "herbicida",
      tag: "Herbicida de Contacto",
      titulo: "Paraquat Sigma",
      descripcion: "Desecante rápido no selectivo. La herramienta ideal para el 'doble golpe' en malezas resistentes. Sin efecto residual.",
      specs: { "Efecto": "Quemante", "Residualidad": "Nula" },
      img: "assets/img/agroquimicos/paraquat.png",
      link: "https://wa.me/5493585025485?text=Info%20Paraquat"
    },

    {
      id: 6,
      categoria: "herbicida",
      tag: "Herbicida Desecante",
      titulo: "Glufosinato de Amonio",
      descripcion: "Herbicida de contacto con ligera acción sistémica. Fundamental para rotación de principios activos y control de malezas resistentes al glifosato.",
      specs: { "Grupo": "H", "Control": "Amaranthus/Gramíneas" },
      img: "assets/img/agroquimicos/glufosinato de amonio.png",
      link: "https://wa.me/5493585025485?text=Info%20Glufosinato"
    },
    {
      id: 7,
      categoria: "herbicida",
      tag: "Herbicida Residual",
      titulo: "Flumioxazin Delta",
      descripcion: "Herbicida PPO de suelo con potente acción residual. La solución estratégica para el control de Yuyo Colorado y otras latifoliadas difíciles.",
      specs: { "Modo Acción": "PPO", "Residualidad": "Alta" },
      img: "assets/img/agroquimicos/flumioxazin.png",
      link: "https://wa.me/5493585025485?text=Info%20Flumioxazin"
    },
    {
      id: 8,
      categoria: "herbicida",
      tag: "Herbicida Selectivo",
      titulo: "Prometrina Delta",
      descripcion: "Herbicida selectivo de pre-emergencia o pre-siembra. Excelente herramienta para el control temprano de malezas en Girasol y Soja.",
      specs: { "Familia": "Triazinas", "Uso": "Girasol/Soja" },
      img: "assets/img/agroquimicos/prometrina.png",
      link: "https://wa.me/5493585025485?text=Info%20Prometrina"
    },
    
    // --- COADYUVANTES ---
    {
      id: 9,
      categoria: "coadyuvante",
      tag: "Coadyuvante Premium",
      titulo: "Metil Oil",
      descripcion: "Aceite metilado de soja. Maximiza la eficiencia de aplicación mejorando la adherencia, penetración y reduciendo la deriva de los caldos.",
      specs: { "Base": "Aceite Metilado", "Función": "Penetrante" },
      img: "assets/img/agroquimicos/metil oil.png",
      link: "https://wa.me/5493585025485?text=Info%20MetilOil"
    },

    // --- FERTILIZANTES ---
    {
      id: 5,
      categoria: "fertilizante",
      tag: "Bioestimulante",
      titulo: "Amino 26",
      descripcion: "Fertilizante foliar a base de aminoácidos libres. Potente anti-estrés para recuperación de cultivos ante granizo o sequía.",
      specs: { "Composición": "Aminoácidos", "Aplicación": "Foliar" },
      img: "assets/img/agroquimicos/amino26.png",
      link: "https://wa.me/5493585025485?text=Info%20Amino26"
    }
  ];

  const grid = document.getElementById("catalogo-grid");
  const btns = document.querySelectorAll(".btn-filtro");

  // FUNCIÓN RENDERIZAR
  function renderizarProductos(filtro) {
    grid.innerHTML = "";
    
    const productosFiltrados = filtro === "todos" 
      ? productos 
      : productos.filter(p => p.categoria === filtro);

    if(productosFiltrados.length === 0) {
        grid.innerHTML = "<div style='width:100%; text-align:center; padding:50px;'><p style='color:#666;'>No hay productos en esta categoría por el momento.</p></div>";
        return;
    }

    productosFiltrados.forEach((prod, index) => {
      let specsHTML = "";
      for (const [key, value] of Object.entries(prod.specs)) {
          specsHTML += `<div><strong>${key}:</strong> ${value}</div>`;
      }

      const article = document.createElement("article");
      article.classList.add("producto-bloque");
      article.classList.add("fade-in");
      article.style.animationDelay = `${index * 0.1}s`;

      article.innerHTML = `
        <div class="prod-imagen">
          <img src="${prod.img}" alt="${prod.titulo}">
        </div>
        <div class="prod-contenido">
          <span class="prod-tag">${prod.tag}</span>
          <h2>${prod.titulo}</h2>
          <p>${prod.descripcion}</p>
          <div class="prod-specs">
            ${specsHTML}
          </div>
          <a href="${prod.link}" target="_blank" class="btn-linea">Consultar Precio</a>
        </div>
      `;

      grid.appendChild(article);
    });
  }

  // EVENTOS
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderizarProductos(btn.dataset.filter);
    });
  });

  // INICIO
  renderizarProductos("todos");
});