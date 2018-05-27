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
    this.brickCollisions = [];
  }

  update() {
    //this.setSpeedY(this.speedY+0.05);    
    if (this.speedY>3) this.setSpeedY(this.speedY-0.05)
    if (this.speedY<-3) this.setSpeedY(this.speedY+0.05)
    if (this.brickCollisions.length>1) {
      this.bounceFrom(this.getCollision(this.brickCollisions[0].union(this.brickCollisions[1])));
      this.brickCollisions[0].onBounce();
    } else if (this.brickCollisions.length > 0) {
      this.bounceFrom(this.getCollision(this.brickCollisions[0]));
      this.brickCollisions[0].onBounce();
    }
    this.brickCollisions = [];
  }

  onCollision(target) {
    let collision = this.getCollision(target);
    if(target.hasTag('monster')) {
      target.onBounce();
      this.bounceFrom(collision);
    } else if (target.hasTag('tile')) {
      this.brickCollisions.push(target);
    }
  }
}
