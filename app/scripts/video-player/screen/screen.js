(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.Screen = function(element) {
        //public
        this.destroy = destroy;
        this.setVideo = setVideo;
        this.startVideo = startVideo;
        this.pauseVideo = pauseVideo;
        this.element = element;

        //private
        var that = this;
        var videoElement = null;
        var videoControls = null; //it could be another object

        constructor();

        ///implementation
        function constructor() {
            //test if player is not already initialized on this node
            if (that.element.className.indexOf('vplayer-screen') !== -1) {
                that.element = null;
                return;
            } else {
                that.element.className = that.element.className + ' vplayer-screen'
            }

            draw();
            bind();
        }

        function draw() {
            if (!videoElement) { //TODO test not draw if exists
                videoElement = document.createElement('video');
                that.element.appendChild(videoElement);

                var videoControlsElement = document.createElement('div');
                that.element.appendChild(videoControlsElement);
                that.videoControls = new VideoPlayerController.VideoControls(videoControlsElement);
            }
        }

        function bind() {
            that.videoControls.onPress('[data-action=play]', startVideo.bind(that));
            that.videoControls.onPress('[data-action=pause]', pauseVideo.bind(that));
            that.videoControls.onPress('[data-action=stop]', pauseVideo.bind(that));
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
            if (that.videoControls) {
                that.videoControls.destroy();
            }
            if (that.element) {
                that.element.innerHTML = '';
                that.element = null;
            }
        };
    }
})();
