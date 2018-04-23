'use strict';

class GameScene extends Scene {
  constructor() {
    super();
    this.setColor('#29adff');
    this.build(MAPS[level], tileFactory);
    if (level == 0) {
      this.add(new TextSprite('Press A or Space to Start')
        .setSize(300, 40)
        .setFontSize(30)
        .setCenterX(this.centerX)
        .setCenterY(this.centerY+100)
      );
      this.controller = Quick.getController();
    } else {
      player = new Player().setPosition(300, 200)
      this.add(player);
      this.add(new Ball().setPosition(500, 400));
    }
    this.remainingTiles = MAP_TILES[level];
  }

  update() {
    if (level == 0) {
      if (this.controller.keyDown(Command.A)) {
        level++;
        this.next = new GameScene();
        this.expire()
      }
    }
  }

  minusOne() {
    if(--this.remainingTiles<=0) {
      if(++level>MAPS.length) {        
        level = 0; // end game!
      }
      this.next = new GameScene();
      this.expire()
    }
  }
}

Quick.setName('Super Breakout Bros');
Quick.setKeepAspect(true);

scene = new GameScene()

document.addEventListener('DOMContentLoaded', function() {
  Quick.init(scene);
}, false);