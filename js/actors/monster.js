'use strict';

class Monster extends Sprite {
  constructor() {
    super();
    this.setColor('#ffff88');
    this.setSize(34, 34);
    this.setSolid(true);
    this.addTag('monster');
    this.setBoundary();
    this.setMaxSpeedY(14);
  }

  update() {
    this.setSpeedY(this.speedY+0.5);
  }

  onCollision(target) {
    let direction = this.getCollision(target);
    if (target.hasTag('tile')) {
      if(direction.bottom) {
        this.stop();
        this.state = Standing;
        this.setBottom(target.top-1)
      } else if (direction.left) {
        this.setLeft(target.right+1);
      } else if (direction.right) {
        this.setRight(target.left-1);
      } else if (direction.top) {
        this.stop().setTop(target.bottom+1);
      }
    } else {
      this.bounceFrom(direction);
    }
  }
}
