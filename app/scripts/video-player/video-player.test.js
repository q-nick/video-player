(function() {
    describe('Video Player', function() {
        it('constructor should return new player', function() {
            var player = new VideoPlayer('');
            expect(player).toEqual(jasmine.any(Object));
        });
    });
})();
