'use strict';

const BRICK_COLOR = ['#00ff00', '#0000ff', '#aaaaaa', '#999999'];

class Tile extends Sprite {
  constructor(health = -1) {
    super();
    this.health = health;
    this.updateColor();
    this.setSize(TILE_WIDTH, TILE_HEIGHT);
    this.setSolid(true);
    this.addTag('tile');
  }

  updateColor() {
    if (this.health==-1) {
      this.setColor('#404040');
    } else {
      this.setColor(BRICK_COLOR[this.health-1]);
    }
  }

  onBounce(ball) {
    if(this.health > 0) { // breakable
      if (--this.health<=0) {
        this.expire();
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

class Lava extends Tile {
  constructor() {
    super();
    this.setSolid(false);
    this.setColor('#cc0000');
  }
}

function tileFactory(id) {
  if ('1234'.indexOf(id)>=0) {
    return new Tile(parseInt(id));
  }
  return CHAR_TILE[id] ? new CHAR_TILE[id]() : null;
}
