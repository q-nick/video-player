(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.Screen = function(element) {
        //public
        this.destroy = destroy;
        this.setVideo = setVideo;
        this.startVideo = startVideo;
        this.element = element;

        //private
        var that = this;
        var videoElement = null;

        constructor();

        ///implementation
        function constructor() {
            //test if player is not already initialized on this node
            if (that.element.className.indexOf('video-player-screen') !== -1) {
                that.element = null;
                return;
            } else {
                that.element.className = that.element.className + ' video-player-screen'
            }

            draw();
        }

        function draw() {
            if (!videoElement) { //TODO test not draw if exists
                videoElement = document.createElement('video');
                that.element.appendChild(videoElement);
            }
        }

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

        function startVideo(){
            videoElement.play();
        }

        function destroy() {
            if (that.element) {
                that.element.innerHTML = '';
                that.element = null;
            }
        };
    }
})();
