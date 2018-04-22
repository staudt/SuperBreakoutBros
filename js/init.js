'use strict';

const Command = quick.Command;

const Color = quick.Color;
const Quick = quick.Quick;
const Scene = quick.Scene;
const Sprite = quick.Sprite;

const TILE_WIDTH = 64;
const TILE_HEIGHT = 30;

let level = 0;
let player;
let scene;