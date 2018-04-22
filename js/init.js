'use strict';

const Command = quick.Command;

const Color = quick.Color;
const Quick = quick.Quick;
const Scene = quick.Scene;
const Sprite = quick.Sprite;
const Animation = quick.Animation;
const Frame = quick.Frame;

const TILE_WIDTH = 64;
const TILE_HEIGHT = 30;

let level = 0;
let lifes = 0;
let player;
let scene;

const PLAYER_STANDING_RIGHT = new Animation([
	new Frame('standing', 4),
]);

const PLAYER_STANDING_LEFT = new Animation([
	new Frame(Quick.mirror(document.getElementById('standing')), 4),
]);

const PLAYER_RUNNING_RIGHT = new Animation([
	new Frame('running1', 4),
	new Frame('running2', 4),
	new Frame('running3', 4),
	new Frame('running4', 4),
	new Frame('running5', 4),
	new Frame('running6', 4),
	new Frame('running7', 4),
	new Frame('running8', 4),
]);

const PLAYER_RUNNING_LEFT = new Animation([
	new Frame(Quick.mirror(document.getElementById('running1')), 4),
	new Frame(Quick.mirror(document.getElementById('running2')), 4),
	new Frame(Quick.mirror(document.getElementById('running3')), 4),
	new Frame(Quick.mirror(document.getElementById('running4')), 4),
	new Frame(Quick.mirror(document.getElementById('running5')), 4),
	new Frame(Quick.mirror(document.getElementById('running6')), 4),
	new Frame(Quick.mirror(document.getElementById('running7')), 4),
	new Frame(Quick.mirror(document.getElementById('running8')), 4),
]);

const MONSTER_STANDING_RIGHT = new Animation([
	new Frame('mstanding', 4),
]);

const MONSTER_STANDING_LEFT = new Animation([
	new Frame(Quick.mirror(document.getElementById('mstanding')), 4),
]);


const MONSTER_RUNNING_RIGHT = new Animation([
	new Frame('mrunning1', 4),
	new Frame('mrunning2', 4),
	new Frame('mrunning3', 4),
	new Frame('mrunning4', 4),
]);

const MONSTER_RUNNING_LEFT = new Animation([
	new Frame(Quick.mirror(document.getElementById('mrunning1')), 4),
	new Frame(Quick.mirror(document.getElementById('mrunning2')), 4),
	new Frame(Quick.mirror(document.getElementById('mrunning3')), 4),
	new Frame(Quick.mirror(document.getElementById('mrunning4')), 4),
]);