const removeItem = (choose, object) => {
	object.inventory.splice(choose, 1);
	console.log(object.inventory);
	setTimeout(() => {
		updateDOM("#playWindow", `${object.name}'s ${choose.name} broke!!`);
	}, 2000);
	if (object.type === "player") {
		clearInventory(object);
	}
};

const gameLoop = (baddies, player) => {
	const startLoop = () => {
		if (baddies.length > 0) {
			askDOM("#main", `There are ${baddies.length} bad guys left! Now what?`);
		} else {
			console.log(baddies.length, "ThIS");
			setTimeout(() => {
				updateDOM(
					"#playWindow",
					`${player.name} defeated all enemies in this wave and have ${player.exp} points of experience!`
				);
			}, 2000);
			levelUp(player);
		}
	};
	attackLoop = () => {
		player.attack(
			baddies[0],
			player.inventory.find((element) => {
				if (element.type === "sword") return element;
			})
		);
		if (baddies[0].health <= 0) {
			setTimeout(() => {
				updateDOM("#playWindow", `${baddies[0].name} has died!`);
			}, 2000);
			player.exp += 100;
			setTimeout(() => {
				updateDOM(
					"#playWindow",
					`${player.name} now has ${player.exp} points of experience!`
				);
			}, 2000);
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
			setTimeout(() => {
				baddies.shift();
			}, 2000);
		} else {
			console.log(baddies[0].inventory[0]);
			baddies[0].attack(player, baddies[0].inventory[0]);
			setTimeout(
				() => askDOM("#main", `${baddies[0].name} is still alive! Now what?`),
				2000
			);
		}
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
let level = 1;

formDOM("#playWindow", "enter the name of your character", false);

const beginningLoop = (gameLvl, player) => {
	let baddies = gameLvl.instantiateBad(level + 2);
	gameLoop(baddies, player);
	askDOM(
		"#main",
		`There are ${baddies.length} bad guys! The first one is approaching! What do you do?`
	);
};

const start = (name) => {
	const gameLvl = new Factory(level);
	const player = gameLvl.instantiatePlayer(name, 20);
	const totalItems = new Item_Factory(level);
	player.inventory = [totalItems.createSword(), totalItems.createHealthPot()];
	loadInventory(player);
	beginningLoop(gameLvl, player);
};

const levelUp = (player) => {
	let ans;
	level++;
	player.level = level;
	const totalItems = new Item_Factory(level);
	setTimeout(() => {
		updateDOM(
			"#playWindow",
			`${player.name} has leveled up! They are now level ${player.level}!`
		);
	}, 2000);
	if (level % 2 === 0) {
		setTimeout(() => {
			formDOM(
				"#playWindow",
				`You get a free item! Type what you want! (Health potion, Rusty Sword, or Sword)`,
				true,
				"weapon",
				player
			);
		}, 2000);
	} else {
		formDOM(
			"#playWindow",
			`You can choose to upgrade your base health, or your base attack! Type 'attack' or 'health'`,
			true,
			"main",
			player
		);
	}
};

const giveItem = (player, answer, type) => {
	const newItems = new Item_Factory();
	console.log(answer);
	if (type === "weapon") {
		switch (answer.trim().toLowerCase()) {
			case "health potion":
				newItems.createHealthPot();
				player.aquireItem(newItems.modifiers[0]);
				break;
			case "rusty sword":
				newItems.createRustySword();
				player.aquireItem(newItems.weapons[0]);
				break;
			case "sword":
				newItems.createSword();
				player.aquireItem(newItems.weapons[0]);
				break;
			default:
				break;
		}
		console.log(player.inventory);
	} else if (type === "main") {
		switch (answer.trim().toLowerCase()) {
			case "attack":
				player.baseAttack += 2;
				break;
			case "health":
				player.baseHealth += 2;
				break;
			default:
				break;
		}
	}
	player.health = player.baseHealth;
	setTimeout(() => {
		updateDOM(
			"#playWindow",
			`Here are your current stats!
            ${player.name} has ${player.baseHealth}! They are level ${player.level} and have ${player.exp} points of expereience!`
		);
	}, 2000);
	const gameLvl = new Factory(level);
	beginningLoop(gameLvl, player);
};
