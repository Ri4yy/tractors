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

    // Tabs logic
    function initTabs(rootSelector, listSelector, contentSelector, activeTabClass, activeContentClass) {
        document.querySelectorAll(rootSelector).forEach((root) => {
            const list = root.querySelector(listSelector);
            if (!list) return;

            list.addEventListener('click', (e) => {
                const tab = e.target.closest('li');
                if (!tab || !list.contains(tab) || tab.classList.contains(activeTabClass)) return;

                const tabItems = Array.from(list.children).filter((el) => el.tagName === 'LI');
                const index = tabItems.indexOf(tab);
                if (index === -1) return;

                tabItems.forEach((li) => {
                    li.classList.toggle(activeTabClass, li === tab);
                });

                const panels = root.querySelectorAll(contentSelector);
                panels.forEach((panel) => {
                    panel.classList.remove('tabs__content--enter');
                });
                panels.forEach((panel, i) => {
                    panel.classList.toggle(activeContentClass, i === index);
                });

                requestAnimationFrame(() => {
                    const activePanel = root.querySelector(`${contentSelector}.${activeContentClass}`);
                    if (activePanel) {
                        void activePanel.offsetWidth;
                        activePanel.classList.add('tabs__content--enter');
                    }

                    document.querySelectorAll('.video-swiper').forEach((el) => {
                        if (el.swiper) el.swiper.update();
                    });
                });
            });
        });
    }

    initTabs('.tabs', '.tabs__list', '.tabs__content', 'active-tab', 'active');

    document.querySelectorAll('.region-content__item').forEach((item) => {
        const top = item.querySelector('.region-content__item-top');
        if (!top) return;

        top.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Custom select logic
    const wrappers = document.querySelectorAll('.select-wrapper');
    if (!wrappers.length) return;

    function closeAll(except) {
        wrappers.forEach((wrap) => {
            if (except && wrap === except) return;
            const panel = wrap.querySelector('.select-wrapper-options');
            if (panel) panel.classList.remove('active');
            wrap.classList.remove('open');
        });
    }

    wrappers.forEach((wrap) => {
        const trigger = wrap.querySelector('.select-wrapper-trigger');
        const panel = wrap.querySelector('.select-wrapper-options');
        const titleEl = wrap.querySelector('.select-wrapper-title');
        const input = wrap.querySelector('.select-wrapper-input');
        const placeholder =
            wrap.dataset.placeholder || (titleEl && titleEl.textContent.trim()) || '';

        if (!trigger || !panel || !titleEl || !input) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = panel.classList.contains('active');
            closeAll();
            if (!isOpen) {
                panel.classList.add('active');
                wrap.classList.add('open');
            }
        });

        panel.querySelectorAll('.select-wrapper-option').forEach((option) => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.dataset.value;
                if (value === undefined) return;

                const labelEl = option.querySelector('span');
                const label = labelEl ? labelEl.textContent.trim() : option.textContent.trim();

                input.value = value;
                titleEl.textContent = label;

                panel.querySelectorAll('.select-wrapper-option').forEach((el) => {
                    el.classList.remove('active');
                });
                option.classList.add('active');

                panel.classList.remove('active');
                wrap.classList.remove('open');
            });
        });
    });

    document.addEventListener('click', () => closeAll());

    document.querySelectorAll('.main-form__attach').forEach((wrap) => {
        const trigger = wrap.querySelector('.main-form__attach-trigger');
        const menu = wrap.querySelector('.main-form__attach-menu');
        if (!trigger || !menu) return;

        function closeMenu() {
            menu.hidden = true;
            trigger.setAttribute('aria-expanded', 'false');
        }

        function openMenu() {
            menu.hidden = false;
            trigger.setAttribute('aria-expanded', 'true');
        }

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (menu.hidden) openMenu();
            else closeMenu();
        });

        menu.querySelectorAll('.main-form__attach-menu-item').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-target');
                const input = id ? document.getElementById(id) : null;
                if (input) input.click();
                closeMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (!wrap.contains(e.target)) closeMenu();
        });
    });

    // Map
    const mapLinks = document.querySelectorAll('.map__svg a');

    let okrug = {
        center: 'Центральный федеральный округ',                    // 1
        volga: 'Приволжский федеральный округ',                     // 2
        northwestern: 'Северо-Западный федеральный округ',          // 3
        ural: 'Уральский федеральный округ',                        // 4
        fareastern: 'Дальневосточный федеральный округ',            // 5
    };

    mapLinks.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            let self = e.currentTarget;
            let color = self.dataset.color;
            let name = self.dataset.okrug;
            
            let nameOkrug = okrug[name];
            // document.querySelector('#map-title').textContent = nameOkrug;
        
            let mapPoint = self.querySelector('.map__point');
            if (mapPoint) mapPoint.style.display = '';
        
            let currentPaths = self.querySelectorAll('path');
            currentPaths.forEach(path => {
                if (!path.closest('g')) {
                    path.style.cssText = `fill: ${color}`;
                }
            });

            mapLinks.forEach(item => {
                if (item.getAttribute("data-okrug") === name) {
                    item.classList.add("active");
                }
            });
        });
        el.addEventListener('mouseout', (e) => {
            let self = e.currentTarget;
            let name = self.dataset.okrug;

            let mapPoint = self.querySelector('.map__point');
            if (mapPoint) mapPoint.style.display = 'none';

            let currentPath = self.querySelectorAll('path');
            if(currentPath) currentPath.forEach(el => el.style.cssText=`fill: `);

            mapLinks.forEach(item => {
                if (item.getAttribute("data-okrug") === name) {
                    item.classList.remove("active");
                }
            });
        })
    })  
})