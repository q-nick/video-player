(function() {
    describe('Video Player Screen Controller', function() {
        var screen = null;
        var screenElement = null;
        var videoTag = null;

        beforeEach(function() {
            spyOn(VideoPlayerController, 'VideoControls').and.returnValue({
                destroy: function() {},
                onPress: function() {}
            });

            screenElement = document.createElement('div');
            document.body.appendChild(screenElement);
            screen = new VideoPlayerController.Screen(screenElement);
            videoTag = screenElement.querySelector('video');

            //mock Video API
            videoTag.load = function() {};
            spyOn(videoTag, 'load');
            videoTag.play = function() {};
            spyOn(videoTag, 'play');
            videoTag.pause = function() {};
            spyOn(videoTag, 'pause');
        });

        afterEach(function() {
            screen.destroy();
            document.body.innerHTML = '';
        });

        describe('constructor/destructor', function() {
            it('should create new instance of screen', function() {
                expect(screen).toBeDefined();
            });

            it('should not create new instance of screen if it exists on given node', function() {
                var secondScreen = new VideoPlayerController.Screen(document.querySelector('div'));
                expect(screenElement.innerHTML).not.toEqual('');
                secondScreen.destroy(); //we are testing that secondscreen wont destroy screenElement
                expect(screenElement.innerHTML).not.toEqual('');
            });

            it('should add video tag', function() {
                expect(screenElement.querySelectorAll('video').length).toEqual(1);
            });

            it('should destroy everything', function() {
                screen.destroy();
                expect(screenElement.innerHTML).toEqual('');
                expect(screenElement.className).toEqual('');
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
                screen.pauseVideo();
                expect(videoTag.pause).toHaveBeenCalled();
            });
        });
    });
})();
