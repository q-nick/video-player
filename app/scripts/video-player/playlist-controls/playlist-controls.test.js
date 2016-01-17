(function() {
    describe('Video Player Playlist Controls Controller', function() {
        var playlistControls = null;
        var playlistControlsElement = null;

        beforeEach(function() {
            playlistControlsElement = document.createElement('div');
            document.body.appendChild(playlistControlsElement);
            playlistControls = new VideoPlayerController.PlaylistControls(playlistControlsElement);
        });

        afterEach(function() {
            playlistControls.destroy();
            document.body.innerHTML = '';
        });

        describe('constructor/destructor', function() {
            it('should create new instance of screen', function() {
                expect(playlistControls).toBeDefined();
            });

            it('should not create new instance of playlistControls if it exists on given node', function() {
                var secondplaylistControls = new VideoPlayerController.PlaylistControls(playlistControlsElement);
                expect(playlistControlsElement.innerHTML).not.toEqual('');
                secondplaylistControls.destroy(); //we are testing that secondplaylistControls wont destroy playlistControlsElement
                expect(playlistControlsElement.innerHTML).not.toEqual('');
            });

            it('should add buttons for action: play, pause, stop', function() {
                expect(playlistControlsElement.querySelectorAll('[data-action=prev]').length).toEqual(1);
                expect(playlistControlsElement.querySelectorAll('[data-action=next]').length).toEqual(1);
                expect(playlistControlsElement.querySelectorAll('[data-action=shuffle]').length).toEqual(1);
                expect(playlistControlsElement.querySelectorAll('[data-action=repeat]').length).toEqual(1);
            });

            it('should destroy everything', function() {
                playlistControls.destroy();
                expect(playlistControlsElement.innerHTML).toEqual('');
                expect(playlistControlsElement.className).toEqual('');
            });
        });

        describe('onPress / offPress', function() {
            it('should add and remove listeners from button', function() {
                var called = false;
                var testCallback = function() {
                    called = true;
                };

                playlistControls.onPress('[data-action=next]', testCallback);
                playlistControlsElement.querySelector('[data-action=next]').click();

                expect(called).toBeTruthy();
                called = false;

                playlistControls.offPress('[data-action=next]', testCallback);
                playlistControlsElement.querySelector('[data-action=next]').click();

                expect(called).not.toBeTruthy();
            });
        });
    });
})();
