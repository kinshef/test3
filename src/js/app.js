document.addEventListener('DOMContentLoaded', () => {
  let swiperInstance = null;
  function initSwiper() {
    const mobileBreakpoint = 768;
    const swiperContainer = document.querySelector('.mySwiper');

    if (!swiperContainer) return;

    if (window.innerWidth < mobileBreakpoint && !swiperInstance) {
      swiperInstance = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: false,
        navigation: {
          nextEl: '.swiper-navigation__next',
          prevEl: '.swiper-navigation__prev',
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
          },
        }
      });
    } else if (window.innerWidth >= mobileBreakpoint && swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }

  initSwiper();
  window.addEventListener('resize', initSwiper);


  function setupToggle(triggerSelector, targetSelector, closeSelector) {
    const target = document.querySelector(targetSelector);
    const trigger = document.querySelector(triggerSelector);
    const closeBtn = document.querySelector(closeSelector);
  
    const toggle = () => target.classList.toggle('open');
  
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  
    document.addEventListener('click', (e) => {
      if (!e.target.closest(targetSelector) && !e.target.closest(triggerSelector)) {
        target.classList.remove('open');
      }
    });
  }
  setupToggle('#btn_modal', '#modal', '#modal__close');
  setupToggle('#header-naw__btn', '#header', '#header-naw__close');

});