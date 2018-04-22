'use strict';

class Player extends Sprite {
  constructor() {
    super();
    this.controller = Quick.getController();
    this.state = Jumping;
    this.setImageId('standing');
    this.setSize(30, 36);
    this.setSolid(true);
    this.setMaxSpeedY(12);
    this.addTag('player');
    this.hp = 3;
    this.blinking = 0;
  }

  onCollision(target) {
    let direction = this.getCollision(target);
    if (target.hasTag('tile')) {
      platformCollision(this, target);
    } else if (target.hasTag('ball')) {
      target.bounceFrom(target.getCollision(this));
      target.setSpeedX(((target.centerX-this.centerX)/3));
      if (!direction.bottom) {
        target.setSpeedY(target.speedY+this.speedY-6);
      }
      this.bounceFrom(direction);
    } else {
      this.bounceFrom(direction);
    }
    if (target.hasTag('monster') && this.blinking <= 0) {
      if (direction.left || direction.right) {
        if(--this.hp<=0) {
          this.die();
        } else {
          this.blinking = 200;
          this.setSpeedX(direction.left ? 5 : -5);
          this.setSpeedY(-8);
        }
      }
    }
  }

  die() {
    this.expire();
  }

  onBounce() {}

  update() {
    this.state.update(this);
    if (this.blinking > 0) {
      this.setVisible(Quick.random(1)==1);
      --this.blinking;
    } else {
      this.setVisible(true);
    }
  }
}

class PlayerState {
  static update(parent) {
    parent.setSpeedY(parent.speedY+0.8);
    if (parent.controller.keyDown(Command.LEFT)) {
      parent.setSpeedX(-4);
    } else if (parent.controller.keyDown(Command.RIGHT)) {
      parent.setSpeedX(4);
    }
  }
}

class Jumping extends PlayerState {
}

class Standing extends PlayerState {
  static update(parent) {
    super.update(parent);
    if (parent.controller.keyDown(Command.A)) {
      parent.setSpeedY(-14);
      parent.state = Jumping;
    }
  }
}