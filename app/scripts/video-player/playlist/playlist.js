(function() {
    'use strict';

    if (!window.VideoPlayerController) window.VideoPlayerController = {};

    window.VideoPlayerController.Playlist = function(element) {
        //public
        this.destroy = destroy;
        this.selectNext = selectNext;
        this.selectPrev = selectPrev;
        this.select = select;
        this.setRepeat = setRepeat;
        //and Observable methods

        //private
        var that = this;
        var playlistControls = null; //it could be another object
        var name = 'My playlist';
        var repeat = false;

        var list = [{
            "urls": ["video/clouds.mp4"],
            "name": "Clouds",
            "duration": "2:34"
        }, {
            "urls": ["video/mov_bbb.mp4", "video/mov_bbb.ogg"],
            "name": "Big Buck Bunny",
            "duration": "2:34"
        }, {
            "urls": ["video/rain.mp4"],
            "name": "Rain",
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
            playlistControls = new VideoPlayerController.PlaylistControls(element.querySelector('div'));

            bind();
        }

        function draw() {
            element.innerHTML = '<div></div><ol class="vplayer-playlist-list"></ol>';
            reDrawListElements();
        }

        function reDrawListElements() {
            var html = '';
            for (var i = 0; i < list.length; i++) {
                var video = list[i];
                html = html + '<li class="vplayer-playlist-list__item">' + video.name + ' ' + video.duration + '</li>';
            }
            element.querySelector('ol').innerHTML = html;
        }

        function bind() {
            element.addEventListener('click', onPress.bind(that));

            playlistControls.onPress('[data-action=prev]', selectPrev.bind(that));
            playlistControls.onPress('[data-action=next]', selectNext.bind(that));
            playlistControls.onPress('[data-action=repeat]', onRepeat.bind(that));
            playlistControls.onPress('[data-action=shuffle]', onShuffle.bind(that));
        }

        function onPress(e) {
            if (e.target.tagName.toUpperCase() !== 'LI') return;

            var selectedIndex = Array.prototype.indexOf.call(e.target.parentNode.childNodes, e.target);

            var movieSelected = null;
            for (var i = 0; i < list.length; i++) {
                if (i === selectedIndex) {
                    list[i].selected = true;
                    movieSelected = list[i];
                } else {
                    list[i].selected = false;
                }
            }
            this.notify('movie-selected', movieSelected);
        }

        function onRepeat() {
            repeat = !repeat;
        }

        function setRepeat(flag) {
            repeat = flag;
        }

        function shuffle(array) {
            var counter = array.length,
                temp, index;

            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }

        function onShuffle() {
            list = shuffle(list);
            reDrawListElements();
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
        }

        function select(index) {
            for (var i = 0; i < list.length; i++) {
                if (i === index) {
                    list[i].selected = true;
                } else {
                    list[i].selected = false;
                }
            }

            this.notify('movie-selected', list[index]);
        }

        function selectNext() {
            var movieSelected = null;
            var currentSelectedIndex = null;

            for (var i = 0; i < list.length; i++) {
                if (list[i].selected) {
                    currentSelectedIndex = i;
                    list[i].selected = false;
                }
            }

            if (currentSelectedIndex !== null) {
                if (currentSelectedIndex + 1 < list.length) {
                    list[currentSelectedIndex + 1].selected = true;
                    movieSelected = list[currentSelectedIndex + 1];
                } else if (repeat) {
                    list[0].selected = true;
                    movieSelected = list[0];
                }
            }

            this.notify('movie-selected', movieSelected);
        }

        function selectPrev() {
            var movieSelected = null;
            var currentSelectedIndex = null;

            for (var i = 0; i < list.length; i++) {
                if (list[i].selected) {
                    currentSelectedIndex = i;
                    list[i].selected = false;
                }
            }

            if (currentSelectedIndex !== null) {
                if (currentSelectedIndex - 1 >= 0) {
                    list[currentSelectedIndex - 1].selected = true;
                    movieSelected = list[currentSelectedIndex - 1];
                }
            }

            this.notify('movie-selected', movieSelected);
        }
    }

    window.VideoPlayerController.Playlist.prototype = new VideoPlayerUtils.Observable();

})();
