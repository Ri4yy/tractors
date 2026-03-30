// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     spaceBetween: 20,
//     enabled: true,

//     breakpoints: {
//         320: {
//             allowTouchMove: true,
//             slidesPerView: 1,
//             grid: {
//                 rows: 1,
//                 fill: "row",
//             }
//         },
//         480: {
//             allowTouchMove: true,
//             slidesPerView: 2,
//             grid: {
//                 rows: 1,
//                 fill: "row",
//             }
//         },
//         768: {
//             allowTouchMove: true,
//             slidesPerView: 3,
//             grid: {
//                 rows: 1,
//                 fill: "row",
//             }
//         },
//         1024: {
//             allowTouchMove: true,
//             slidesPerView: 2,
//             grid: {
//                 rows: 2,
//                 fill: "row",
//             }
//         },
//         1280: {
//             allowTouchMove: true,
//             slidesPerView: 3,
//             grid: {
//                 rows: 2,
//                 fill: "row",
//             }
//         },
//         1921: {
//             allowTouchMove: true,
//             slidesPerView: 4,
//             grid: {
//                 rows: 2,
//                 fill: "row",
//             }
//         },
//     },
  
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
  
//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
// });

document.querySelectorAll('.video-swiper').forEach((swiperEl) => {
    const root = swiperEl.closest('.video-content');
    if (!root) return;

    new Swiper(swiperEl, {
        slidesPerView: 3,
        spaceBetween: 20,
        enabled: true,
        navigation: {
            nextEl: root.querySelector('.video-swiper-btn--next'),
            prevEl: root.querySelector('.video-swiper-btn--prev'),
        },
    });
});

const shortsSwiper = new Swiper('.shorts-swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.shorts-swiper-btn--next',
      prevEl: '.shorts-swiper-btn--prev',
    },
});
const reviewsSwiper = new Swiper('.reviews-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '.reviews-swiper-btn--next',
      prevEl: '.reviews-swiper-btn--prev',
    },
});

const clientsSwiper = new Swiper('.partners-swiper', {
    slidesPerView: 6.5,
    spaceBetween: 56,
    centeredSlides: true,
    allowTouchMove: false,
    speed: 3000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    loop: true,
    freeMode: true,
    breakpoints: {
        768: {
            spaceBetween: 50,
        }
    }
});

const heroSwiper = new Swiper('.hero-swiper', {
    slidesPerView: 1,
    effect: 'fade',
    speed: 1000,


    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.hero-swiper-btn--next',
      prevEl: '.hero-swiper-btn--prev',
    },
});