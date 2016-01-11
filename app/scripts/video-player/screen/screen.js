(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.Screen = function(element) {
        //public
        this.destroy = destroy;
        this.setVideo = setVideo;
        this.startVideo = startVideo;
        this.pauseVideo = pauseVideo;

        //private
        var that = this;
        var videoElement = null;
        var videoControls = null; //it could be another object

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
            videoControls.onPress('[data-action=stop]', pauseVideo.bind(that));
        };

        function setVideo(videoFormats) {
            if (Array.isArray(videoFormats)) {
                for (var i in videoFormats) {
                    var newVideo = document.createElement('source');
                    newVideo.src = videoFormats[i].src;
                    newVideo.type = videoFormats[i].type;

                    videoElement.appendChild(newVideo);
                }
            }
            videoElement.load();
        }

        function startVideo() {
            videoElement.play();
        }

        function pauseVideo() {
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
        };
    }
})();
