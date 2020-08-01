class objects {
	constructor(type, state, name, level, theClass) {
		this.type = type;
		this.state = state;
		this.name = name;
		this.level = level;
		this.inventory = [];
		this.theClass = theClass;
	}
	attack(target) {
		if (this.inventory.length === 0) {
			console.log(`${this.name} punches ${target.name}!`);
		} else {
			console.log("choose a weapon!");
		}
	}
	aquireItem(item) {
		item.owner = this.name;
		this.inventory.push(item);
	}
}

class Factory {
	constructor(level) {
		this.badGuys = [];
		this.level = level;
		this.state = "alive";
	}
	instantiateBad() {
		const generatedObj = new objects(
			"baddie",
			this.state,
			`badguy Number${this.creations.length}, this.level`
		);
		this.creations.push(generatedObj);
	}
	instantiatePlayer(name) {
		const you = new objects("player", this.state, name, 1);
		return you;
	}
}

class Item {
	constructor(name, damage, type, level, description) {
		this.name = name;
		this.damage = damage; // if damage is positive, it damages the person its used on. If damage is negative, it heals@
		this.type = type;
		this.level = level;
		this.owner = null;
		this.durability = 5;
		this.description = description;
	}
}

let level = 1;
let gameLvl = new Factory(level);
let rustySword = new Item(
	"rusty sword",
	5,
	"sword",
	1,
	"You found this sword lying on the ground. Hopefully it is sharp enough to get the job done!"
);
let player = gameLvl.instantiatePlayer("John");
console.log(player);
player.attack(player);
player.aquireItem(rustySword);
player.aquireItem(rustySword);
player.attack(player);
