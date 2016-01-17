(function() {
    'use strict';

    window.VideoPlayerUtils = {
        any: function() {},
        ajax: function() {
            return window.$.ajax(arguments);
        },
        Observable: function() {
            //TODO tests
            var observers = {};

            this.on = function(type, observer) {
                if (!observers[type]) {
                    observers[type] = [];
                }
                observers[type].push(observer);
            }

            this.off = function(type, observer) {
                var index = observers[type].indexOf(observer);

                if (~index) {
                    observers[type].splice(index, 1);
                }
            }

            this.notify = function(type, message) {
                if (!observers[type]) return;
                for (var i = observers[type].length - 1; i >= 0; i--) {
                    observers[type][i](message);
                };
            }
        },
        FullScreen: function() {
            this.goFullScreen = function(element) {
                console.log(element);
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            this.isFullScreenAvailable = function() {
                return document.fullscreenEnabled ||
                    document.webkitFullscreenEnabled ||
                    document.mozFullScreenEnabled ||
                    document.msFullscreenEnabled;
            }

            this.isFullScreen = function() {
                return document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement;
            }

            this.exitFullScreen = function() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
    }
})();
