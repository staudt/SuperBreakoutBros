'use strict';

class Player extends Sprite {
  constructor() {
    super();
    this.controller = Quick.getController();
    this.state = Jumping;
    this.setColor('#202020');
    this.setSize(40, 34);
    this.setSolid(true);
    this.setMaxSpeedY(12);
    this.addTag('player');
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
    } else if (target.hasTag('ball')) {
      target.bounceFrom(target.getCollision(this));
      target.setSpeedX(((target.centerX-this.centerX)/4));
      if (!direction.bottom) {
        target.setSpeedY(target.speedY+this.speedY-6);
      }
      this.bounceFrom(direction);
    }
  }

  update() { this.state.update(this); }
}

class PlayerState {
  static update(parent) {
    parent.setSpeedY(parent.speedY+1);
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
      parent.setSpeedY(-15);
      parent.state = Jumping;
    }
  }
}