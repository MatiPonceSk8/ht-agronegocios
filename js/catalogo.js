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
      specs: { "Concentración": "79% WG", "Acción": "Sistémica" }
    },
    {
      id: 2, 
      categoria: "herbicida", 
      tag: "Herbicida Hormonal", 
      titulo: "2,4-D Etil Hexil",
      unidad: "Bidones (20L)",
      descripcion: "Herbicida sistémico de baja volatilidad (Éster). Excelente penetración en cutículas cerosas.",
      specs: { "Formulación": "EC", "Volatilidad": "Baja" }
    },
    {
      id: 3, 
      categoria: "herbicida", 
      tag: "Herbicida Selectivo", 
      titulo: "Imazetapir 10%",
      unidad: "Bidones (20L)",
      descripcion: "Acción residual y sistémica para soja, maní y alfalfa. Controla gramíneas y latifoliadas.",
      specs: { "Uso": "Pre/Post", "Cultivos": "Soja, Maní" }
    },
    {
      id: 4, 
      categoria: "herbicida", 
      tag: "Herbicida de Contacto", 
      titulo: "Paraquat Sigma",
      unidad: "Bidones (20L)",
      descripcion: "Desecante rápido no selectivo. La herramienta ideal para el 'doble golpe' sin residualidad.",
      specs: { "Efecto": "Quemante", "Residualidad": "Nula" }
    },
    {
      id: 5, 
      categoria: "fertilizante", 
      tag: "Bioestimulante", 
      titulo: "Amino 26",
      unidad: "Bidones (20L)",
      descripcion: "Fertilizante foliar a base de aminoácidos libres. Potente anti-estrés.",
      specs: { "Composición": "Aminoácidos", "Aplicación": "Foliar" }
    },
    {
      id: 6, 
      categoria: "herbicida", 
      tag: "Herbicida Desecante", 
      titulo: "Glufosinato de Amonio",
      unidad: "Bidones (20L)",
      descripcion: "Herbicida de contacto con ligera acción sistémica. Fundamental para rotación de principios.",
      specs: { "Grupo": "H", "Control": "Amaranthus" }
    },
    {
      id: 7, 
      categoria: "herbicida", 
      tag: "Herbicida Residual", 
      titulo: "Flumioxazin Delta",
      unidad: "Bidones (5L)", 
      descripcion: "Herbicida PPO de suelo con potente acción residual. Solución para Yuyo Colorado.",
      specs: { "Modo Acción": "PPO", "Residualidad": "Alta" }
    },
    {
      id: 8, 
      categoria: "herbicida", 
      tag: "Herbicida Selectivo", 
      titulo: "Prometrina Delta",
      unidad: "Bidones (20L)",
      descripcion: "Herbicida selectivo de pre-emergencia o pre-siembra para Girasol y Soja.",
      specs: { "Familia": "Triazinas", "Uso": "Girasol/Soja" }
    },
    {
      id: 9, 
      categoria: "coadyuvante", 
      tag: "Coadyuvante Premium", 
      titulo: "Metil Oil",
      unidad: "Bidones (20L)",
      descripcion: "Aceite metilado de soja. Maximiza la eficiencia de aplicación y reduce la deriva.",
      specs: { "Base": "Aceite Met.", "Función": "Penetrante" }
    },
    // ID 10: TU NUEVO PRODUCTO
    {
      id: 10,
      categoria: "fertilizante",
      tag: "Fertilizante Prueba",
      titulo: "Fertilizante Inventado",
      badge: "Nuevo",
      unidad: "Bidones (20L)",
      descripcion: "Fertilizante inventado para probar si funciona la cotización automática.",
      specs: { "Composición": "N-P-K", "Aplicación": "Foliar" }
    }
  ];

  const grid = document.getElementById("catalogo-grid");
  const btnsFiltro = document.querySelectorAll(".btn-filtro");
  
  // ESTADO
  let carrito = []; 
  let filtroActual = "todos"; 
  let ultimosResultadosBusqueda = []; 

  // CARGAR MEMORIA
  if(localStorage.getItem('ht_carrito_storage')) {
      try {
          carrito = JSON.parse(localStorage.getItem('ht_carrito_storage'));
          actualizarDock(); 
      } catch(e) {
          console.error("Error al cargar carrito", e);
          localStorage.removeItem('ht_carrito_storage');
      }
  }

  /* =========================================================
     2. LÓGICA DEL BUSCADOR
     ========================================================= */
  const searchInput = document.getElementById('searchInput');

  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      const termino = e.target.value.toLowerCase().trim();

      btnsFiltro.forEach(btn => btn.classList.remove('active'));

      if (termino === "") {
        filtroActual = "todos";
        document.querySelector('[data-filter="todos"]').classList.add('active');
        renderizarProductos("todos");
        return;
      }

      const encontrados = productos.filter(p => 
         p.titulo.toLowerCase().includes(termino) || 
         p.tag.toLowerCase().includes(termino) ||
         p.categoria.toLowerCase().includes(termino)
      );

      filtroActual = "busqueda";
      ultimosResultadosBusqueda = encontrados;
      renderizarProductos("busqueda");
    });
  }

  /* =========================================================
     3. RENDERIZADO
     ========================================================= */
  function renderizarProductos(filtro) {
    if(!grid) return;
    grid.innerHTML = "";
    
    let listaA_Mostrar = [];

    if (filtro === "todos") {
        listaA_Mostrar = productos;
    } else if (filtro === "busqueda") {
        listaA_Mostrar = ultimosResultadosBusqueda;
    } else {
        listaA_Mostrar = productos.filter(p => p.categoria === filtro);
    }

    if(listaA_Mostrar.length === 0) {
      grid.innerHTML = `
            <div style="width:100%; grid-column: 1 / -1; text-align:center; padding:50px 20px; color:#888;">
                <i class="fas fa-search" style="font-size:2rem; margin-bottom:15px; opacity:0.3;"></i><br>
                No encontramos productos que coincidan.
            </div>`;
      return;
    }

    listaA_Mostrar.forEach((prod, index) => {
      const itemEnCarrito = carrito.find(i => i.id === prod.id);
      const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

      let btnClase = "btn-action-trigger";
      let btnTexto = "Cotizar";
      if (cantidadActual > 0) {
        btnClase += " has-items";
        btnTexto = `Modificar (${cantidadActual})`;
      }

      let specsHTML = "";
      if(prod.specs) {
        for (const [key, value] of Object.entries(prod.specs)) {
            specsHTML += `<div class="spec-item"><strong>${key}</strong> ${value}</div>`;
        }
      }

      // Badge Logic
      const badgeHTML = prod.badge 
          ? `<span class="card-badge ${prod.badge.toLowerCase()}">${prod.badge}</span>` 
          : '';

      const waterMarkText = prod.titulo ? prod.titulo.substring(0, 2).toUpperCase() : "HT";

      const article = document.createElement("article");
      article.classList.add("product-card", "fade-in");
      article.style.animationDelay = `${index * 0.08}s`;
      
      article.innerHTML = `
        ${badgeHTML}
        <div class="card-watermark">${waterMarkText}</div>

        <div class="card-header">
            <span class="card-tag">${prod.tag}</span>
            <h2 class="card-title">${prod.titulo}</h2>
        </div>

        <p class="card-desc">${prod.descripcion}</p>

        <div class="card-specs">
            <div class="spec-item"><strong>Presentación</strong> ${prod.unidad}</div>
            ${specsHTML}
        </div>
          
        <div class="card-actions" id="action-box-${prod.id}">
            <button class="${btnClase}" data-action="toggle" data-id="${prod.id}">
              ${btnTexto} <i class="fas fa-chevron-down"></i>
            </button>

            <div id="popover-${prod.id}" class="qty-popover">
              <span class="popover-title">Cantidad</span>
              
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
      `;
      grid.appendChild(article);
    });
  }

  /* =========================================================
     4. DELEGACIÓN DE EVENTOS
     ========================================================= */
  if(grid) {
    grid.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if(!target) return;

        const action = target.dataset.action;
        const id = parseInt(target.dataset.id, 10);

        if(isNaN(id)) return;

        if(action === "toggle") togglePopover(id);
        else if(action === "plus") cambiarQty(id, 1);
        else if(action === "minus") cambiarQty(id, -1);
        else if(action === "confirm") confirmar(id);
        else if(action === "delete") eliminar(id);
    });
  }

  function guardarEnMemoria() {
      localStorage.setItem('ht_carrito_storage', JSON.stringify(carrito));
  }

  /* =========================================================
     5. FUNCIONES LÓGICAS DE CARRITO
     ========================================================= */
  function togglePopover(id) {
    document.querySelectorAll('.qty-popover').forEach(el => {
        if(el.id !== `popover-${id}`) el.classList.remove('active');
    });
    
    const popover = document.getElementById(`popover-${id}`);
    if(popover) {
        const item = carrito.find(i => i.id === id);
        const display = document.getElementById(`qty-display-${id}`);
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
    if(!display) return;
    
    const val = parseInt(display.innerText);
    const prod = productos.find(p => p.id === id);

    if(!prod) return; 

    const existing = carrito.find(i => i.id === id);
    if(existing) {
      existing.cantidad = val;
    } else {
      carrito.push({ ...prod, cantidad: val });
    }
    guardarEnMemoria();

    const popover = document.getElementById(`popover-${id}`);
    if(popover) popover.classList.remove('active');
    
    // Notificación
    mostrarNotificacion("Producto agregado a la cotización", "success");

    renderizarProductos(filtroActual);
    actualizarDock();
  }

  function eliminar(id) {
    carrito = carrito.filter(i => i.id !== id);
    guardarEnMemoria();

    mostrarNotificacion("Producto eliminado de la lista", "delete");

    renderizarProductos(filtroActual);
    actualizarDock();
  }

  /* =========================================================
     6. BARRA INFERIOR (SMART DOCK)
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

  const btnTrash = document.getElementById("btn-trash-all");
  if(btnTrash) {
    btnTrash.addEventListener("click", () => {
      if(confirm("¿Estás seguro de que querés vaciar tu lista de cotización?")) {
        carrito = []; 
        localStorage.removeItem('ht_carrito_storage');
        
        mostrarNotificacion("Lista vaciada correctamente", "delete");

        renderizarProductos(filtroActual); 
        actualizarDock(); 
      }
    });
  }

  /* =========================================================
     7. FILTROS
     ========================================================= */
  btnsFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
      if(searchInput) searchInput.value = "";
      btnsFiltro.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filtroActual = btn.dataset.filter;
      renderizarProductos(filtroActual);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.card-actions')) {
      document.querySelectorAll('.qty-popover').forEach(el => el.classList.remove('active'));
    }
  });

  /* =========================================================
     8. ENVÍO WHATSAPP / EMAIL
     ========================================================= */
  function generarTextoPedido(saltoLinea) {
    let txt = "";
    carrito.forEach(itemCarrito => {
      // BUSCAMOS DATO FRESCO
      const productoReal = productos.find(p => p.id === itemCarrito.id);
      
      const unidadCorrecta = productoReal ? productoReal.unidad : itemCarrito.unidad;
      const tituloCorrecto = productoReal ? productoReal.titulo : itemCarrito.titulo;

      txt += `• ${tituloCorrecto}: ${itemCarrito.cantidad} x [${unidadCorrecta}]${saltoLinea}`;
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

  /* =========================================================
     9. SISTEMA DE NOTIFICACIONES TOAST (LA PARTE QUE FALTABA)
     ========================================================= */
  function mostrarNotificacion(mensaje, tipo = "success") {
    // Si olvidaste poner el div en el HTML, esto lo crea solo para que no falle
    let container = document.getElementById("toast-container");
    
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        // Estilos de emergencia
        container.style.position = "fixed";
        container.style.top = "30px";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.zIndex = "9999";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${tipo === "delete" ? "delete" : ""}`;
    
    // Si no carga el CSS, darle estilo básico
    if(getComputedStyle(container).position === 'static') { 
       toast.style.background = tipo === "delete" ? "#d32f2f" : "#1e4d2b";
       toast.style.color = "white";
       toast.style.padding = "10px 20px";
       toast.style.borderRadius = "50px";
       toast.style.marginTop = "10px";
    }

    const icono = tipo === "delete" ? '<i class="fas fa-trash-alt"></i>' : '<i class="fas fa-check-circle"></i>';
    toast.innerHTML = `${icono} <span style="margin-left:8px">${mensaje}</span>`;

    container.appendChild(toast);

    // Animación
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.5s";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  /* =========================================================
     INIT
     ========================================================= */
  renderizarProductos("todos");

});