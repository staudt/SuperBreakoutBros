'use strict';

class Monster extends Sprite {
  constructor() {
    super();
    this.setSolid(true);
    this.addTag('monster');
    this.setBoundary();
    this.setMaxSpeedY(14);
    this.canJump = false;
  }

  updateAnimation() {
    if (this.centerX == player.centerX) {
      this.setAnimation(MONSTER_STANDING_LEFT);
    } else {
      this.setAnimation(this.speedX > 0 ? MONSTER_RUNNING_RIGHT : MONSTER_RUNNING_LEFT);
    }
    this.setSize(28, 34);
  }

  update() {
    this.setSpeedY(this.speedY+0.2);
    // AI
    this.setSpeedX(player.centerX<this.centerX ? -1 : 1);
    if (this.canJump && Videogame.random(30)==1) {
      this.setSpeedY(-6);
      this.canJump = false;
    }
    this.updateAnimation();
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
