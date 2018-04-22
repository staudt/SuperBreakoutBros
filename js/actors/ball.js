'use strict';
const MAX_SPEED = 12;

class Ball extends Sprite {
  constructor() {
    super();
    this.setColor('#aaaa00');
    this.setSize(20, 20);
    this.setSolid(true);
    this.setSpeedX(1+Quick.random(2));
    this.setSpeedY(1+Quick.random(2));
    this.addTag('ball');
  }

  update() {
    this.setSpeedY(this.speedY+0.05);    
    if (this.speedY>MAX_SPEED) this.setSpeedY(MAX_SPEED);
    if (this.speedY<-MAX_SPEED) this.setSpeedY(-MAX_SPEED);
    if (this.speedX>MAX_SPEED) this.setSpeedX(MAX_SPEED);
    if (this.speedX<-MAX_SPEED) this.setSpeedX(-MAX_SPEED);
    if (this.speedX>5) this.setSpeedX(this.speedX-0.05)
    if (this.speedX<-5) this.setSpeedX(this.speedX+0.05)
  }

  onCollision(target) {
    if(target.hasTag('tile')) {
      let collision = this.getCollision(target);
      /*if ((collision.top || collision.bottom) &&
          (collision.left || collision.right)) {
          collision.top ? collision.top = false : collision.bottom = false;
      }*/
      this.bounceFrom(collision);
      target.onBounce(this);
    }
  }
}