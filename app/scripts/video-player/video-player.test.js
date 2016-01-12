(function() {
    describe('Video Player Object', function() {
        var player = null;
        var playlistOnCallback = null;
        var screenOnCallback = null;

        var mockScreen = {
            destroy: function() {},
            setVideo: function() {},
            on: function(type, cb) {
                screenOnCallback = cb;
            }
        }

        var mockPlaylist = {
            destroy: function() {},
            on: function(type, cb) {
                playlistOnCallback = cb;
            },
            selectNext: function() {},
            select: function() {}
        }

        beforeEach(function() {
            spyOn(VideoPlayerController, 'Screen').and.returnValue(mockScreen);
            spyOn(VideoPlayerController, 'Playlist').and.returnValue(mockPlaylist);

            document.body.appendChild(document.createElement('div'));
            player = new VideoPlayer('div');
        });

        afterEach(function() {
            document.body.innerHTML = '';
            player.destroy();
            delete player;
        });

        describe('constructor/destructor', function() {
            it('should create new instance of player', function() {
                expect(player).toBeDefined();
            });

            it('should not create new instance of player if it exists on given node', function() {
                var secondPlayer = new VideoPlayer('div');
                expect(secondPlayer.element).toEqual(null);
            });

            it('should add dom nodes for playlist and screen', function() {
                expect(player.element.children.length).toBe(2);
            });

            it('should destroy everything', function() {
                player.destroy();
                expect(player.element).toEqual(null);
                expect(player.screen).toEqual(null);
                expect(player.playlist).toEqual(null);
            });
        });

        describe('controllers', function() {
            it('should contain Screen Instance', function() {
                expect(VideoPlayerController.Screen).toHaveBeenCalled();
                expect(player.screen).toBeDefined();
            });

            it('should contain PlayList Instance', function() {
                expect(VideoPlayerController.Playlist).toHaveBeenCalled();
                expect(player.playlist).toBeDefined();
            });
        });

        describe('playlist events', function() {
            it('should set new Video when movie-selected event is triggered', function() {
                spyOn(mockScreen, 'setVideo');
                expect(mockScreen.setVideo).not.toHaveBeenCalled();
                playlistOnCallback('anyparam');
                expect(mockScreen.setVideo).toHaveBeenCalledWith('anyparam');
            });
        });

        describe('screen events', function() {
            it('should ask playlist to select next movie when screen change state to ENDED', function() {
                spyOn(mockPlaylist, 'selectNext');
                expect(mockPlaylist.selectNext).not.toHaveBeenCalled();
                screenOnCallback('ENDED');
                expect(mockPlaylist.selectNext).toHaveBeenCalledWith();
            });
            it('should select first movie on playlist when screen change state to STOPPED', function() {
                spyOn(mockPlaylist, 'select');
                expect(mockPlaylist.select).not.toHaveBeenCalled();
                screenOnCallback('STOPPED');
                expect(mockPlaylist.select).toHaveBeenCalledWith(0);
            });
        });
    });
})();
