(function() {
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
            var divs = that.element.querySelectorAll('div');
            that.screen = new VideoPlayerController.Screen(divs[0]);
            that.playlist = new VideoPlayerController.Playlist(divs[1]);

            bind();
        }

        function draw() {
            that.element.innerHTML = '<div></div><div></div>';
        }

        function onPlaylistMovieSelected(movieSelected) {
            that.screen.setVideo(movieSelected);
        }

        function onScreenStateChanged(state) {
            if (state === 'ENDED') {
                that.playlist.selectNext();
            } else if (state === 'STOPPED') {
                that.playlist.select(0);
            }
        }

        function bind() {
            that.playlist.on('movie-selected', onPlaylistMovieSelected);
            that.screen.on('state-changed', onScreenStateChanged);
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
})();
