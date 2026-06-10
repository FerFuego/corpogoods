// MENU MOBILE
document.addEventListener('DOMContentLoaded', function(){

  const parent = document.querySelector('#HeaderDrawer-productos');

  if(!parent) return;

  parent.addEventListener('click', function(e){
    e.preventDefault();
    const li = this.closest('li');
    const submenu = li.querySelector('.menu-drawer__menu--childlist');
    li.classList.toggle('menu-drawer__list-item--open');
  });
});

// CATEGORY MODULE SLIDER
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".copilot-category-body");
  if (!section) return;

  function initSwiperMobile() {
    if (window.innerWidth > 768) return;

    // Evitar duplicar Swiper si ya fue inicializado
    if (section.classList.contains("swiper-initialized")) return;

    // 1) Crear estructura Swiper
    const wrapper = document.createElement("div");
    wrapper.className = "swiper category-swiper";

    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    // Mover cada item al wrapper de swiper
    const items = section.querySelectorAll(".layout-block");

    items.forEach(item => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.appendChild(item);
      swiperWrapper.appendChild(slide);
    });

    wrapper.appendChild(swiperWrapper);

    // Crear bullets
    const pagination = document.createElement("div");
    pagination.className = "swiper-pagination";
    wrapper.appendChild(pagination);

    // Reemplazar contenido original
    section.innerHTML = "";
    section.appendChild(wrapper);

    // 2) Inicializar Swiper
    new Swiper(".category-swiper", {
      slidesPerView: 2.2,      // ← “peek” del siguiente slide
      spaceBetween: 0,
      centeredSlides: false,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        768: {
          enabled: false // Desactiva swiper en desktop
        }
      }
    });

    section.classList.add("swiper-initialized");
  }

  initSwiperMobile();

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      initSwiperMobile();
    }
  });
});

// CATEGORY HEADER SLIDER
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".copilot-category-header");
  if (!section) return;

  function initSwiperMobile() {
    if (window.innerWidth > 768) return;

    // Evitar duplicar Swiper si ya fue inicializado
    if (section.classList.contains("swiper-initialized")) return;

    // 1) Crear estructura Swiper
    const wrapper = document.createElement("div");
    wrapper.className = "swiper category-swiper";

    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    // Mover cada item al wrapper de swiper
    const items = section.querySelectorAll(".layout-block");

    items.forEach(item => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.appendChild(item);
      swiperWrapper.appendChild(slide);
    });

    wrapper.appendChild(swiperWrapper);

    // Crear bullets
    const pagination = document.createElement("div");
    pagination.className = "swiper-pagination";
    wrapper.appendChild(pagination);

    // Reemplazar contenido original
    section.innerHTML = "";
    section.appendChild(wrapper);

    // 2) Inicializar Swiper
    new Swiper(".category-swiper", {
      slidesPerView: 3,      // ← “peek” del siguiente slide
      spaceBetween: 0,
      centeredSlides: false,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      breakpoints: {
        768: {
          enabled: false // Desactiva swiper en desktop
        }
      }
    });

    section.classList.add("swiper-initialized");
  }

  initSwiperMobile();

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      initSwiperMobile();
    }
  });
});

// MOBILE MINI GALLERY MOBILE
document.addEventListener("DOMContentLoaded", function () {

  function isMobile() {
    return window.innerWidth <= 768;
  }

  const gallery = document.querySelector(".gallery-grid");
  if (!gallery) return;

  const bigItem = gallery.querySelector(".gallery-item--big img");
  const smallItems = gallery.querySelectorAll(".gallery-item:not(.gallery-item--big) img");

  smallItems.forEach(img => {
    img.addEventListener("click", function () {

      if (!isMobile()) return; // 👈 SOLO MOBILE

      const currentBigSrc = bigItem.src;
      const clickedSrc = this.src;

      // swap
      bigItem.src = clickedSrc;
      this.src = currentBigSrc;
    });
  });

});

// DATALAYER FORMS
document.addEventListener("DOMContentLoaded", function () {

    const observer = new MutationObserver(() => {

      const embed = document.querySelector('shopify-forms-embed');
      if (!embed || !embed.shadowRoot) return;

      const btn = embed.shadowRoot.querySelector('[data-testid="btn-form-submit"]');
      if (!btn) return;

      // Escuchar click REAL
      btn.addEventListener('click', () => {

        const form = embed.shadowRoot.querySelector('form');

        const email = form?.querySelector('#email')?.value.trim() || '';
        const phone = form?.querySelector('#phone, input[type="tel"]')?.value.trim() || '';

        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: 'form_send',
          enhanced_conversion_data: {
            email,
            phone
          }
        });

        console.log('🔥 dataLayer enviado DESDE shadow DOM');

      });

      observer.disconnect(); // ya lo encontramos, dejamos de observar

    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

});

// Switch IVA IN PRODUCT PAGE
document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("ivaToggle");
  const label = document.getElementById("ivaLabel");

  toggle.addEventListener("change", () => {

    const mode = toggle.checked ? "con" : "sin";

    label.textContent = mode === "con" ? "Con IVA" : "Sin IVA";

    // precios normales
    document.querySelectorAll(".price-toggle").forEach(el => {
      const value = mode === "con"
        ? el.dataset.priceIva
        : el.dataset.price;

      el.textContent = formatMoney(value);
    });

    // precios unitarios
    document.querySelectorAll(".unit-toggle").forEach(el => {
      const value = mode === "con"
        ? el.dataset.priceIva
        : el.dataset.price;

      el.textContent = formatMoney(value) + " c/u";
    });

  });

  function formatMoney(cents) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(cents / 100);
  }

});