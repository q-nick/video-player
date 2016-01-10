(function() {
    describe('Video Player Screen Controller', function() {
        var screen = null;
        var videoTag = null;

        beforeEach(function() {
            document.body.appendChild(document.createElement('div'));
            screen = new VideoPlayerController.Screen(document.querySelector('div'));
            videoTag = screen.element.querySelector('video');

            //mock Video API
            videoTag.load = function() {};
            spyOn(videoTag, 'load');
            videoTag.play = function() {};
            spyOn(videoTag, 'play');
        });

        afterEach(function() {
            document.body.innerHTML = '';
            screen.destroy();
        });

        describe('constructor/destructor', function() {
            it('should create new instance of screen', function() {
                expect(screen).toBeDefined();
            });

            it('should not create new instance of screen if it exists on given node', function() {
                var secondScreen = new VideoPlayerController.Screen(document.querySelector('div'));
                expect(secondScreen.element).toEqual(null);
            });

            it('should add video tag', function() {
                expect(screen.element.querySelectorAll('video').length).toEqual(1);
            });

            it('should destroy everything', function() {
                screen.destroy();
                expect(screen.element).toEqual(null);
            });
        });

        describe('methods', function() {
            it('should set video to play and reload video', function() {
                expect(videoTag.querySelectorAll('source').length).toEqual(0);

                screen.setVideo([{
                    src: 'src.mp4',
                    type: 'video/mp4'
                }, {
                    src: 'src.ogg',
                    type: 'video/ogg'
                }]);

                expect(videoTag.querySelectorAll('source').length).toEqual(2);
                expect(videoTag.load).toHaveBeenCalled();
            });

            it('should Start video', function() {
                screen.startVideo();
                expect(videoTag.play).toHaveBeenCalled();
            });

            it('should Pause video', function() {
                //expect(VideoPlayerController.Playlist).toHaveBeenCalled();
                //expect(player.playlist).toBeDefined();
            });
        });
    });
})();
