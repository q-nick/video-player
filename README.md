# video-player
[![Build Status](https://travis-ci.org/q-nick/video-player.svg)](https://travis-ci.org/q-nick/npm-gui)

### Installation:

After cloning repository you have to work in node/grunt environment. Then run these commands:
```npm install```
```grunt test``` (to run unit tests)
```grunt serve``` - to serve demo, avaialble on: http://localhost:9000 by default


### Functionality:

To add video player on your website you must create new instance of VideoPlayer and give selector to element which you want to ind player (it can be any div):
```
var player = new VideoPlayer('.your-selector');
```
After that player will add some class to founded HTML node.

### Player methods:
```player.play()``` - play current video
```player.pause()``` - pause video
```player.stop()``` - pause video

### Observe state changed
```
player.onStateChanged(callback)
```


There is also possibility to use playlist and screen (which are standalone) without whole player.

Example:
```
var screen = new VideoPlayerController.Screen();
var playlist = new VideoPlayerController.Playlist();
```
