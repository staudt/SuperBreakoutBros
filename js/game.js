'use strict';

class GameScene extends Scene {
  constructor() {
    super();
    this.setColor('#ddddff');
    this.add(new Player().setPosition(200, 200));
    this.add(new Ball().setPosition(500, 400));
    this.build(MAPS[0], tileFactory);
  }
}

Quick.setName('Super Breakout Bros');
Quick.setKeepAspect(true);
Quick.init(new GameScene);