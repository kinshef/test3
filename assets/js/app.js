/******/ (() => { // webpackBootstrap
document.addEventListener('DOMContentLoaded', function () {
  var swiperInstance = null;
  function initSwiper() {
    var mobileBreakpoint = 768;
    var swiperContainer = document.querySelector('.mySwiper');
    if (!swiperContainer) return;
    if (window.innerWidth < mobileBreakpoint && !swiperInstance) {
      swiperInstance = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: false,
        navigation: {
          nextEl: '.swiper-navigation__next',
          prevEl: '.swiper-navigation__prev'
        },
        breakpoints: {
          480: {
            slidesPerView: 2
          }
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
    var target = document.querySelector(targetSelector);
    var trigger = document.querySelector(triggerSelector);
    var closeBtn = document.querySelector(closeSelector);
    var toggle = function toggle() {
      return target.classList.toggle('open');
    };
    trigger === null || trigger === void 0 || trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });
    closeBtn === null || closeBtn === void 0 || closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest(targetSelector) && !e.target.closest(triggerSelector)) {
        target.classList.remove('open');
      }
    });
  }
  setupToggle('#btn_modal', '#modal', '#modal__close');
  setupToggle('#header-naw__btn', '#header', '#header-naw__close');
});
/******/ })()
;