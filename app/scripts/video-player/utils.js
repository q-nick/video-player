(function() {
    'use strict';

    window.VideoPlayerUtils = {
        any: function() {},
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
                for (var i = observers[type].length - 1; i >= 0; i--) {
                    observers[type][i](message);
                };
            }
        }
    }
})();
