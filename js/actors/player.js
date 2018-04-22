'use strict';

class Player extends Monster {
  constructor() {
    super();
    this.controller = Quick.getController();
    this.state = Jumping;
    this.setColor('#F4B890');
    this.setSize(34, 34);
    this.setSolid(true);
    this.setMaxSpeedY(12);
    this.addTag('player');
  }

  onCollision(target) {
    let direction = this.getCollision(target);
    if (target.hasTag('tile')) {
      this.platformCollision(target);
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
  }

  onBounce() {}

  update() { this.state.update(this); }
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