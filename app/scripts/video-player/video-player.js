(function(VideoPlayerController) {
    'use strict';

    window.VideoPlayer = function(selector) {
        //public
        this.screen = null;
        this.playlist = null;
        this.destroy = destroy;
        this.element = null;

        //private
        var that = this;

        constructor();

        ///implementation
        function constructor() {
            that.element = document.querySelector(selector);

            //test if player is not already initialized on this node
            if (that.element.className.indexOf('vplayer') !== -1) {
                that.element = null;
                return;
            } else {
                that.element.className = that.element.className + ' vplayer'
            }

            draw();

            that.screen = new VideoPlayerController.Screen(that.element.querySelectorAll('div')[0]);
            that.playlist = new VideoPlayerController.Playlist(that.element.querySelector('div')[1]);
        }

        function draw() {
             //TODO test not draw if exists
            that.element.innerHTML = '<div></div><div></div>';
        }

        function destroy() {
            if (that.screen) {
                that.screen.destroy();
                that.screen = null;
            }
            if (that.playlist) {
                that.playlist.destroy();
                that.playlist = null;
            }
            if (that.element) {
                that.element.innerHTML = '';
                that.element = null;
            }
        }
    }
})(VideoPlayerController);
