'use strict';

class GameScene extends Scene {
  constructor() {
    super();
    this.setColor('#2785C0');
    this.add(new Player().setPosition(300, 200));
    this.add(new Monster().setPosition(400, 400));
    this.add(new Ball().setPosition(500, 400));
    this.build(MAPS[0], tileFactory);
  }
}

Quick.setName('Super Breakout Bros');
Quick.setKeepAspect(true);

const scene = new GameScene()
Quick.init(scene);