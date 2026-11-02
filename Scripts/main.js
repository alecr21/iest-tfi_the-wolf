"use strict";

// ==========================================================
// CONFIGURACIÓN GLOBAL Y WHATSAPP
// ==========================================================
const PHONE_NUMBER = "543837690627"; // Tu número de WhatsApp con código de país

// ==========================================================
// MÓDULO DE DATOS: SERVICIOS Y TRABAJOS EN ACCIÓN
// ==========================================================
const TRABAJOS_SHOWCASE = [
  {
    id: 1,
    categoria: "mantenimiento",
    etiqueta: "Mantenimiento",
    titulo: "Limpieza interna de notebook",
    descripcion: "Mantenimiento profundo y cambio de pasta térmica.",
    tipo: "video",
    archivo: "../servicios/limpieza_notebook_proceso.mp4",
  },
  {
    id: 2,
    categoria: "reparacion",
    etiqueta: "Reparación",
    titulo: "Cambio de disco SSD",
    descripcion: "Migración de sistema y velocidad extrema.",
    tipo: "video",
    archivo: "../servicios/cambio_ssd_accion.mp4",
  },
  {
    id: 3,
    categoria: "software",
    etiqueta: "Software",
    titulo: "Instalación de Windows",
    descripcion: "Sistema limpio, optimizado y drivers al día.",
    tipo: "imagen",
    archivo: "../servicios/windows.jpg"
  },
  {
    id: 4,
    categoria: "impresoras",
    etiqueta: "Impresoras",
    titulo: "Mantenimiento de impresoras",
    descripcion: "Limpieza de cabezales y solución de atascos.",
    tipo: "imagen",
    archivo: "../servicios/impresora.jpg",
  },
  {
    id: 5,
    categoria: "conectividad",
    etiqueta: "Conectividad",
    titulo: "Configuración de Redes",
    descripcion: "Optimización de Wi-Fi y extensores de señal.",
    tipo: "imagen",
    archivo: "../servicios/red.jpg"
  },
  {
    id: 6,
    categoria: "desarrollo",
    etiqueta: "Desarrollo",
    titulo: "Desarrollo web a medida",
    descripcion: "Interfaces modernas y sistemas funcionales.",
    tipo: "imagen",
    archivo: "../servicios/software.jpg",
  }
];

const SERVICIOS_ESPECIALES = [
  {
    id: "mantenimiento",
    titulo: "Mantenimiento y limpieza",
    subtitulo: "Cuidado preventivo para que tus equipos rindan al máximo.",
    icono: "fa-solid fa-screwdriver-wrench",
    esFullWidth: false,
    items: [
      "Limpieza técnica de PC y notebooks",
      "Desarme interno y cambio de pasta térmica",
      "Mantenimiento preventivo de impresoras",
      "Revisión integral de componentes"
    ]
  },
  {
    id: "reparacion",
    titulo: "Reparación y mejoras",
    subtitulo: "Diagnóstico certero y repotenciación de equipos.",
    icono: "fa-solid fa-microchip",
    esFullWidth: false,
    items: [
      "Instalación de discos SSD (Upgrade)",
      "Optimización y actualización de drivers",
      "Configuración de periféricos",
      "Diagnóstico avanzado de fallas"
    ]
  },
  {
    id: "software",
    titulo: "Software y configuración",
    subtitulo: "Dejamos tu equipo seguro, fluido y listo para usar.",
    icono: "fa-solid fa-sliders",
    esFullWidth: false,
    items: [
      "Instalación de Windows y Office",
      "Instalación de programas y utilidades",
      "Solución de errores del sistema",
      "Eliminación de virus y malware",
      "Configuración de redes Wi-Fi"
    ]
  },
  {
    id: "celulares",
    titulo: "Asistencia para celulares",
    subtitulo: "Soluciones de software y optimización móvil.",
    icono: "fa-solid fa-mobile-screen-button",
    esFullWidth: false,
    items: [
      "Diagnóstico de software y lentitud",
      "Configuración inicial y respaldo",
      "Solución de errores en aplicaciones",
      "Liberación de espacio y memoria"
    ]
  },
  {
    id: "desarrollo",
    titulo: "Desarrollo de software y páginas web",
    subtitulo: "Soluciones digitales personalizadas para potenciar tu negocio.",
    icono: "fa-solid fa-code",
    esFullWidth: true,
    items: [
      "Diseño y desarrollo de páginas web institucionales",
      "Creación de aplicaciones y sistemas locales a medida",
      "Asesoramiento y soporte digital integral"
    ]
  }
];

// ==========================================================
// MÓDULO DE TIENDA Y CARRITO PERSISTENTE
// ==========================================================
// Los productos ahora se cargan desde Supabase
let PRODUCTOS_TIENDA = [];

const ETIQUETAS_CATEGORIA = {
  notebooks: "Notebooks",
  computadoras: "Computadoras",
  celulares: "Celulares",
  componentes: "Componentes",
  perifericos: "Periféricos",
  accesorios: "Accesorios"
};

function formatMoney(amount) {
  return "$" + amount.toLocaleString("es-AR");
}

let carrito = JSON.parse(localStorage.getItem("wolf_cart")) || [];

function saveCart() {
  localStorage.setItem("wolf_cart", JSON.stringify(carrito));
  updateCartUI();
}

// ==========================================================
// FUNCIONES DE RENDERIZADO
// ==========================================================
function renderMediaContent(item) {
  if (item.tipo === "video") {
    return `
      <video class="reel-media" autoplay muted loop playsinline poster="${item.poster || ''}">
        <source src="${item.archivo}" type="video/mp4">
      </video>
    `;
  } else {
    return `
      <img class="reel-media" src="${item.archivo}" alt="${item.titulo}" loading="lazy" onerror="this.src='../logo/1.png'">
    `;
  }
}

function renderShowcaseCards() {
  const container = document.getElementById("showcase-container");
  if (!container) return;

  container.innerHTML = TRABAJOS_SHOWCASE.map((trabajo, index) => {
    const delay = (index % 3) * 80;
    return `
      <article class="showcase-reel-card" data-category="${trabajo.categoria}" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="reel-wrapper">
              ${renderMediaContent(trabajo)}
              <div class="reel-overlay-gradient"></div>
              <span class="reel-badge">${trabajo.etiqueta}</span>
              
              <div class="reel-info">
                  <h3>${trabajo.titulo}</h3>
                  <p>${trabajo.descripcion}</p>
                  <a href="#" class="reel-btn btn-wa-direct" data-service="${trabajo.titulo}">
                      Consultar <i class="fa-brands fa-whatsapp"></i>
                  </a>
              </div>
          </div>
      </article>
    `;
  }).join("");
}

function renderServicesCards() {
  const container = document.getElementById("services-container");
  if (!container) return;

  container.innerHTML = SERVICIOS_ESPECIALES.map((servicio, index) => {
    const delay = (index % 2) * 80;
    const fullWidthClass = servicio.esFullWidth ? "full-width-card" : "";
    const listGridClass = servicio.esFullWidth ? "grid-list" : "";

    const itemsHTML = servicio.items.map(item => `
      <li><i class="fa-solid fa-check check-icon"></i> ${item}</li>
    `).join("");

    return `
      <article class="service-detail-card ${fullWidthClass}" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="service-card-header">
              <div class="card-icon">
                  <i class="${servicio.icono}"></i>
              </div>
              <div>
                  <h3>${servicio.titulo}</h3>
                  <p class="card-subtitle">${servicio.subtitulo}</p>
              </div>
          </div>

          <ul class="service-list ${listGridClass}">
              ${itemsHTML}
          </ul>
      </article>
    `;
  }).join("");
}

async function cargarProductosDesdeSupabase() {
  const container = document.getElementById("products-container");

  if (!container) return;

  const noResultsMsg = document.getElementById("no-results-msg");
  if (noResultsMsg) noResultsMsg.style.display = "none";

  container.innerHTML = "<p>Cargando productos...</p>";

  try {
    const { data, error } = await supabaseClient
      .from("productos")
      .select("*")
      .eq("disponible", true)
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    PRODUCTOS_TIENDA = data.map(producto => ({
      id: String(producto.id),
      nombre: producto.nombre,
      categoria: producto.categoria,
      etiqueta: ETIQUETAS_CATEGORIA[producto.categoria] || producto.categoria,
      precio: Number(producto.precio),
      imagen: producto.imagen_url,
      descripcion: producto.descripcion || "Consultá por este producto."
    }));

    renderShopProducts();
    filterProducts();

  } catch (error) {
    console.error("Error al cargar productos desde Supabase:", error);

    container.innerHTML = `
      <p>No pudimos cargar los productos. Intentá nuevamente más tarde.</p>
    `;
  }
}

// Los datos externos solo se interpolan en texto o atributos HTML entre comillas.
function escapeHtml(value) {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value ?? "").replace(/[&<>"']/g, character => entities[character]);
}

function safeProductImageUrl(value) {
  const fallback = "../logo/1.png";
  const source = typeof value === "string" ? value.trim() : "";
  if (!source) return fallback;
  try {
    const url = new URL(source, document.baseURI || "https://the-wolf.invalid/page/tienda.html");
    return ["http:", "https:"].includes(url.protocol) ? source : fallback;
  } catch {
    return fallback;
  }
}

function renderShopProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = PRODUCTOS_TIENDA.map((prod, index) => {
    const delay = (index % 4) * 60;
    return `
      <article class="shop-product-card" data-category="${escapeHtml(prod.categoria)}" data-name="${escapeHtml(String(prod.nombre ?? "").toLowerCase())}" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="product-card-img-wrapper">
              <span class="product-category-tag">${escapeHtml(prod.etiqueta)}</span>
              <img class="product-card-img" src="${escapeHtml(safeProductImageUrl(prod.imagen))}" alt="${escapeHtml(prod.nombre)}" loading="lazy" onerror="this.onerror=null;this.src='../logo/1.png'">
          </div>
          <div class="product-card-info">
              <h3>${escapeHtml(prod.nombre)}</h3>
              <div class="product-price">${escapeHtml(formatMoney(prod.precio))}</div>
              <div class="product-card-actions">
                  <button class="btn btn-outline btn-sm btn-detail" data-id="${escapeHtml(prod.id)}">
                      Ver detalle
                  </button>
                  <button class="btn btn-primary btn-sm btn-add-cart" data-id="${escapeHtml(prod.id)}">
                      <i class="fa-solid fa-cart-plus"></i> Agregar
                  </button>
              </div>
          </div>
      </article>
    `;
  }).join("");
}

function updateCartUI() {
  const cartCountEl = document.getElementById("cart-count");
  const cartContainer = document.getElementById("cart-items-container");
  const cartTotalEl = document.getElementById("cart-total-price");

  if (!cartCountEl || !cartContainer || !cartTotalEl) return;

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  cartCountEl.textContent = totalItems;

  if (carrito.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty-msg">
          <i class="fa-solid fa-basket-shopping"></i>
          <p>Tu carrito está vacío.</p>
      </div>
    `;
    cartTotalEl.textContent = "$0";
    return;
  }

  let totalPrecio = 0;

  cartContainer.innerHTML = carrito.map(item => {
    const subtotal = item.precio * item.cantidad;
    totalPrecio += subtotal;

    return `
      <div class="cart-item-row">
          <div class="cart-item-details">
              <strong>${escapeHtml(item.nombre)}</strong>
              <div class="cart-item-price">Unidad: ${escapeHtml(formatMoney(item.precio))}</div>
              <div class="cart-item-price cart-item-subtotal">Subtotal: ${escapeHtml(formatMoney(subtotal))}</div>
          </div>
          <div class="cart-item-controls">
              <button class="cart-qty-btn btn-minus" data-id="${escapeHtml(item.id)}">-</button>
              <span class="cart-qty-num">${escapeHtml(item.cantidad)}</span>
              <button class="cart-qty-btn btn-plus" data-id="${escapeHtml(item.id)}">+</button>
          </div>
      </div>
    `;
  }).join("");

  cartTotalEl.textContent = formatMoney(totalPrecio);
}

function addToCart(prodId) {
  const producto = PRODUCTOS_TIENDA.find(p => p.id === prodId);
  if (!producto) return;

  const itemExistente = carrito.find(item => item.id === prodId);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  saveCart();
  openCartDrawer();
}

function updateItemQuantity(prodId, delta) {
  const item = carrito.find(i => i.id === prodId);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.id !== prodId);
  }

  saveCart();
}

function openProductModal(prodId) {
  const producto = PRODUCTOS_TIENDA.find(p => p.id === prodId);
  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body-content");

  if (!producto || !modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-product-layout">
        <div class="modal-product-img">
            <img src="${escapeHtml(safeProductImageUrl(producto.imagen))}" alt="${escapeHtml(producto.nombre)}" onerror="this.onerror=null;this.src='../logo/1.png'">
        </div>
        <div class="modal-product-details">
            <span class="eyebrow">${escapeHtml(producto.etiqueta)}</span>
            <h2>${escapeHtml(producto.nombre)}</h2>
            <div class="modal-price">${escapeHtml(formatMoney(producto.precio))}</div>
            <p class="modal-description">${escapeHtml(producto.descripcion)}</p>
            <div class="modal-actions">
                <button class="btn btn-primary btn-add-modal" data-id="${escapeHtml(producto.id)}">
                    <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// function closeModal() {
//   const modal = document.getElementById("product-modal");
//   if (modal) {
//     modal.classList.remove("open");
//     modal.setAttribute("aria-hidden", "true");
//   }
// }

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (modal) {
    // Quitamos el foco de cualquier elemento dentro del modal antes de ocultarlo
    const activeElement = modal.querySelector(":focus");
    if (activeElement) {
      activeElement.blur();
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  }
}

// function closeCartDrawer() {
//   const drawer = document.getElementById("cart-drawer");
//   if (drawer) {
//     drawer.classList.remove("open");
//     drawer.setAttribute("aria-hidden", "true");
//   }
// }

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) {
    // Quitamos el foco de cualquier elemento dentro del drawer antes de ocultarlo
    const activeElement = drawer.querySelector(":focus");
    if (activeElement) {
      activeElement.blur();
    }

    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }
}
function checkoutWhatsApp() {
  if (carrito.length === 0) return;

  let mensaje = "Hola THE WOLF!\nQuiero consultar la disponibilidad de los siguientes productos de la tienda:\n\n";
  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    mensaje += `${index + 1}. *${item.nombre}* x${item.cantidad} - ${formatMoney(subtotal)}\n`;
  });

  mensaje += `\n*Total Estimado:* ${formatMoney(total)}\n\n¿Tienen stock disponible para confirmar la compra?`;

  const encodedMsg = encodeURIComponent(mensaje);
  window.location.href = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMsg}`;
}

function filterProducts() {
  const searchVal = document.getElementById("shop-search-input")?.value.toLowerCase().trim() || "";
  const activeCategory = document.querySelector("#shop-filter-bar .filter-btn.active")?.getAttribute("data-filter") || "all";
  const cards = document.querySelectorAll(".shop-product-card");
  const noResultsMsg = document.getElementById("no-results-msg");

  let matchCount = 0;

  cards.forEach(card => {
    const category = card.getAttribute("data-category");
    const name = card.getAttribute("data-name");

    const matchesCategory = (activeCategory === "all" || category === activeCategory);
    const matchesSearch = (name.includes(searchVal) || category.includes(searchVal));

    if (matchesCategory && matchesSearch) {
      card.classList.remove("hide");
      matchCount++;
    } else {
      card.classList.add("hide");
    }
  });

  if (noResultsMsg) {
    noResultsMsg.style.display = matchCount === 0 ? "block" : "none";
  }
}

// ==========================================================
// INICIALIZACIÓN GENERAL AL CARGAR EL DOM
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Configuración de WhatsApp general
  const waBtn = $("#wa-btn");
  if (waBtn) {
    const defaultMsg = encodeURIComponent("Hola The Wolf!\nQuiero más información sobre la tienda:");
    waBtn.href = `https://wa.me/${PHONE_NUMBER}?text=${defaultMsg}`;
  }

  // Año automático en footer
  const year = $("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Header Scroll
  const header = $(".top");
  function updateHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 12);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // MENÚ HAMBURGUESA
  const burger = $("#burger");
  const nav = $("#nav-menu");

  function setMenu(open) {
    if (!burger || !nav) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

    $$(".nav-link", nav).forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("click", (event) => {
      if (
        burger.getAttribute("aria-expanded") === "true" &&
        !nav.contains(event.target) &&
        !burger.contains(event.target)
      ) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  // Renderizar componentes dinámicos de páginas
  renderShowcaseCards();
renderServicesCards();
cargarProductosDesdeSupabase();
updateCartUI();

  // LÓGICA DE FORMULARIO DE CONTACTO A WHATSAPP
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita la recarga de página

      const nombre = document.getElementById("nombre")?.value.trim() || "";
      const tipoConsulta = document.getElementById("tipo_consulta")?.value || "";
      const mensaje = document.getElementById("mensaje")?.value.trim() || "";

      // Construcción del mensaje
      const fullMessage = 
        `Hola The Wolf!\n` +
        `Mi nombre es: ${nombre}\n` +
        `Tipo de consulta: *${tipoConsulta}*\n\n` +
        `Detalle: ${mensaje}`;

      const encodedMsg = encodeURIComponent(fullMessage);
      const url = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMsg}`;

      // Redirección directa a WhatsApp
      window.location.href = url;
    });
  }

  // Buscador Input Eventos
  const searchInput = document.getElementById("shop-search-input");
  const searchClearBtn = document.getElementById("search-clear-btn");

  searchInput?.addEventListener("input", (e) => {
    if (searchClearBtn) searchClearBtn.style.display = e.target.value ? "block" : "none";
    filterProducts();
  });

  searchClearBtn?.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
      searchClearBtn.style.display = "none";
      filterProducts();
    }
  });

  // Filtros de Categoría (Tienda y Servicios)
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const parentBar = btn.closest("#shop-filter-bar");
      if (parentBar) {
        // Filtros de tienda
        parentBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterProducts();
      } else {
        // Filtros de servicios / showcase
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filterValue = btn.getAttribute("data-filter");
        const cards = document.querySelectorAll(".showcase-reel-card");
        cards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filterValue === "all" || filterValue === category) {
            card.classList.remove("hide");
          } else {
            card.classList.add("hide");
          }
        });
      }
    });
  });

  // Clics Globales (Detalle, Carrito, Cantidades, WhatsApp directo)
  document.addEventListener("click", (e) => {
    const detailBtn = e.target.closest(".btn-detail");
    if (detailBtn) openProductModal(detailBtn.getAttribute("data-id"));

    const addBtn = e.target.closest(".btn-add-cart");
    if (addBtn) addToCart(addBtn.getAttribute("data-id"));

    const addModalBtn = e.target.closest(".btn-add-modal");
    if (addModalBtn) {
      addToCart(addModalBtn.getAttribute("data-id"));
      closeModal();
    }

    const plusBtn = e.target.closest(".btn-plus");
    if (plusBtn) updateItemQuantity(plusBtn.getAttribute("data-id"), 1);

    const minusBtn = e.target.closest(".btn-minus");
    if (minusBtn) updateItemQuantity(minusBtn.getAttribute("data-id"), -1);

    const waServiceBtn = e.target.closest(".btn-wa-direct");
    if (waServiceBtn) {
      e.preventDefault();
      const serviceName = waServiceBtn.getAttribute("data-service") || "un servicio";
      const message = `Hola THE WOLF!\nQuiero consultar información sobre el servicio de: *${serviceName}*`;
      const encodedMsg = encodeURIComponent(message);
      window.location.href = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMsg}`;
    }
  });

  // Eventos Carrito & Modal
  document.getElementById("open-cart-btn")?.addEventListener("click", openCartDrawer);
  document.getElementById("close-cart-btn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCartDrawer);
  document.getElementById("close-modal-btn")?.addEventListener("click", closeModal);
  document.getElementById("modal-backdrop")?.addEventListener("click", closeModal);

  document.getElementById("clear-cart-btn")?.addEventListener("click", () => {
    if (carrito.length > 0 && confirm("¿Vaciar el carrito?")) {
      carrito = [];
      saveCart();
    }
  });

  document.getElementById("checkout-wa-btn")?.addEventListener("click", checkoutWhatsApp);

  // Volver Arriba
  const backToTop = $("#back-to-top");
  function updateBackToTop() {
    backToTop?.classList.toggle("visible", window.scrollY > 400);
  }
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });

  backToTop?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  });

  // Animaciones AOS
  if (window.AOS && !reducedMotion.matches) {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 55,
      disable: "mobile"
    });
  }

  // Vanilla Tilt
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (window.VanillaTilt && finePointer.matches && !reducedMotion.matches) {
    VanillaTilt.init($$("[data-tilt]"), {
      max: 6,
      speed: 400,
      glare: true,
      "max-glare": 0.12
    });
  }
});