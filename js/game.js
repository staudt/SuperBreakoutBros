'use strict';

class GameScene extends Scene {
  constructor() {
    super();
    this.setColor('#29adff');
    player = new Player().setPosition(300, 200)
    this.add(player);
    this.add(new Ball().setPosition(500, 400));
    this.build(MAPS[0], tileFactory);
  }
}

Quick.setName('Super Breakout Bros');
Quick.setKeepAspect(true);

scene = new GameScene()

document.addEventListener('DOMContentLoaded', function() {
  Quick.init(scene);
}, false);