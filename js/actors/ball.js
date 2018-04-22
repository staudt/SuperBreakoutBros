'use strict';

class Ball extends Sprite {
  constructor() {
    super();
    this.setSize(20, 20);
    this.setSolid(true);
    this.setSpeedX(1+Quick.random(2));
    this.setSpeedY(3);
    this.addTag('ball');
    this.setImage('ball');
    this.setMaxSpeedX(12);
    this.setMaxSpeedY(8);
    this.setBoundary();
  }

  update() {
    //this.setSpeedY(this.speedY+0.05);    
    if (this.speedY>3) this.setSpeedY(this.speedY-0.05)
    if (this.speedY<-3) this.setSpeedY(this.speedY+0.05)

  }

  onCollision(target) {
    let collision = this.getCollision(target);
    if(target.hasTag('tile') || target.hasTag('monster')) {
      /*if ((collision.top || collision.bottom) &&
          (collision.left || collision.right)) {
      }*/
      target.onBounce();
    }
    this.bounceFrom(collision);
  }
}
