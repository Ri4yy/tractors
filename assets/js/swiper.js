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

const featuresSwiper = new Swiper('.features-swiper', {
    // Optional parameters
    enabled: true,

    breakpoints: {
        0: {
            allowTouchMove: true,
            slidesPerView: 1,
            spaceBetween: 16,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        480: {
            allowTouchMove: true,
            slidesPerView: 2,
            spaceBetween: 16,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        880: {
            allowTouchMove: true,
            slidesPerView: 3,
            spaceBetween: 20,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        1280: {
            allowTouchMove: true,
            slidesPerView: 4,
            spaceBetween: 20,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
    },
  
    // If we need pagination
    pagination: {
      el: '.features-swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.features-swiper-btn-next',
      prevEl: '.features-swiper-btn-prev',
    },
});

const mediaSwiper = new Swiper('.media-swiper', {
    enabled: true,

    breakpoints: {
        0: {
            allowTouchMove: true,
            slidesPerView: 1,
            spaceBetween: 12,
        },
        480: {
            allowTouchMove: true,
            slidesPerView: 2,
            spaceBetween: 12,
        },
        769: {
            allowTouchMove: true,
            slidesPerView: 3,
            spaceBetween: 12,
        },
        1024: {
            allowTouchMove: true,
            slidesPerView: 4,
            spaceBetween: 12,
        },
    },
    pagination: {
        el: '.media-swiper-pagination',
    },
    navigation: {
        nextEl: '.media-swiper-btn-next',
        prevEl: '.media-swiper-btn-prev',
    },
});

document.querySelectorAll('.video-swiper').forEach((swiperEl) => {
    const root = swiperEl.closest('.video-content');
    if (!root) return;

    new Swiper(swiperEl, {
        enabled: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 12,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },

        navigation: {
            nextEl: root.querySelector('.video-swiper-btn--next'),
            prevEl: root.querySelector('.video-swiper-btn--prev'),
        },
    });
});

const shortsSwiper = new Swiper('.shorts-swiper', {

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 12,
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },

    navigation: {
      nextEl: '.shorts-swiper-btn--next',
      prevEl: '.shorts-swiper-btn--prev',
    },
});
const reviewsSwiper = new Swiper('.reviews-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 12,
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
    
    navigation: {
      nextEl: '.reviews-swiper-btn--next',
      prevEl: '.reviews-swiper-btn--prev',
    },
});
const applicationsSwiper = new Swiper('.applications-swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.applications-swiper-btn--next',
      prevEl: '.applications-swiper-btn--prev',
    },
});

const partnersSwiper = new Swiper('.partners-swiper', {
    // centeredSlides: true,
    // allowTouchMove: false,
    speed: 3000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        480: {
            centeredSlides: true,
            slidesPerView: 2,
            spaceBetween: 24,
            loop: false,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        768: {
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: 30,
            loop: false,
            grid: {
                rows: 2,
                fill: "row",
            }
        },
        1280: {
            // allowTouchMove: true,
            centeredSlides: true,
            loop: true,
            freeMode: true,
            slidesPerView: 6.5,
            spaceBetween: 56,
            grid: {
                rows: 1,
                fill: "row",
            }
        },
    },
    navigation: {
        nextEl: '.partners-swiper-btn-next',
        prevEl: '.partners-swiper-btn-prev',
    },
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