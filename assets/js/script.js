document.addEventListener('DOMContentLoaded', () => {
    let menu = document.querySelector('.menu'),
    btnMenu = document.querySelector('.btn-menu');

    btnMenu.addEventListener('click', (e) => {
        menu.classList.toggle('menu--open')

        btnMenu.classList.toggle('btn-menu--open')
    })

    function resize() {
        let width = window.innerWidth;

        if (width > 768) {
            menu.classList.remove('menu--open')
            btnMenu.classList.remove('btn-menu--open')
        } else {
            return
        }
    }

    window.addEventListener('resize', () => {
        resize()
    })
    resize()

    // Catalog Gallery Logic
    const catalogCards = document.querySelectorAll('.catalog-card');

    catalogCards.forEach(card => {
        const zones = card.querySelectorAll('.catalog-card__zone');
        const images = card.querySelectorAll('.catalog-card__image');
        const dots = card.querySelectorAll('.catalog-card__dot');

        if (zones.length > 0 && images.length > 0 && dots.length > 0) {
            zones.forEach(zone => {
                zone.addEventListener('mouseenter', function() {
                    const index = this.getAttribute('data-index');

                    // Remove active class from all
                    images.forEach(img => img.classList.remove('catalog-card__image--active'));
                    dots.forEach(dot => dot.classList.remove('catalog-card__dot--active'));

                    // Add active class to current
                    if (images[index]) images[index].classList.add('catalog-card__image--active');
                    if (dots[index]) dots[index].classList.add('catalog-card__dot--active');
                });
            });

            // Reset to first image on mouseleave from gallery
            const gallery = card.querySelector('.catalog-card__gallery');
            if(gallery) {
                gallery.addEventListener('mouseleave', () => {
                    images.forEach(img => img.classList.remove('catalog-card__image--active'));
                    dots.forEach(dot => dot.classList.remove('catalog-card__dot--active'));
                    if (images[0]) images[0].classList.add('catalog-card__image--active');
                    if (dots[0]) dots[0].classList.add('catalog-card__dot--active');
                });
            }
        }
    });

    function tabs(wrapperMain, wrapperTab, wrapperContent, activeTab, activeContent) {
        $(wrapperTab).on('click', 'li:not('+activeTab+')', function () {
            $(this)
                .addClass(activeTab).siblings().removeClass(activeTab)
                .closest(wrapperMain).find(wrapperContent).removeClass(activeContent).eq($(this).index()).addClass(activeContent);

            document.querySelectorAll('.video-swiper').forEach((el) => {
                if (el.swiper) el.swiper.update();
            });
        });
    }
    tabs('.tabs', '.tabs__list', '.tabs__content', 'active-tab', 'active');

})