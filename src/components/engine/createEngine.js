import Monkey0 from '../../assets/img/walk/smart monkey_knight_walk_1_000.png';
import Monkey1 from '../../assets/img/walk/smart monkey_knight_walk_1_001.png';
import Monkey2 from '../../assets/img/walk/smart monkey_knight_walk_1_002.png';
import Monkey3 from '../../assets/img/walk/smart monkey_knight_walk_1_003.png';
import Monkey4 from '../../assets/img/walk/smart monkey_knight_walk_1_004.png';
import Monkey5 from '../../assets/img/walk/smart monkey_knight_walk_1_005.png';
import Monkey6 from '../../assets/img/walk/smart monkey_knight_walk_1_006.png';
import Monkey7 from '../../assets/img/walk/smart monkey_knight_walk_1_007.png';

const BLOCKS = [140, 250, 390];

const charWidth = 100;
const charHeight = 170;

const blockWidth = 80;
const blockHeight = 200;

// this is in comparison to the rest of the game
// 2 is twice the speed
// 1 is the same speed
const JUMP_VELOCITY = 1;

export default function CreateEngine(setState) {
	//Settings of game
	this.settings = {
		tile: 10, //Width of Tiles
	};

	this.sprites = [
		Monkey0,
		Monkey1,
		Monkey2,
		Monkey3,
		Monkey4,
		Monkey5,
		Monkey6,
		Monkey7,
	];

	this.spriteState = 0;

	// Current Stage Position
	this.game = 'start';
	this.stage = 0;
	this.jump = false;
	this.direction = 'up';
	this.position = 0;
	this.max = this.settings.tile * 40;
	this.blocks = BLOCKS.map((b) => b * this.settings.tile);

	const checkBlocks = () => {
		const charXPos = this.stage + 200;
		const charYPos = this.position;

		if (
			charXPos > this.blocks[this.blocks.length - 2] + 200 &&
			this.position <= 0
		) {
			this.game = 'win';
		}

		this.blocks.forEach((block) => {
			if (
				charXPos + charWidth >= block &&
				charYPos <= blockHeight &&
				charYPos + charHeight >= 0 &&
				charXPos <= block + blockWidth
			) {
				this.game = 'fail';
			}
		});
	};

	const doJump = () => {
		//if not jumping, reset and return
		if (!this.jump) {
			this.position = 0;
			this.direction = 'up';
			return;
		}

		//if finished jumping, reset and return
		if (this.direction === 'down' && this.position <= 0) {
			this.jump = false;
			this.position = 0;
			this.direction = 'up';
			return;
		}

		if (this.position >= this.max) this.direction = 'down';

		this.direction === 'up'
			? (this.position += this.settings.tile * JUMP_VELOCITY)
			: (this.position -= this.settings.tile * JUMP_VELOCITY);
	};

	//function that will be continuously ran

	this.reRender = () => {
		//move the stage by one tile
		this.stage += this.settings.tile;

		// check if char has hit a block

		checkBlocks();

		let randomPosition = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000);
		if (this.game === 'win') {
			console.log(randomPosition);
			this.blocks.push(this.blocks[this.blocks.length - 1] + randomPosition);
			this.game = 'start';
		}

		//check and perfom jump
		doJump();
		let sprite = this.sprites[this.spriteState];
		this.spriteState += 1;

		if (this.spriteState >= 8) {
			this.spriteState = 0;
		}

		setState({
			stage: this.stage,
			jump: this.position,
			blocks: this.blocks,
			status: this.game,
			sprite: sprite,
		});

		if (this.game !== 'start') {
			this.game = 'start';
			this.stage = 0;
			this.jump = false;
			this.direction = 'up';
			this.position = 0;
			return null;
		}

		return requestAnimationFrame(this.reRender);
	};

	this.reRender();

	return () => ({
		jump: () => {
			//if jump is not active, trigger jump
			if (!this.jump) this.jump = true;
		},
	});
}
