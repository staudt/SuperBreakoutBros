'use strict';

class Monster extends Sprite {
  constructor() {
    super();
    this.setImageId('mstanding');
    this.setSize(30, 36);
    this.setSolid(true);
    this.addTag('monster');
    this.setBoundary();
    this.setMaxSpeedY(14);
    this.canJump = false;
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

  onBounce() {
    if (this.tick > 10) {
      this.expire();
    }
  }

  onCollision(target) {
    let direction = this.getCollision(target);
    if (target.hasTag('tile')) {
      platformCollision(this, target);
    } else {
      this.bounceFrom(direction);
    }
  }
}

function platformCollision(parent, target) {
  let direction = parent.getCollision(target);
  if(direction.bottom) {
    parent.stop();
    parent.state = Standing;
    parent.setBottom(target.top-1)
    parent.canJump = true;
  } else if (direction.left) {
    parent.setLeft(target.right+1);
  } else if (direction.right) {
    parent.setRight(target.left-1);
  } else if (direction.top) {
    parent.stop().setTop(target.bottom+1);
  }
}
