(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.VideoControls = function(element) {
        //public
        this.onPress = onPress;
        this.offPress = offPress;
        this.setCurentState = setCurrentState;
        this.destroy = destroy;

        //private
        var that = this;
        var currentState = 'STOPPED';
        var hideTimeoutId = null;
        var barElement = null;

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
                '<div class="vplayer-controls__bar vplayer-controls__bar--' + currentState + '">' +
                '<button data-action="play" class="vplayer-controls__button">&#10148;</button>' +
                '<button data-action="pause" class="vplayer-controls__button">ll</button>' +
                '<button data-action="stop" class="vplayer-controls__button">&#9632;</button>' +
                '<div data-action="volume" class="vplayer-controls__volume">&#9632;</div>' +
                '</div>';

            barElement = element.querySelector('.vplayer-controls__bar');
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
