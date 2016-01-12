(function() {
    describe('Video Player Screen Controller', function() {
        var playlist = null;
        var playlistElement = null;
        var listTag = null;
        var lastSelectedMovie = null;

        beforeEach(function() {
            playlistElement = document.createElement('div');
            document.body.appendChild(playlistElement);
            playlist = new VideoPlayerController.Playlist(playlistElement);
            listTag = playlistElement.querySelector('ol');

            playlist.on('movie-selected', function(movie) {
                lastSelectedMovie = movie;
            });
        });

        afterEach(function() {
            playlist.destroy();
            document.body.innerHTML = '';
        });

        describe('constructor/destructor', function() {
            it('should create new instance of playlist', function() {
                expect(playlist).toBeDefined();
            });

            it('should not create new instance of playlist if it exists on given node', function() {
                var secondPlaylist = new VideoPlayerController.Playlist(playlistElement);
                expect(playlistElement.innerHTML).not.toEqual('');
                secondPlaylist.destroy(); //we are testing that secondplaylist wont destroy playlistElement
                expect(playlistElement.innerHTML).not.toEqual('');
            });

            it('should add list tag', function() {
                expect(playlistElement.querySelectorAll('.vplayer-playlist-list').length).toEqual(1);
            });

            it('should destroy everything', function() {
                playlist.destroy();
                expect(playlistElement.innerHTML).toEqual('');
                expect(playlistElement.className).toEqual('');
            });
        });

        describe('UI events', function() {
            it('should select second movie when clicked second list element', function() {
                var ev = document.createEvent('MouseEvent');
                ev.initMouseEvent(
                    'click',
                    true, true,
                    window, null,
                    0, 0, 0, 0,
                    false, false, false, false,
                    0, null
                );

                expect(lastSelectedMovie).toBeFalsy();
                listTag.childNodes[1].dispatchEvent(ev);
                expect(lastSelectedMovie.name).toBe('Big Buck Bunny');
            });
        });

        describe('methods', function() {

            it('should select movie', function() {
                playlist.select(0);
                expect(lastSelectedMovie.name).toBe('Clouds');
                playlist.select(1);
                expect(lastSelectedMovie.name).toBe('Big Buck Bunny');
                playlist.select(2);
                expect(lastSelectedMovie.name).toBe('Rain');
            });

            it('should select next movie', function() {
                playlist.select(0);
                expect(lastSelectedMovie.name).toBe('Clouds');
                playlist.selectNext();
                expect(lastSelectedMovie.name).toBe('Big Buck Bunny');
                playlist.selectNext();
                expect(lastSelectedMovie.name).toBe('Rain');
            });

        });

    });
})();
