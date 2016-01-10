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
            if (that.element.className.indexOf('video-player-initialized') !== -1) {
                that.element = null;
                return;
            } else {
                that.element.className = that.element.className + ' video-player-initialized'
            }

            draw();

            that.screen = new VideoPlayerController.Screen(that.element.querySelector('.video-player-screen'));
            that.playlist = new VideoPlayerController.Playlist(that.element.querySelector('.video-player-playlist'));
        }

        function draw() {
            that.element.innerHTML = '<div class="video-player-screen"></div><div class="video-player-playlist"></div>';
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
