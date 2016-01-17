(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.VideoControls = function(element, initVolume) {
        //public
        this.onPress = onPress;
        this.offPress = offPress;
        this.setCurentState = setCurrentState;
        this.destroy = destroy;
        this.onVolumeChange = onVolumeChange;
        this.updateVolume = updateVolume;

        //private
        var that = this;
        var currentState = 'STOPPED';
        var hideTimeoutId = null;
        var barElement = null;
        var volumeBar = null;

        constructor();

        ///implementation
        function constructor() {
            //test if player is not already initialized on this node
            if (element.className.indexOf('vplayer-controls') !== -1) {
                element = null;
                return;
            } else {
                element.className = element.className + ' vplayer-controls'
            }

            draw();
            hide();
            bind();
        }

        function draw() {
            element.innerHTML =
                '<div class="vplayer-controls__bar">' +
                '<button data-action="play" class="vplayer-controls__button">&#10148;</button>' +
                '<button data-action="pause" class="vplayer-controls__button">ll</button>' +
                '<button data-action="stop" class="vplayer-controls__button">&#9632;</button>' +
                '<button data-action="fullscreen" class="vplayer-controls__button">&#10138;</button>' +
                '<div data-action="volume" class="vplayer-controls__volume"></div>' +
                '</div>';

            barElement = element.querySelector('.vplayer-controls__bar');
            volumeBar = element.querySelector('[data-action="volume"]');
            if (window.noUiSlider) {
                window.noUiSlider.create(volumeBar, {
                    start: initVolume,
                    connect: 'upper',
                    orientation: 'vertical',
                    direction: 'rtl',
                    range: {
                        'min': 0,
                        'max': 1
                    }
                });
            }
        }

        function bind() {
            element.addEventListener('mousemove', show.bind(that));
        }

        function show() {
            barElement.style.opacity = 1;
            hideTimeout();
        }

        function hideTimeout() {
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId);
            }
            hideTimeoutId = setTimeout(hide.bind(that), 1000);
        }

        function hide() {
            barElement.style.opacity = 0;
        }

        function onPress(selector, callback) {
            var el = element.querySelector(selector);
            el.addEventListener('click', callback, false);
        }

        function offPress(selector, callback) {
            var el = element.querySelector(selector);
            el.removeEventListener('click', callback, false);
        }

        function onVolumeChange(cb) {
            volumeBar.noUiSlider.on('update', cb);
        }

        function updateVolume(volume) {
            console.log(volume);
        }

        function setCurrentState(state) {
            currentState = state;
            element.querySelector('.vplayer-controls__bar').className = 'vplayer-controls__bar vplayer-controls__bar--' + state;
        }

        function destroy() {
            if (element) {
                element.innerHTML = '';
                element.className = '';
            }
        }
    }
})();
