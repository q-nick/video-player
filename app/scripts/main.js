(function() {
    'use strict';
    var player = new VideoPlayer('.my-player');

    player.screen.setVideo([{
        src: 'video/mov_bbb.mp4',
        type: 'video/mp4'
    }, {
        src: 'video/mov_bbb.ogg',
        type: 'video/ogg'
    }]);

    player.screen.startVideo();

})();
