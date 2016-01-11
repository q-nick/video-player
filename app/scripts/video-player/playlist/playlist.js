(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.Playlist = function(element) {
        //public
        this.destroy = destroy;
        this.onVideoSelected = function() {};
        this.selectNext = function() {};
        this.selectPrev = function() {};

        //private
        var that = this;
        var playlistControls = null; //it could be another object
        var name = 'My playlist';
        var list = [{
            "url": "video01.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video02.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video03.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video04.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video04.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video04.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video04.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video04.mp4",
            "name": "movie one",
            "duration": "2:34"
        }, {
            "url": "video04.mp4",
            "name": "movie one",
            "duration": "2:34"
        }];

        constructor();

        ///implementation
        function constructor() {
            //test if player is not already initialized on this node
            if (element.className.indexOf('vplayer-playlist') !== -1) {
                element = null;
                return;
            } else {
                element.className = element.className + ' vplayer-playlist'
            }

            draw();
            bind();
        }

        function draw() {
            var html = '<ol class="vplayer-playlist-list">';
            for (var i = 0; i < list.length; i++) {
                var video = list[i];
                html = html + '<li class="vplayer-playlist-list__item">' + video.name + ' ' + video.duration + '</li>';
            }
            html = html + '</ol>';
            element.innerHTML = html;
        }

        function bind() {
            element.addEventListener('click', onPress.bind(that));
        }

        function onPress(e) {
            console.log(e);
        }

        function destroy() {
            if (playlistControls) {
                playlistControls.destroy();
            }
            if (element) {
                element.removeEventListener('click', onPress.bind(that));
                element.innerHTML = '';
                element.className = '';
            }
        };
    }
})();
