(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.PlaylistControls = function(element) {
        //public
        this.onPress = onPress;
        this.offPress = offPress;
        this.destroy = destroy;

        //private
        var that = this;
        var barElement = null;

        constructor();

        ///implementation
        function constructor() {
            //test if player is not already initialized on this node
            if (element.className.indexOf('vplayer-controls-playlist') !== -1) {
                element = null;
                return;
            } else {
                element.className = element.className + ' vplayer-controls-playlist'
            }

            draw();
            bind();
        }

        function draw() {
            element.innerHTML =
                '<div class="vplayer-controls-playlist__bar">' +
                '<button data-action="prev" class="vplayer-controls-playlist__button">&laquo;</button>' +
                '<button data-action="shuffle" class="vplayer-controls-playlist__button">&#8605;</button>' +
                '<button data-action="repeat" class="vplayer-controls-playlist__button">&#8634;</button>' +
                '<button data-action="xhr" class="vplayer-controls-playlist__button">+</button>' +
                '<button data-action="next" class="vplayer-controls-playlist__button">&raquo;</button>' +
                '</div>';

            barElement = element.querySelector('.vplayer-controls-playlist__bar');
        }

        function bind() {}

        function onPress(selector, callback) {
            var el = element.querySelector(selector);
            el.addEventListener('click', callback, false);
        }

        function offPress(selector, callback) {
            var el = element.querySelector(selector);
            el.removeEventListener('click', callback, false);
        }

        function destroy() {
            if (element) {
                element.innerHTML = '';
                element.className = '';
            }
        }
    }
})();
