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
		askDOM("#main", `There are ${baddies.length} bad guys left! Now what?`);
	};
	attackLoop = () => {
		console.log(baddies[0].health);
		player.attack(
			baddies[0],
			player.inventory.find((element) => {
				if (element.type === "sword") return element;
			})
		);
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
	player.inventory = [totalItems.createSword(), totalItems.createHealthPot()];
	console.log(player.inventory);
	loadInventory(player);
	let baddies = gameLvl.instantiateBad(level + 2);
	console.log(baddies);
	gameLoop(baddies, player);
	askDOM(
		"#main",
		`There are ${baddies.length} bad guys! The first one is approaching! What do you do?`
	);
};

const newLvl = (player) => {
	level++;
	player.health = 20 + 2 * level;
	player.level = level;
	const gameLvl = new Factory(level);
	let baddies = gameLvl.instantiateBad(level + 2);
	const totalItems = new Item_Factory(level);
};
