(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.Screen = function(element) {
        //public
        this.destroy = destroy;
        this.setVideo = setVideo;
        this.startVideo = startVideo;
        this.pauseVideo = pauseVideo;
        this.getState = getState;
        //and Observable methods

        //private
        var that = this;
        var state = 'STOPPED';
        var videoElement = null;
        var videoControls = null; //it could be another object
        var forceToPlay = false;

        constructor();

        ///implementation
        function constructor() {
            //test if player is not already initialized on this node
            if (element.className.indexOf('vplayer-screen') !== -1) {
                element = null;
                return;
            } else {
                element.className = element.className + ' vplayer-screen'
            }

            draw();
            videoElement = element.querySelector('video');
            videoControls = new VideoPlayerController.VideoControls(element.querySelector('div'));

            bind();
        }

        function draw() {
            element.innerHTML = '<video></video><div></div>';
        }

        function bind() {
            videoControls.onPress('[data-action=play]', startVideo.bind(that));
            videoControls.onPress('[data-action=pause]', pauseVideo.bind(that));
            videoControls.onPress('[data-action=stop]', onStop.bind(that));

            videoElement.addEventListener('playing', onVideoStateChanged.bind(that));
            videoElement.addEventListener('pause', onVideoStateChanged.bind(that));
            videoElement.addEventListener('ended', onVideoStateChanged.bind(that));
        };

        function onVideoStateChanged(e) {
            if (e.type === 'playing') {
                state = 'PLAYING';
            } else if (e.type === 'pause') {
                state = 'PAUSED';
            } else if (e.type === 'ended') {
                state = 'ENDED';
            }
            this.notify('state-changed', state);
        }

        function onStop() {
            pauseVideo();
            state = 'STOPPED';
            this.notify('state-changed', state);
        }

        function getState() {
            return state;
        }

        function setVideo(movie) {
            if (!movie) return;

            if (Array.isArray(movie.urls)) {
                videoElement.innerHTML = '';
                for (var i in movie.urls) {
                    var newVideo = document.createElement('source');
                    newVideo.src = movie.urls[i];
                    newVideo.type = 'video/' + movie.urls[i].split('.').reverse()[0];
                    videoElement.appendChild(newVideo);
                }
            }

            videoElement.load();

            if (forceToPlay) {
                startVideo();
            }
        }

        function startVideo() {
            forceToPlay = true;
            videoElement.play();
        }

        function pauseVideo() {
            forceToPlay = false;
            videoElement.pause();
        }

        function destroy() {
            if (videoControls) {
                videoControls.destroy();
            }
            if (element) {
                element.innerHTML = '';
                element.className = '';
            }
        }
    }

    window.VideoPlayerController.Screen.prototype = new VideoPlayerUtils.Observable();

})();
