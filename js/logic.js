class Objects {
	constructor(type, name, level, health, accuracy) {
		this.type = type;
		this.name = name;
		this.level = level;
		this.inventory = [];
		this.health = health;
		this.accuracy = accuracy;
	}
	attack(target, choose) {
		const test = Math.floor(Math.random() * (0 - 10)) / 10;
		if (this.inventory.length === 0) {
			if (this.accuracy >= test) {
				target.health--;
				updateDOM(
					"#playWindow",
					`${this.name} punches ${target.name}! They now have ${target.health} health left!`
				);
			} else {
				updateDOM("#playWindow", `${this.name} missed ${target.name}!`);
			}
		} else if (this.accuracy >= test) {
			target.health -= choose.damage;
			choose.durability--;
			updateDOM(
				"#playWindow",
				`${this.name} hits ${target.name} with a ${choose.name}! They now have ${target.health} health left, and their weapon now has ${choose.durability} hit(s) left before it breaks!`
			);
		} else {
			choose.durability--;
			updateDOM(
				"#playWindow",
				`${this.name} missed ${target.name} Their weapon now has ${choose.durability} hit(s) left before it breaks!`
			);
		}
		if (choose.durability <= 0) {
			removeItem(choose, this);
		}
	}
	heal(healthItem) {
		healthItem.durability--;
		this.health += healthItem.damage;
		updateDOM(
			"#playWindow",
			`${this.name} healed themselves for  ${healthItem.damage}. Their health is now ${this.health}. Their health potion now has ${healthItem.durability} uses left before it runs out!`
		);
	}
	aquireItem(item) {
		item.owner = this.name;
		this.inventory.push(item);
		loadInventory(this, item);
	}
	startingItems() {
		this.inventory.owner = this.name;
	}
}

class Factory {
	constructor(level) {
		this.badGuys = [];
		this.level = level;
	}
	instantiateBad(num) {
		let badWeapons = new Item_Factory();

		for (let i = 0; i < this.level * num; i++) {
			badWeapons.createRustySword();
			const generatedObj = new Objects(
				"baddie",
				`Ruffian #${this.badGuys.length + 1}`,
				this.level,
				Math.floor(Math.random() * (10 - 5) + 5),
				Math.floor(Math.random() * (7 - 3)) / 10
			);
			this.badGuys.push(generatedObj);
			this.badGuys[i].inventory.push(badWeapons.weapons[i]);
			console.log(this.badGuys[i]);
		}
		return this.badGuys;
	}
	instantiatePlayer(name, health) {
		const you = new Objects("player", name, 1, health, 0.6);
		return you;
	}
	instantiateBoss(health) {}
}

class Item {
	constructor(name, damage, type, durability, level, description) {
		this.name = name;
		this.damage = damage; // if damage is positive, it damages the person its used on. If damage is negative, it heals!
		this.type = type;
		this.level = level;
		this.owner = null;
		this.durability = durability;
		this.description = description;
	}
}

class Item_Factory {
	constructor(level) {
		this.weapons = [];
		this.modifiers = [];
		this.level = level;
	}
	createRustySword() {
		const rustySword = new Item(
			"rusty sword",
			5,
			"sword",
			2,
			1,
			"Hopefully it's sharp enough to get the job done."
		);
		this.weapons.push(rustySword);
		return rustySword;
	}
	createSword() {
		const sword = new Item(
			"good sword",
			5,
			"sword",
			5,
			1,
			"It looks sharp, and durable!"
		);
		this.weapons.push(sword);
		return sword;
	}
	createHealthPot() {
		const healthPot = new Item("health potion", 3, "healing", 3, 1, "Heals!");
		this.modifiers.push(healthPot);
		return healthPot;
	}
}
const removeItem = (choose, object) => {
	setTimeout(() => {
		updateDOM("#playWindow", `${this.name}'s ${choose.name} broke!!`);
		object.inventory = object.inventory.splice(choose, 1);
		console.log(object.inventory);
	}, 2000);
	if (object.type === "player") {
		clearInventory(object);
	}
};

const gameLoop = (baddies, player) => {
	const startLoop = () => {
		askDOM("#main", `There are ${baddies.length} bad guys left! Now what?`);
	};
	attackLoop = () => {
		console.log(baddies[0].health);
		player.attack(baddies[0], player.inventory[0]);
		setTimeout(() => {
			if (baddies[0].health <= 0) {
				updateDOM("#playWindow", `${baddies[0].name} has died!`);
				if (Math.floor(Math.random() * (10 - 5) + 5) > 7) {
					setTimeout(() => {
						itemDOM(
							"#main",
							`${baddies[0].name} had an item on him! Would you like to see what it is?`
						);
					}, 2000);
				} else {
					setTimeout(startLoop, 2000);
				}
				baddies.shift();
			} else {
				console.log(baddies[0].inventory[0]);
				baddies[0].attack(player, baddies[0].inventory[0]);
				setTimeout(
					() => askDOM("#main", `${baddies[0].name} is still alive! Now what?`),
					2000
				);
			}
		}, 2000);
	};
	randomItemFind = () => {
		const random = new Item_Factory();
		random.createHealthPot();
		random.createRustySword();
		random.createSword();
		numRand = Math.floor(Math.random() * 2);
		if (numRand === 1) {
			num = Math.floor(Math.random() * 2);
			player.aquireItem(random.weapons[num]);
			updateDOM("#playWindow", `You found a ${random.weapons[num].name}`);
			startLoop();
		} else {
			player.aquireItem(random.modifiers[0]);
			updateDOM("#playWindow", `You found a ${random.modifiers[0].name}`);
			startLoop();
		}
	};
	healYourself = () => {
		player.heal(
			player.inventory.find((element) => {
				if (element.name === "health potion") {
					return element;
				}
			})
		);
		setTimeout(startLoop, 2000);
	};
};
let level = 0;

formDOM("#playWindow", "enter the name of your character");
const start = (name) => {
	level++;
	const gameLvl = new Factory(level);
	const player = gameLvl.instantiatePlayer(name, 20);
	const totalItems = new Item_Factory(level);
	player.inventory = [
		totalItems.createRustySword(),
		totalItems.createHealthPot(),
	];
	console.log(player.inventory);
	loadInventory(player);
	let baddies = gameLvl.instantiateBad(3);
	console.log(baddies);
	gameLoop(baddies, player);
	askDOM(
		"#main",
		`There are ${baddies.length} bad guys! The first one is approaching! What do you do?`
	);
};
