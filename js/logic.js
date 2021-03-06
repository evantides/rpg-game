let timeout = 4000;
const removeItem = (choose, object) => {
	console.log(choose, "THIS IS WHAT YOU'RE GOING TO DELETE");
	object.inventory.splice(object.inventory.indexOf(choose), 1);
	console.log(object.inventory, "THIS IS WHAT IS GOING TO BE RENDERED");
	setTimeout(() => {
		updateDOM("#playWindow", `${object.name}'s ${choose.name} broke!!`);
	}, timeout);
	if (object.type === "player") {
		clearInventory(object); //deletes images
	}
};

const endLoop = (player, winBool) => {
	if (!winBool) {
		formDOM(
			"#playWindow",
			`Game Over!
            ${player.name} has died, with ${player.health} points left from that last attack! They were level ${player.level} and have ${player.exp} points of expereience! Do you want to play again? Type yes or no!`,
			false,
			"gameOver"
		);
	} else if (winBool) {
		formDOM(
			"#playWindow",
			`Game Over!
            ${player.name} has won the game! They are level ${player.level} and have ${player.exp} points of expereience! Do you want to play again? Type yes or no!`,
			false,
			"gameOver"
		);
	}
};

const gameLoop = (baddies, player) => {
	startLoop = () => {
		if (baddies.length > 0) {
			askDOM("#main", `There are ${baddies.length} bad guys left! Now what?`);
		} else {
			console.log(baddies.length, "ThIS");
			setTimeout(() => {
				updateDOM(
					"#playWindow",
					`${player.name} defeated all enemies in this wave and have ${player.exp} points of experience!`
				);
			}, timeout);
			levelUp(player);
		}
	};
	attackLoop = (skipTurn) => {
		updateInformation("#health", player.health);
		if (!skipTurn) {
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
				updateInformation("#experience", player.exp);
				if (Math.floor(Math.random() * (10 - 5) + 5) > 7) {
					setTimeout(() => {
						itemDOM(
							"#main",
							`${baddies[0].name} had an item on him! Would you like to see what it is?`
						);
					}, timeout);
				} else {
					setTimeout(startLoop, timeout + 2000);
				}
				setTimeout(() => {
					baddies.shift();
				}, timeout);
			} else {
				baddies[0].attack(player, baddies[0].inventory[0]);
				updateInformation("#health", player.health);
				if (player.health <= 0) {
					console.log("I should be dead");
					endLoop(player);
				} else {
					setTimeout(
						() =>
							askDOM("#main", `${baddies[0].name} is still alive! Now what?`),
						2000
					);
				}
			}
		} else {
			baddies[0].attack(player, baddies[0].inventory[0]);
			updateInformation("#health", player.health);
			if (player.health <= 0) {
				console.log("I should be dead");
				endLoop(player);
			} else {
				setTimeout(
					() => askDOM("#main", `${baddies[0].name} is still alive! Now what?`),
					2000
				);
			}
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
		setTimeout(() => {
			attackLoop(true);
		}, 2000);
	};
};
let level;

formDOM("#playWindow", "enter the name of your character", false, "start");

const beginningLoop = (gameLvl, player) => {
	let baddies = gameLvl.instantiateBad(2);
	gameLoop(baddies, player);
	askDOM(
		"#main",
		`There are ${baddies.length} bad guys! The first one is approaching! What do you do?`
	);
};

const start = (name) => {
	level = 1;
	const gameLvl = new Factory(level);
	const player = gameLvl.instantiatePlayer(name, 20);
	updateInformation("#health", player.health);
	updateInformation("#experience", player.exp);
	const totalItems = new Item_Factory(level);
	player.inventory = [totalItems.createSword(), totalItems.createHealthPot()];
	loadInventory(player);
	beginningLoop(gameLvl, player);
};

const levelUp = (player) => {
	level++;
	player.level = level;
	setTimeout(() => {
		updateDOM(
			"#playWindow",
			`${player.name} has leveled up! They are now level ${player.level}!`
		);
	}, 2000);
	if (level === 5) {
		endLoop(player, true);
	} else if (level % 2 === 0) {
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
		setTimeout(() => {
			formDOM(
				"#playWindow",
				`You can choose to upgrade your base health, or your base attack! Type 'attack' or 'health'`,
				true,
				"main",
				player
			);
		}, timeout);
	}
};

const giveItem = (player, answer, type) => {
	const newItems = new Item_Factory();
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
	updateInformation("#health", player.health);
	updateInformation("#experience", player.exp);
	setTimeout(() => {
		updateDOM(
			"#playWindow",
			`Here are your current stats!
            ${player.name} has ${player.baseHealth}! They are level ${player.level} and have ${player.exp} points of expereience!`
		);
	}, timeout);
	const gameLvl = new Factory(level);
	beginningLoop(gameLvl, player);
};

const playAgain = (answer) => {
	if (answer.trim().toLowerCase === "yes") {
		location.reload();
	} else if (answer.trim().toLowerCase === "no") {
		updateDOM(
			"#playWindow",
			`You don't wanna play again? Okay! Reload if you want to try again some time!`
		);
	}
};
