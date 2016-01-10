(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.Screen = function() {
        this.destroy = destroy;

        function destroy() {};
    }
})();
