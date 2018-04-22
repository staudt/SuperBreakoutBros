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
    this.canJump = true;
  }

  update() {
    this.setSpeedY(this.speedY+0.2);
    // AI
    this.setSpeedX(player.centerX<this.centerX ? -1 : 1);
    if (this.canJump && Quick.random(30)==1) {
      this.setSpeedY(-6);
      this.canJump = false;
    }
  }

  platformCollision(target) {
    let direction = this.getCollision(target);
    if(direction.bottom) {
      this.stop();
      this.state = Standing;
      this.setBottom(target.top-1)
      this.canJump = true;
    } else if (direction.left) {
      this.setLeft(target.right+1);
    } else if (direction.right) {
      this.setRight(target.left-1);
    } else if (direction.top) {
      this.stop().setTop(target.bottom+1);
    }
  }

  onBounce() {
    this.expire();
  }

  onCollision(target) {
    let direction = this.getCollision(target);
    if (target.hasTag('tile')) {
      this.platformCollision(target);
    } else {
      this.bounceFrom(direction);
    }
  }


}