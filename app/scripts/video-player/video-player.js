(function() {
    'use strict';

    window.VideoPlayer = function(selector) {
        //public
        this.destroy = destroy;
        this.play = play;
        this.pause = pause;
        this.stop = stop;
        this.onStateChanged = onStateChanged;

        //private
        var that = this;
        var screen = null;
        var playlist = null;
        var element = null;

        constructor();

        ///implementation
        function constructor() {
            element = document.querySelector(selector);

            //test if player is not already initialized on this node
            if (element.className.indexOf('vplayer') !== -1) {
                element = null;
                return;
            } else {
                element.className = element.className + ' vplayer'
            }

            draw();
            var divs = element.querySelectorAll('div');
            screen = new VideoPlayerController.Screen(divs[0]);
            playlist = new VideoPlayerController.Playlist(divs[1]);

            bind();
        }

        function draw() {
            element.innerHTML = '<div></div><div></div>';
        }

        function onPlaylistMovieSelected(movieSelected) {
            screen.setVideo(movieSelected);
        }

        function onScreenStateChanged(state) {
            if (state === 'ENDED') {
                playlist.selectNext();
            } else if (state === 'STOPPED') {
                playlist.select(0);
            }
        }

        function onScreenNoMovie() {
            playlist.select(0);
        }

        function bind() {
            playlist.on('movie-selected', onPlaylistMovieSelected);
            screen.on('state-changed', onScreenStateChanged);
            screen.on('no-movie', onScreenNoMovie);
        }

        function destroy() {
            if (screen) {
                screen.destroy();
                screen = null;
            }
            if (playlist) {
                playlist.destroy();
                playlist = null;
            }
            if (element) {
                element.innerHTML = '';
                element.className = '';
            }
        }

        function play() {
            if (screen) {
                screen.startPlay();
            }
        }

        function pause() {
            if (screen) {
                screen.pauseVideo();
            }
        }

        function stop() {
            if (screen) {
                screen.pauseVideo();
            }
        }

        function onStateChanged(cb) {
            if (screen) {
                screen.on('state-changed', cb);
            }
        }
    }
})();
