document.addEventListener("DOMContentLoaded", () => {
    
  /* =========================================================
     1. BASE DE DATOS DE PRODUCTOS
     ========================================================= */
  const productos = [
    {
      id: 1, 
      categoria: "herbicida", 
      tag: "Herbicida Total", 
      titulo: "Glifosato Power Plus II",
      unidad: "Bidones (20L)", 
      descripcion: "Concentrado soluble (SL). Control post-emergente sistémico de malezas anuales y perennes.",
      specs: { "Concentración": "79% WG", "Acción": "Sistémica" },
      img: "assets/img/agroquimicos/glifosato power plus 2.png"
    },
    {
      id: 2, 
      categoria: "herbicida", 
      tag: "Herbicida Hormonal", 
      titulo: "2,4-D Etil Hexil",
      unidad: "Bidones (20L)",
      descripcion: "Herbicida sistémico de baja volatilidad (Éster). Excelente penetración en cutículas cerosas.",
      specs: { "Formulación": "EC", "Volatilidad": "Baja" },
      img: "assets/img/agroquimicos/2,4D etil hexil.png"
    },
    {
      id: 3, 
      categoria: "herbicida", 
      tag: "Herbicida Selectivo", 
      titulo: "Imazetapir 10%",
      unidad: "Bidones (20L)",
      descripcion: "Acción residual y sistémica para soja, maní y alfalfa. Controla gramíneas y latifoliadas.",
      specs: { "Uso": "Pre/Post Emergencia", "Cultivos": "Soja, Maní" },
      img: "assets/img/agroquimicos/imazetapir.png"
    },
    {
      id: 4, 
      categoria: "herbicida", 
      tag: "Herbicida de Contacto", 
      titulo: "Paraquat Sigma",
      unidad: "Bidones (20L)",
      descripcion: "Desecante rápido no selectivo. La herramienta ideal para el 'doble golpe' sin residualidad.",
      specs: { "Efecto": "Quemante", "Residualidad": "Nula" },
      img: "assets/img/agroquimicos/paraquat.png"
    },
    {
      id: 6, 
      categoria: "herbicida", 
      tag: "Herbicida Desecante", 
      titulo: "Glufosinato de Amonio",
      unidad: "Bidones (20L)",
      descripcion: "Herbicida de contacto con ligera acción sistémica. Fundamental para rotación de principios.",
      specs: { "Grupo": "H", "Control": "Amaranthus" },
      img: "assets/img/agroquimicos/glufosinato de amonio.png"
    },
    {
      id: 7, 
      categoria: "herbicida", 
      tag: "Herbicida Residual", 
      titulo: "Flumioxazin Delta",
      unidad: "Bidones (5L)", 
      descripcion: "Herbicida PPO de suelo con potente acción residual. Solución para Yuyo Colorado.",
      specs: { "Modo Acción": "PPO", "Residualidad": "Alta" },
      img: "assets/img/agroquimicos/flumioxazin.png"
    },
    {
      id: 8, 
      categoria: "herbicida", 
      tag: "Herbicida Selectivo", 
      titulo: "Prometrina Delta",
      unidad: "Bidones (20L)",
      descripcion: "Herbicida selectivo de pre-emergencia o pre-siembra para Girasol y Soja.",
      specs: { "Familia": "Triazinas", "Uso": "Girasol/Soja" },
      img: "assets/img/agroquimicos/prometrina.png"
    },
    {
      id: 9, 
      categoria: "coadyuvante", 
      tag: "Coadyuvante Premium", 
      titulo: "Metil Oil",
      unidad: "Bidones (20L)",
      descripcion: "Aceite metilado de soja. Maximiza la eficiencia de aplicación y reduce la deriva.",
      specs: { "Base": "Aceite Metilado", "Función": "Penetrante" },
      img: "assets/img/agroquimicos/metil oil.png"
    },
    {
      id: 5, 
      categoria: "fertilizante", 
      tag: "Bioestimulante", 
      titulo: "Amino 26",
      unidad: "Bidones (20L)",
      descripcion: "Fertilizante foliar a base de aminoácidos libres. Potente anti-estrés.",
      specs: { "Composición": "Aminoácidos", "Aplicación": "Foliar" },
      img: "assets/img/agroquimicos/amino26.png"
    }
  ];

  const grid = document.getElementById("catalogo-grid");
  const btnsFiltro = document.querySelectorAll(".btn-filtro");
  let carrito = []; 
  let filtroActual = "todos"; // Variable para saber qué estamos viendo

  /* =========================================================
     2. RENDERIZADO
     ========================================================= */
  function renderizarProductos(filtro) {
    grid.innerHTML = "";
    filtroActual = filtro; // Actualizamos el filtro actual
    
    const filtrados = filtro === "todos" 
      ? productos 
      : productos.filter(p => p.categoria === filtro);

    if(filtrados.length === 0) {
      grid.innerHTML = "<div style='width:100%; padding:50px; text-align:center; color:#888;'>No hay productos en esta categoría.</div>";
      return;
    }

    filtrados.forEach((prod, index) => {
      // Estado actual
      const itemEnCarrito = carrito.find(i => i.id === prod.id);
      const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

      let btnClase = "btn-action-trigger";
      let btnTexto = "Cotizar";
      if (cantidadActual > 0) {
        btnClase += " has-items";
        btnTexto = `Modificar (${cantidadActual})`;
      }

      let specsHTML = "";
      for (const [key, value] of Object.entries(prod.specs)) {
          specsHTML += `<div><strong>${key}:</strong> ${value}</div>`;
      }

      const article = document.createElement("article");
      article.classList.add("producto-bloque", "fade-in");
      article.style.animationDelay = `${index * 0.1}s`;
      
      article.innerHTML = `
        <div class="prod-imagen">
            <img src="${prod.img}" alt="${prod.titulo}">
        </div>
        
        <div class="prod-contenido">
          <span class="prod-tag">${prod.tag}</span>
          <h2>${prod.titulo}</h2>
          <p>${prod.descripcion}</p>
          <div class="prod-specs">${specsHTML}</div>
          
          <div class="prod-actions" id="action-box-${prod.id}">
            
            <button class="${btnClase}" data-action="toggle" data-id="${prod.id}">
              ${btnTexto} <i class="fas fa-chevron-down"></i>
            </button>

            <div id="popover-${prod.id}" class="qty-popover">
              <span class="popover-title">Cantidad de ${prod.unidad}</span>
              
              <div class="qty-selector">
                <button class="btn-qty" data-action="minus" data-id="${prod.id}">-</button>
                <span id="qty-display-${prod.id}" class="qty-number">${cantidadActual > 0 ? cantidadActual : 1}</span>
                <button class="btn-qty" data-action="plus" data-id="${prod.id}">+</button>
              </div>

              <div class="popover-footer">
                <button class="btn-confirm" data-action="confirm" data-id="${prod.id}">Confirmar</button>
                ${cantidadActual > 0 ? `<button class="btn-delete" data-action="delete" data-id="${prod.id}"><i class="fas fa-trash"></i></button>` : ''}
              </div>
            </div>

          </div>
        </div>
      `;
      grid.appendChild(article);
    });
  }

  /* =========================================================
     3. DELEGACIÓN DE EVENTOS (INTERACTIVIDAD)
     ========================================================= */
  
  grid.addEventListener('click', (e) => {
    
    // Buscamos si el clic fue en un botón con data-action
    const target = e.target.closest('button');
    if(!target) return;

    const action = target.dataset.action;
    const id = parseInt(target.dataset.id);

    // Ejecutar acción correspondiente
    if(action === "toggle") togglePopover(id);
    else if(action === "plus") cambiarQty(id, 1);
    else if(action === "minus") cambiarQty(id, -1);
    else if(action === "confirm") confirmar(id);
    else if(action === "delete") eliminar(id);
  });

  /* =========================================================
     4. FUNCIONES LÓGICAS
     ========================================================= */

  function togglePopover(id) {
    document.querySelectorAll('.qty-popover').forEach(el => el.classList.remove('active'));
    
    const popover = document.getElementById(`popover-${id}`);
    if(popover) {
        const item = carrito.find(i => i.id === id);
        const display = document.getElementById(`qty-display-${id}`);
        // Resetear contador visual
        if(display) display.innerText = item ? item.cantidad : 1;
        popover.classList.toggle('active');
    }
  }

  function cambiarQty(id, delta) {
    const display = document.getElementById(`qty-display-${id}`);
    if(display) {
        let val = parseInt(display.innerText);
        val += delta;
        if(val < 1) val = 1; 
        display.innerText = val;
    }
  }

  function confirmar(id) {
    const display = document.getElementById(`qty-display-${id}`);
    const val = parseInt(display.innerText);
    const prod = productos.find(p => p.id === id);

    const existing = carrito.find(i => i.id === id);
    if(existing) {
      existing.cantidad = val;
    } else {
      carrito.push({ ...prod, cantidad: val });
    }

    const popover = document.getElementById(`popover-${id}`);
    if(popover) popover.classList.remove('active');
    
    // IMPORTANTE: Usamos la variable global filtroActual para no perder la vista
    renderizarProductos(filtroActual);
    actualizarDock();
  }

  function eliminar(id) {
    carrito = carrito.filter(i => i.id !== id);
    renderizarProductos(filtroActual);
    actualizarDock();
  }

  /* =========================================================
     5. BARRA INFERIOR (SMART DOCK) Y PAPELERA
     ========================================================= */
  function actualizarDock() {
    const dock = document.getElementById("smart-dock");
    const totalLabel = document.getElementById("total-items-dock");
    const totalUnique = carrito.length;

    if(dock && totalLabel) {
        if(totalUnique > 0) {
          dock.classList.add("visible");
          totalLabel.innerText = totalUnique;
        } else {
          dock.classList.remove("visible");
        }
    }
  }

  // BOTÓN "VACIAR TODO" (PAPELERA)
  const btnTrash = document.getElementById("btn-trash-all");
  if(btnTrash) {
    btnTrash.addEventListener("click", () => {
      // Pedimos confirmación simple
      if(confirm("¿Estás seguro de que querés vaciar tu lista de cotización?")) {
        carrito = []; // Vaciamos el array
        renderizarProductos(filtroActual); // Redibujamos para que los botones vuelvan a "Cotizar"
        actualizarDock(); // Se ocultará la barra
      }
    });
  }


  /* =========================================================
     6. FILTROS Y EVENTOS EXTRA
     ========================================================= */
  btnsFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
      btnsFiltro.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderizarProductos(btn.dataset.filter);
    });
  });

  // Cerrar popover al hacer clic afuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.prod-actions')) {
      document.querySelectorAll('.qty-popover').forEach(el => el.classList.remove('active'));
    }
  });


  /* =========================================================
     7. ENVÍO WHATSAPP / EMAIL
     ========================================================= */
  function generarTextoPedido(saltoLinea) {
    let txt = "";
    carrito.forEach(i => {
      txt += `• ${i.titulo}: ${i.cantidad} x [${i.unidad}]${saltoLinea}`;
    });
    return txt;
  }

  const btnWsp = document.getElementById("dock-btn-whatsapp");
  if(btnWsp) {
      btnWsp.addEventListener("click", () => {
        let msg = "Hola HT, solicito cotización por:%0A%0A";
        msg += generarTextoPedido("%0A");
        msg += "%0AQuedo a la espera. Gracias.";
        window.open(`https://wa.me/5493585025485?text=${msg}`, "_blank");
      });
  }

  const btnEmail = document.getElementById("dock-btn-email");
  if(btnEmail) {
      btnEmail.addEventListener("click", () => {
        let body = "Hola HT, solicito cotización por:\n\n";
        body += generarTextoPedido("\n");
        body += "\nQuedo a la espera. Gracias.";
        window.location.href = `mailto:gestion@ht.agronegocios.com?subject=Solicitud Web&body=${encodeURIComponent(body)}`;
      });
  }

  // INICIALIZAR
  renderizarProductos("todos");

});