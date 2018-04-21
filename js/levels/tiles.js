'use strict';

class Tile extends Sprite {
  constructor() {
    super();
    this.health = -1;
    this.setSize(TILE_WIDTH, TILE_HEIGHT);
    this.addTag('tile');
  }

  onBounce(ball) {}
}

class Hard extends Tile {
  constructor() {
    super();
    this.setColor('#404040');
    this.setSolid(true);
  }
}

class Paper extends Tile {
  constructor() {
    super();
    this.health = 1;
    this.setColor('#a17c4f');
    this.setSolid(true);
  }

  onBounce(ball) {
    this.expire();
  }
}

class Lava extends Tile {
  constructor() {
    super();
    this.setColor('#cc0000');
  }
}

function tileFactory(id) {
  return CHAR_TILE[id] ? new CHAR_TILE[id]() : null;
}
