'use strict';

class Ball extends Sprite {
  constructor() {
    super();
    this.setColor('#F7F31D');
    this.setSize(20, 20);
    this.setSolid(true);
    this.setSpeedX(1+Quick.random(2));
    this.setSpeedY(3);
    this.addTag('ball');
    this.setMaxSpeedX(12);
    this.setMaxSpeedY(8);
    this.setBoundary()
  }

  update() {
    //this.setSpeedY(this.speedY+0.05);    
    if (this.speedY>3) this.setSpeedY(this.speedY-0.05)
    if (this.speedY<-3) this.setSpeedY(this.speedY+0.05)
  }

  onCollision(target) {
    if(target.hasTag('tile')) {
      let collision = this.getCollision(target);
      if ((collision.top || collision.bottom) &&
          (collision.left || collision.right)) {
        //digonal collision. Oh boy, here we go...
        //collision.top ? collision.top = false : collision.bottom = false;
        if(collision.top) {
          if (findTile(
                target.left,
                collision.top ? target.top-TILE_HEIGHT : target.bottom)) {
            this.bounceX();
          } else {
            if ((collision.left && findTile(target.left-TILE_WIDTH, target.top)) ||
                (collision.right && findTile(target.right, target.top))) {
              this.bounceY();
            } else {
              this.bounceFrom(collision);
            }
          }
        }
      } else {
        this.bounceFrom(collision);
      }
      target.onBounce(this);
    }
  }
}

function getTileX(x) {
  return parseInt(x/TILE_WIDTH);
}

function getTileY(y) {
  return parseInt(y/TILE_HEIGHT);
}

function findTile(posX, posY) {
  return MAPS[level][getTileX(posX)][getTileY(posY)] != ' ';
}