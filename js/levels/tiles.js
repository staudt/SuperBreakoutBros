'use strict';

const BRICK_COLOR = ['#008753', '#ab5234', '#B7C1C9', '#37A0DF'];

class Tile extends Sprite {
  constructor(health = -1) {
    super();
    this.health = health;
    this.setColor('#282828');
    this.setSize(TILE_WIDTH, TILE_HEIGHT);
    this.setSolid(true);
    this.addTag('tile');
  }

  init() {
    this.innerRect = new Sprite()
                      .setSize(this.width-4, this.height-4)
                      .setLeft(this.left+2).setTop(this.top+2);
    this.scene.add(this.innerRect);
    this.updateColor();
  }

  updateColor() {
    if (this.health==-1) {
      this.innerRect.setColor('#404040');
    } else {
      this.innerRect.setColor(BRICK_COLOR[this.health-1]);
    }
  }

  onBounce(ball) {
    if(this.health > 0) { // breakable
      if (--this.health<=0) {
        if (Quick.random(5+level)>3) {
          this.scene.add(new Monster().setPosition(this.center));
        }
        this.innerRect.expire(); this.expire();
      } else {
        this.updateColor();
      }
    }
  }
}


class Hard extends Tile {
  constructor() {
    super(-1);
  }
}

class Lava extends Sprite {
  constructor() {
    super();
    this.setSize(TILE_WIDTH, TILE_HEIGHT);
    this.setColor('#cc0000');
    this.setSolid(false);
  }
}

function tileFactory(id) {
  if ('1234'.indexOf(id)>=0) {
    return new Tile(parseInt(id));
  }
  return CHAR_TILE[id] ? new CHAR_TILE[id]() : null;
}
