class Objects {
	constructor(type, name, level, health, accuracy) {
		this.type = type;
		this.name = name;
		this.level = level;
		this.inventory = [];
		this.health = health;
		this.accuracy = accuracy;
		this.exp = 0;
		this.baseHealth = 20;
		this.baseAttack = 2;
	}
	attack(target, choose) {
		const test = Math.floor(Math.random() * (0 - 10)) / 10;
		if (
			this.inventory.length === 0 ||
			(this.inventory.length > 0 &&
				!this.inventory.find((element) => element.type === "sword"))
		) {
			if (this.accuracy >= test) {
				target.health -= this.baseAttack;
				updateDOM(
					"#playWindow",
					`${this.name} punches ${target.name}! They now have ${target.health} health left!`
				);
			} else {
				updateDOM("#playWindow", `${this.name} missed ${target.name}!`);
			}
		} else if (
			this.inventory.find((element) => element.type === "sword") &&
			this.accuracy >= test
		) {
			target.health -= choose.damage + this.baseAttack;
			choose.durability--;
			updateDOM(
				"#playWindow",
				`${this.name} hits ${target.name} with a ${choose.name}! They now have ${target.health} health left, and their weapon now has ${choose.durability} hit(s) left before it breaks!`
			);
			if (choose.durability <= 0) {
				removeItem(choose, this);
			}
		} else {
			choose.durability--;
			updateDOM(
				"#playWindow",
				`${this.name} missed ${target.name} Their weapon now has ${choose.durability} hit(s) left before it breaks!`
			);
			if (choose.durability <= 0) {
				removeItem(choose, this);
			}
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
		this.damage = damage;
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
	looping() {
		for (let i = 0; i < this.level; i++) {
			this.createHealthPot();
			this.createSword();
			this.createRustySword();
		}
	}
}
