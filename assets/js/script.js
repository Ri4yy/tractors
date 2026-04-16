document.addEventListener('DOMContentLoaded', () => {
    let menu = document.querySelector('.mobile-menu'),
    btnMenu = document.querySelector('.btn-menu');

    btnMenu.addEventListener('click', (e) => {
        menu.classList.toggle('open')

        btnMenu.classList.toggle('open')
    })

    const catalogTrigger = document.querySelector('.header__catalog-trigger');
    const catalogMenu = document.querySelector('.catalog-menu');
    const headerOverlay = document.querySelector('.header-overlay');
    if (catalogTrigger && catalogMenu) {
        function setCatalogScrollLock(locked) {
            document.documentElement.classList.toggle('no-scroll', locked);
            document.body.classList.toggle('no-scroll', locked);
        }

        catalogTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            catalogMenu.classList.toggle('open');
            setCatalogScrollLock(catalogMenu.classList.contains('open'));
            headerOverlay.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!catalogMenu.classList.contains('open')) return;
            const t = e.target;
            if (catalogMenu.contains(t) || catalogTrigger.contains(t)) return;
            catalogMenu.classList.remove('open');
            setCatalogScrollLock(false);
            headerOverlay.classList.remove('open');
        });
    }

    const header = document.querySelector('.header');
    const headerWrapper = header?.querySelector('.header__wrapper') || header;
    if (header && headerWrapper) {
        const toggleFixedHeader = () => {
            const headerHeight = headerWrapper.offsetHeight;
            const isFixed = window.scrollY > headerHeight;

            header.classList.toggle('fixed', isFixed);
            document.body.style.paddingTop = isFixed ? `${headerHeight}px` : '';
        };

        toggleFixedHeader();
        window.addEventListener('scroll', toggleFixedHeader, { passive: true });
        window.addEventListener('resize', toggleFixedHeader);
    }

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

    document.querySelectorAll('.catalog-detail-props__item').forEach((item) => {
        const trigger = item.querySelector('.catalog-detail-props__item-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });

    document.addEventListener('click', (e) => {
        const button = e.target.closest('.review-card__more');
        if (!button) return;

        const card = button.closest('.review-card');
        const text = card?.querySelector('.review-card__text');
        if (!text) return;

        const isOpen = text.classList.toggle('open');
        button.textContent = isOpen ? 'Скрыть' : 'Подробнее';
    });

    document.querySelectorAll('.mobile-menu-section-list__trigger').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.mobile-menu-section-list__item');
            const list = btn.closest('.mobile-menu-section-list');
            if (!item || !list) return;

            const wasOpen = item.classList.contains('open');

            list.querySelectorAll('.mobile-menu-section-list__item').forEach((el) => {
                el.classList.remove('open');
            });

            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });

    document.querySelectorAll('.header-contacts__mobile-trigger').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const root = trigger.closest('.header-contacts');
            if (!root) return;
            root.classList.toggle('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.header-contacts')) return;
        document.querySelectorAll('.header-contacts.open').forEach((block) => {
            block.classList.remove('open');
        });
    });

    const filterPanelBtn = document.querySelector('.filter-panel__btn');
    const catalogMainFilter = document.querySelector('.catalog-main__filter');
    const filterClose = document.querySelector('.filter__close');

    if (filterPanelBtn && catalogMainFilter) {
        filterPanelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            catalogMainFilter.classList.add('open');
        });

        if (filterClose) {
            filterClose.addEventListener('click', () => {
                catalogMainFilter.classList.remove('open');
            });
        }

        document.addEventListener('click', (e) => {
            if (!catalogMainFilter.classList.contains('open')) return;
            const filter = catalogMainFilter.querySelector('.filter');
            if (filter && filter.contains(e.target)) return;
            catalogMainFilter.classList.remove('open');
        });
    }

    document.querySelectorAll('.filter-category-select').forEach((root) => {
        const trigger = root.querySelector('.filter-category-select__trigger');
        const panel = root.querySelector('.filter-category-select__description');
        if (!trigger || !panel) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = root.classList.toggle('open');
            panel.classList.toggle('active', isOpen);
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.filter-category-select')) return;
        document.querySelectorAll('.filter-category-select').forEach((root) => {
            const panel = root.querySelector('.filter-category-select__description');
            root.classList.remove('open');
            if (panel) panel.classList.remove('active');
        });
    });

    // Cookie
    function checkCookies(){
        let cookieDate = localStorage.getItem('cookieDate');
        let cookieNotification = document.getElementById('cookie_notification');
        let cookieBtn = cookieNotification.querySelector('.cookie__btn');
        
        if( !cookieDate || (+cookieDate + 31536000000) < Date.now() ){
            cookieNotification.classList.add('show');
        }
        
        cookieBtn.addEventListener('click', function(){
            localStorage.setItem( 'cookieDate', Date.now() );
            cookieNotification.classList.remove('show');
        })
    }
    checkCookies();

    // Custom select logic
    const wrappers = document.querySelectorAll('.select-wrapper');

    if (wrappers.length) {
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
    }

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

    // Rutube Video Player
    function getRutubeInfo(url) {
        const shortsMatch = url.match(/rutube\.ru\/shorts\/([a-zA-Z0-9]+)/);
        if (shortsMatch) {
            return {
                embedUrl: `https://rutube.ru/play/embed/${shortsMatch[1]}/`,
                thumbUrl: `https://rutube.ru/api/video/${shortsMatch[1]}/thumbnail/?redirect=1`,
            };
        }

        const embedMatch = url.match(/rutube\.ru\/play\/embed\/([a-zA-Z0-9]+)/);
        if (embedMatch) {
            return {
                embedUrl: `https://rutube.ru/play/embed/${embedMatch[1]}/`,
                thumbUrl: `https://rutube.ru/api/video/${embedMatch[1]}/thumbnail/?redirect=1`,
            };
        }

        const videoMatch = url.match(/rutube\.ru\/video\/([a-zA-Z0-9]+)/);
        if (videoMatch) {
            return {
                embedUrl: `https://rutube.ru/play/embed/${videoMatch[1]}/`,
                thumbUrl: `https://rutube.ru/api/video/${videoMatch[1]}/thumbnail/?redirect=1`,
            };
        }

        return null;
    }

    function initVideoPlay(configs) {
        configs.forEach(({ playBtn, container, thumb }) => {
            document.querySelectorAll(playBtn).forEach((btn) => {
                const src = btn.dataset.src;
                if (!src) return;

                btn.addEventListener('click', () => {
                    const info = getRutubeInfo(src);
                    if (!info) return;

                    const wrapper = btn.closest(container);
                    if (!wrapper) return;

                    const iframe = document.createElement('iframe');
                    iframe.src = info.embedUrl + '?autoplay=1';
                    iframe.frameBorder = '0';
                    iframe.allowFullscreen = true;
                    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media;';

                    const thumbEl = wrapper.querySelector(thumb);
                    if (thumbEl) thumbEl.remove();
                    btn.remove();

                    wrapper.appendChild(iframe);
                });
            });
        });
    }

    initVideoPlay([
        { playBtn: '.about-video__play',  container: '.about-video',  thumb: '.about-video__thumb'  },
        { playBtn: '.video-card__play',   container: '.video-card',   thumb: '.video-card__thumb'   },
    ]);

    // Construction block
    document.querySelectorAll('.construction').forEach((construction) => {
        const buttons = Array.from(construction.querySelectorAll('.construction-list__item'));
        const items = Array.from(construction.querySelectorAll('.construction__item-inner'));
        if (!buttons.length || !items.length) return;

        const itemByNumber = new Map();
        const firstGroup = [];
        const secondGroup = [];

        items.forEach((item, idx) => {
            const numEl = item.querySelector('.construction__item-inner-title span');
            const parsed = numEl ? parseInt(numEl.textContent, 10) : NaN;
            const number = Number.isFinite(parsed) ? parsed : idx + 1;
            itemByNumber.set(number, item);

            const parentItem = item.closest('.construction__item');
            const itemGroup = parentItem ? Array.from(parentItem.parentElement?.children || []).indexOf(parentItem) : -1;
            if (itemGroup === 0) firstGroup.push(number);
            else secondGroup.push(number);
        });

        if (!firstGroup.length || !secondGroup.length) return;

        const mediaQuery = window.matchMedia('(max-width: 1024px)');

        let lastClicked = buttons.find((btn) => btn.classList.contains('active')) || buttons[0];
        let lastClickedNumber = parseInt(lastClicked?.textContent || '', 10) || firstGroup[0];

        let firstActive = firstGroup.includes(lastClickedNumber) ? lastClickedNumber : firstGroup[0];
        let secondActive = secondGroup.slice(0, 2);
        let mobileActive = lastClickedNumber;

        function render() {
            const isMobile = mediaQuery.matches;

            itemByNumber.forEach((item) => {
                item.hidden = true;
            });

            if (isMobile) {
                const mobileItem = itemByNumber.get(mobileActive);
                if (mobileItem) mobileItem.hidden = false;
            } else {
                const firstItem = itemByNumber.get(firstActive);
                if (firstItem) firstItem.hidden = false;

                secondActive.forEach((num) => {
                    const item = itemByNumber.get(num);
                    if (item) item.hidden = false;
                });
            }

            buttons.forEach((btn) => {
                const number = parseInt(btn.textContent || '', 10);
                let isActive = false;

                if (isMobile) {
                    isActive = number === mobileActive;
                } else {
                    isActive = number === firstActive || secondActive.includes(number);
                }

                btn.classList.toggle('active', isActive);
            });
        }

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const number = parseInt(btn.textContent || '', 10);
                if (!Number.isFinite(number) || !itemByNumber.has(number)) return;

                lastClickedNumber = number;
                mobileActive = number;

                if (!mediaQuery.matches) {
                    if (firstGroup.includes(number)) {
                        firstActive = number;
                    } else if (secondGroup.includes(number)) {
                        if (!secondActive.includes(number)) {
                            secondActive.push(number);
                            if (secondActive.length > 2) secondActive.shift();
                        }
                    }
                }

                render();
            });
        });

        function handleBreakpointChange() {
            if (mediaQuery.matches) {
                mobileActive = lastClickedNumber;
            } else if (firstGroup.includes(lastClickedNumber)) {
                firstActive = lastClickedNumber;
            } else if (secondGroup.includes(lastClickedNumber) && !secondActive.includes(lastClickedNumber)) {
                secondActive.push(lastClickedNumber);
                if (secondActive.length > 2) secondActive.shift();
            }

            render();
        }

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleBreakpointChange);
        } else if (typeof mediaQuery.addListener === 'function') {
            mediaQuery.addListener(handleBreakpointChange);
        }

        render();
    });

    // Map
    const mapLinks = document.querySelectorAll('.map__svg a');

    let okrug = {
        center: 'Центральный федеральный округ',                    // 1
        volga: 'Приволжский федеральный округ',                     // 2
        northwestern: 'Северо-Западный федеральный округ',          // 3
        ural: 'Уральский федеральный округ',                        // 4
        fareastern: 'Дальневосточный федеральный округ',            // 5
        southern: 'Южный федеральный округ',                        // 6
        sibir: 'Сибирский федеральный округ',                       // 7
        farwest: 'Северо-Кавказский федеральный округ',             // 8
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