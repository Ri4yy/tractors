document.addEventListener('DOMContentLoaded', () => {
    const HOTSPOT_GROUPS = [
        ['1', '2'],
        ['3', '4'],
        ['5', '6'],
    ];

    const HOTSPOT_CONFIGS = {
        1: {
            keyframes: [
                { progress: 0, x: 76, y: 60, visible: true },
                { progress: 0.25, x: 74, y: 58, visible: true },
                { progress: 0.5, x: 68, y: 56, visible: true },
                { progress: 0.75, x: 60, y: 53, visible: true },
                { progress: 1, x: 53, y: 48, visible: true },
            ],
        },
        2: {
            keyframes: [
                { progress: 0, x: 56, y: 78, visible: true },
                { progress: 0.25, x: 55, y: 78, visible: true },
                { progress: 0.5, x: 52, y: 78, visible: true },
                { progress: 0.75, x: 45, y: 76, visible: true },
                { progress: 1, x: 37, y: 73, visible: true },
            ],
        },
        3: {
            keyframes: [
                { progress: 0, x: 28, y: 62, visible: true },
                { progress: 0.25, x: 22, y: 63, visible: true },
                { progress: 0.5, x: 13, y: 66, visible: true },
                { progress: 0.75, x: 6, y: 69, visible: true },
                { progress: 1, x: 4, y: 70, visible: false },
            ],
        },
        4: {
            keyframes: [
                { progress: 0, x: 31, y: 42, visible: true },
                { progress: 0.25, x: 29, y: 42, visible: true },
                { progress: 0.5, x: 22, y: 43, visible: true },
                { progress: 0.75, x: 13, y: 45, visible: true },
                { progress: 1, x: 6, y: 46, visible: true },
            ],
        },
        5: {
            keyframes: [
                { progress: 0, x: 11, y: 70, visible: true },
                { progress: 0.25, x: 4, y: 71, visible: true },
                { progress: 0.5, x: 2, y: 73, visible: false },
                { progress: 0.75, x: 2, y: 73, visible: false },
                { progress: 1, x: 2, y: 73, visible: false },
            ],
        },
        6: {
            keyframes: [
                { progress: 0, x: 73, y: 18, visible: true },
                { progress: 0.25, x: 57, y: 19, visible: true },
                { progress: 0.5, x: 43, y: 18, visible: true },
                { progress: 0.75, x: 33, y: 18, visible: true },
                { progress: 1, x: 26, y: 20, visible: true },
            ],
        },
    };

    document.querySelectorAll('[data-viewer-360]').forEach((viewer) => {
        initViewer(viewer);
    });

    function initViewer(viewer) {
        const image = viewer.querySelector('.view-360__content-image');
        const stage = viewer.querySelector('.view-360__viewer-stage');
        const progress = viewer.querySelector('.view-360__viewer-progress');
        const arrowButtons = Array.from(viewer.querySelectorAll('[data-viewer-arrow]'));
        const hotspotButtons = Array.from(viewer.querySelectorAll('.view-360-list__item'));
        const hotspotCards = Array.from(viewer.querySelectorAll('.view-360__item-inner[data-hotspot]'));

        if (!image || !stage || !hotspotButtons.length || !hotspotCards.length) return;

        const frameCount = Math.max(parseInt(viewer.dataset.frameCount || '', 10) || 1, 1);
        const dragStep = Math.max(parseFloat(viewer.dataset.dragStep || '') || 8, 1);
        const frameTemplate = viewer.dataset.framePath || '';
        const preloadedFrames = new Set();
        const mediaQuery = window.matchMedia('(max-width: 1024px)');

        const state = {
            activeByGroup: getInitialActiveByGroup(),
            mobileActive: hotspotButtons.find((button) => button.classList.contains('active'))?.dataset.hotspot || '1',
            currentFrame: 0,
            isDragging: false,
            pointerId: null,
            startX: 0,
            startFrame: 0,
            holdTimeoutId: null,
            holdIntervalId: null,
            holdTriggered: false,
        };

        hotspotButtons.forEach((button) => {
            button.addEventListener('pointerdown', (event) => {
                event.stopPropagation();
            });

            button.addEventListener('click', () => {
                selectHotspot(button.dataset.hotspot || '');
            });
        });

        arrowButtons.forEach((button) => {
            const direction = parseInt(button.dataset.viewerArrow || '', 10);
            if (!Number.isFinite(direction) || direction === 0) return;

            button.addEventListener('pointerdown', (event) => {
                if (event.pointerType === 'mouse' && event.button !== 0) return;

                event.preventDefault();
                startArrowScroll(button, direction, event.pointerId);
            });

            button.addEventListener('pointerup', stopArrowScroll);
            button.addEventListener('pointercancel', stopArrowScroll);
            button.addEventListener('pointerleave', stopArrowScroll);

            button.addEventListener('click', (event) => {
                event.preventDefault();

                if (state.holdTriggered) {
                    state.holdTriggered = false;
                    return;
                }

                stepFrame(direction);
            });
        });

        window.addEventListener('pointerup', stopArrowScroll);
        window.addEventListener('blur', stopArrowScroll);

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleBreakpointChange);
        } else if (typeof mediaQuery.addListener === 'function') {
            mediaQuery.addListener(handleBreakpointChange);
        }

        stage.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return;

            state.isDragging = true;
            state.pointerId = event.pointerId;
            state.startX = event.clientX;
            state.startFrame = state.currentFrame;

            stage.classList.add('is-dragging');

            if (typeof stage.setPointerCapture === 'function') {
                stage.setPointerCapture(event.pointerId);
            }
        });

        stage.addEventListener('pointermove', (event) => {
            if (!state.isDragging || event.pointerId !== state.pointerId) return;

            const deltaX = event.clientX - state.startX;
            const frameOffset = Math.round(deltaX / dragStep);
            const nextFrame = clamp(state.startFrame - frameOffset, 0, frameCount - 1);

            if (nextFrame !== state.currentFrame) {
                renderFrame(nextFrame);
            }
        });

        ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
            stage.addEventListener(eventName, (event) => {
                if (event.pointerId !== state.pointerId && state.pointerId !== null) return;

                state.isDragging = false;
                state.pointerId = null;
                stage.classList.remove('is-dragging');
            });
        });

        stage.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

            event.preventDefault();

            const direction = event.key === 'ArrowLeft' ? -1 : 1;
            renderFrame(clamp(state.currentFrame + direction, 0, frameCount - 1));
        });

        image.addEventListener('dragstart', (event) => {
            event.preventDefault();
        });

        renderFrame(0);
        requestPreload();

        function renderFrame(frameIndex) {
            state.currentFrame = frameIndex;
            image.src = getFrameSrc(frameIndex);

            if (progress) {
                progress.textContent = `${frameIndex + 1} / ${frameCount}`;
            }

            updateHotspots();
            preloadNearbyFrames(frameIndex);
        }

        function stepFrame(direction) {
            renderFrame(clamp(state.currentFrame + direction, 0, frameCount - 1));
        }

        function startArrowScroll(button, direction, pointerId) {
            stopArrowScroll();

            state.holdTriggered = false;

            if (typeof button.setPointerCapture === 'function') {
                button.setPointerCapture(pointerId);
            }

            state.holdTimeoutId = window.setTimeout(() => {
                state.holdTriggered = true;
                stepFrame(direction);

                state.holdIntervalId = window.setInterval(() => {
                    stepFrame(direction);
                }, 70);
            }, 180);
        }

        function stopArrowScroll() {
            if (state.holdTimeoutId !== null) {
                window.clearTimeout(state.holdTimeoutId);
                state.holdTimeoutId = null;
            }

            if (state.holdIntervalId !== null) {
                window.clearInterval(state.holdIntervalId);
                state.holdIntervalId = null;
            }
        }

        function getInitialActiveByGroup() {
            const activeByGroup = {};

            HOTSPOT_GROUPS.forEach((group, groupIndex) => {
                const activeButton = group
                    .map((hotspotId) => hotspotButtons.find((button) => button.dataset.hotspot === hotspotId))
                    .find((button) => button?.classList.contains('active'));

                activeByGroup[groupIndex] = activeButton?.dataset.hotspot || group[0];
            });

            return activeByGroup;
        }

        function selectHotspot(hotspotId) {
            if (!hotspotId) return;

            const groupIndex = getGroupIndex(hotspotId);
            if (groupIndex === -1) return;

            state.activeByGroup[groupIndex] = hotspotId;
            state.mobileActive = hotspotId;
            renderSelection();
        }

        function renderSelection() {
            const activeHotspots = mediaQuery.matches
                ? new Set([state.mobileActive])
                : new Set(Object.values(state.activeByGroup));

            hotspotButtons.forEach((button) => {
                const hotspotId = button.dataset.hotspot || '';
                button.classList.toggle('active', activeHotspots.has(hotspotId));
            });

            hotspotCards.forEach((card) => {
                const hotspotId = card.dataset.hotspot || '';
                const isActive = activeHotspots.has(hotspotId);

                card.hidden = !isActive;
                card.classList.toggle('is-active', isActive);
            });
        }

        function handleBreakpointChange() {
            if (!mediaQuery.matches) {
                const groupIndex = getGroupIndex(state.mobileActive);
                if (groupIndex !== -1) {
                    state.activeByGroup[groupIndex] = state.mobileActive;
                }
            }

            renderSelection();
        }

        function updateHotspots() {
            const frameProgress = frameCount === 1 ? 0 : state.currentFrame / (frameCount - 1);

            hotspotButtons.forEach((button) => {
                const hotspotId = button.dataset.hotspot || '';
                const hotspot = HOTSPOT_CONFIGS[hotspotId];
                if (!hotspot) return;

                const point = interpolateHotspot(hotspot.keyframes, frameProgress);
                button.classList.toggle('is-hidden', !point.visible);

                if (point.visible) {
                    button.style.left = `${point.x}%`;
                    button.style.top = `${point.y}%`;
                }
            });

            renderSelection();
        }

        function requestPreload() {
            const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 150));

            schedule(() => {
                for (let index = 0; index < frameCount; index += 1) {
                    preloadFrame(index);
                }
            });
        }

        function preloadNearbyFrames(frameIndex) {
            for (let offset = -8; offset <= 8; offset += 1) {
                preloadFrame(frameIndex + offset);
            }
        }

        function preloadFrame(frameIndex) {
            if (frameIndex < 0 || frameIndex >= frameCount || preloadedFrames.has(frameIndex)) return;

            const preloadImage = new Image();
            preloadImage.src = getFrameSrc(frameIndex);
            preloadedFrames.add(frameIndex);
        }

        function getFrameSrc(frameIndex) {
            const number = String(frameIndex + 1).padStart(3, '0');
            return frameTemplate.replace('{frame}', number);
        }
    }

    function interpolateHotspot(keyframes, progress) {
        if (!Array.isArray(keyframes) || !keyframes.length) {
            return { x: 0, y: 0, visible: false };
        }

        if (progress <= keyframes[0].progress) {
            return normalizeKeyframe(keyframes[0]);
        }

        if (progress >= keyframes[keyframes.length - 1].progress) {
            return normalizeKeyframe(keyframes[keyframes.length - 1]);
        }

        for (let index = 0; index < keyframes.length - 1; index += 1) {
            const current = keyframes[index];
            const next = keyframes[index + 1];

            if (progress < current.progress || progress > next.progress) continue;

            if (!current.visible || !next.visible) {
                return { x: current.x, y: current.y, visible: false };
            }

            const range = next.progress - current.progress || 1;
            const ratio = (progress - current.progress) / range;

            return {
                x: roundToTwo(current.x + (next.x - current.x) * ratio),
                y: roundToTwo(current.y + (next.y - current.y) * ratio),
                visible: true,
            };
        }

        return normalizeKeyframe(keyframes[keyframes.length - 1]);
    }

    function normalizeKeyframe(keyframe) {
        return {
            x: keyframe.x,
            y: keyframe.y,
            visible: Boolean(keyframe.visible),
        };
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function getGroupIndex(hotspotId) {
        return HOTSPOT_GROUPS.findIndex((group) => group.includes(hotspotId));
    }

    function roundToTwo(value) {
        return Math.round(value * 100) / 100;
    }
});