'use strict';

class Ball extends Sprite {
  constructor() {
    super();
    this.setColor('#aaaa00');
    this.setSize(30, 30);
    this.setSolid(true);
    this.setSpeedX(1+Quick.random(2));
    this.setSpeedY(1+Quick.random(2));
    this.addTag('ball');
  }

  update() {
  }

  onCollision(target) {
    let collision = this.getCollision(target);
    if ((collision.top || collision.bottom) &&
        (collision.left || collision.right)) {
        collision.top ? collision.top = false : collision.bottom = false;
    }
    this.bounceFrom(collision);
    if(target.hasTag('tile')) {
      target.onBounce(this);
    }
  }
}