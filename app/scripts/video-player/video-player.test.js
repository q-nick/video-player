(function() {
    describe('Video Player Object', function() {
        var player = null;

        beforeEach(function() {
            spyOn(VideoPlayerController, 'Screen').and.returnValue({
                destroy: function() {}
            });
            spyOn(VideoPlayerController, 'Playlist').and.returnValue({
                destroy: function() {}
            });

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
    });
})();
