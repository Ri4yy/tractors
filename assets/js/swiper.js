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
            grid: {
                rows: 2,
                fill: "row",
            }
        },
    },
    
    navigation: {
      nextEl: '.reviews-swiper-btn--next',
      prevEl: '.reviews-swiper-btn--prev',
    },
});
const applicationsSwiper = new Swiper('.applications-swiper', {
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

function mountHeroVideo(inner) {
    if (!inner || inner.querySelector('.hero__bg-video')) return;

    const sourceUrl = inner.dataset.videoSrc;
    if (!sourceUrl) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'hero__bg-video';

    const video = document.createElement('video');
    video.src = sourceUrl;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.disablePictureInPicture = true;
    video.controls = false;
    video.tabIndex = -1;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('aria-hidden', 'true');

    const showVideo = () => {
        wrapper.classList.add('hero__bg-video--ready');
    };

    video.addEventListener('loadeddata', showVideo, { once: true });
    video.addEventListener('canplay', showVideo, { once: true });

    wrapper.appendChild(video);
    inner.appendChild(wrapper);

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
    }
}

function unmountHeroVideo(inner) {
    if (!inner) return;
    const video = inner.querySelector('.hero__bg-video');
    if (video) {
        const media = video.querySelector('video');
        if (media) {
            media.pause();
            media.removeAttribute('src');
            media.load();
        }
        video.remove();
    }
}

function updateHeroVideos(swiper) {
    swiper.slides.forEach((slide, idx) => {
        const inner = slide.querySelector('.hero__inner');
        if (!inner) return;

        if (idx === swiper.activeIndex) {
            mountHeroVideo(inner);
        } else {
            unmountHeroVideo(inner);
        }
    });
}

if (heroSwiper && heroSwiper.slides && heroSwiper.slides.length) {
    let heroVideoEnabled = false;

    const enableHeroVideo = () => {
        if (heroVideoEnabled) return;
        heroVideoEnabled = true;
        updateHeroVideos(heroSwiper);
    };

    if (document.readyState === 'complete') {
        enableHeroVideo();
    } else {
        window.addEventListener('load', enableHeroVideo, { once: true });
    }

    heroSwiper.on('slideChangeTransitionStart', () => {
        if (!heroVideoEnabled) return;
        updateHeroVideos(heroSwiper);
    });
}

const sectionSwiper = new Swiper('.section-swiper', {
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
      el: '.section-swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.section-swiper-btn-next',
      prevEl: '.section-swiper-btn-prev',
    },
});