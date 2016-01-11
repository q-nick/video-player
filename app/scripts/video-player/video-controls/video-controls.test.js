(function() {
    describe('Video Player Controls Controller', function() {
        var controls = null;
        var controlsElement = null;

        beforeEach(function() {
            controlsElement = document.createElement('div');
            document.body.appendChild(controlsElement);
            controls = new VideoPlayerController.VideoControls(controlsElement);
        });

        afterEach(function() {
            controls.destroy();
            document.body.innerHTML = '';
        });

        describe('constructor/destructor', function() {
            it('should create new instance of screen', function() {
                expect(controls).toBeDefined();
            });

            it('should not create new instance of controls if it exists on given node', function() {
                var secondControls = new VideoPlayerController.VideoControls(controlsElement);
                expect(controlsElement.innerHTML).not.toEqual('');
                secondControls.destroy(); //we are testing that secondControls wont destroy controlsElement
                expect(controlsElement.innerHTML).not.toEqual('');
            });

            it('should add buttons for action: play, pause, stop', function() {
                expect(controlsElement.querySelectorAll('[data-action=play]').length).toEqual(1);
                expect(controlsElement.querySelectorAll('[data-action=pause]').length).toEqual(1);
                expect(controlsElement.querySelectorAll('[data-action=stop]').length).toEqual(1);
            });

            it('should destroy everything', function() {
                controls.destroy();
                expect(controlsElement.innerHTML).toEqual('');
                expect(controlsElement.className).toEqual('');
            });
        });

        describe('onPress / offPress', function() {
            it('should add and remove listeners from button', function() {
                var called = false;
                var testCallback = function() {
                    called = true;
                };

                controls.onPress('[data-action=play]', testCallback);
                controlsElement.querySelector('[data-action=play]').click();

                expect(called).toBeTruthy();
                called = false;

                controls.offPress('[data-action=play]', testCallback);
                controlsElement.querySelector('[data-action=play]').click();

                expect(called).not.toBeTruthy();
            });
        });

        describe('buttons bar visibility', function() {
            it('should should hide bar ', function() {
                //TODO
            });

            it('should show bar when mousemove', function() {
                //TODO
            });
        });
    });
})();
