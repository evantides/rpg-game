const updateDOM = ($element, popUp) => {
	const $modal = $("<div>");
	$modal.addClass("modalVisible");
	const $text = $("<p>");
	$text.addClass("description");
	$text.html(popUp + "<br />");
	$(`${$element}`).append($modal);
	$modal.append($text);
	if ($element === "#playWindow") {
		$modal.on("click", (event) => {
			console.log("what");
			let $thisThing = $(event.currentTarget);
			$thisThing.remove();
		});
		setTimeout(() => {
			$modal.remove();
		}, 2000);
	} else {
		return $modal;
	}
};

const itemDOM = ($element, popUp) => {
	$modal = updateDOM($element, popUp);
	const $yes = $("<button>").addClass("yes");
	const $no = $("<button>").addClass("no");
	$yes.text("yes");
	$no.text("no");
	$modal.append($yes);
	$modal.append($no);
	$yes.on("click", (event) => {
		$modal.remove();
		randomItemFind();
	});
	$no.on("click", () => {
		$modal.remove();
	});
};

const askDOM = ($element, popUp) => {
	$modal = updateDOM($element, popUp);
	const $fight = $("<button>").addClass("fight");
	const $heal = $("<button>").addClass("heal");
	const $flee = $("<button>").addClass("flee");
	$fight.text("Fight them!");
	$heal.text("Heal yourself!");
	$flee.text("Risk your turn to run away!");
	$modal.append($fight);
	$modal.append($heal);
	$modal.append($flee);
	$fight.on("click", (event) => {
		attackLoop();
		$modal.remove();
	});
	$heal.on("click", (event) => {
		healYourself();
		$modal.remove();
	});
	$flee.on("click", (event) => {
		console.log("run a check to see if you can.... run!");
	});
};

const formDOM = (element, question) => {
	const $form = $("<form>");
	$form.addClass("in-game-form");
	const $label = $("<label>");
	$label.attr("for", "infoRequired");
	$label.text(question);
	const $input = $("<input>");
	$input.attr("type", "text");
	$input.attr("id", "infoRequired");
	const $submit = $("<input>");
	$submit.attr("type", "submit");
	$submit.attr("value", "Submit");
	$(`${element}`).append($form);
	$form.append($label);
	$form.append($input);
	$form.append($submit);
};

const addInventory = (player, item) => {
	const $show = $("<div>");
	$show.addClass("inventory-container");
	const $modal = $("<div>");
	$modal.addClass("modal");
	const $image = $("<img>");
	switch (item.name) {
		case "rusty sword":
			$image.attr("src", "img/rusty_sword.png");
			$image.attr("class", "sword");
			break;
		case "good sword":
			$image.attr("src", "img/just_a_sword.png");
			$image.attr("class", "sword");
			break;
		case "health potion":
			$image.attr("src", "img/hp_potion.png");
			$image.attr("class", "health");
			break;
	}
	const $name = $("<h2>");
	$name.addClass("description");
	$name.text(item.name);
	const $description = $("<p>");
	$description.addClass("description");
	$description.text(item.description);
	$("#Inventory").append($show);
	$show.append($image);
	$show.append($modal);
	$modal.append($name);
	$modal.append($description);
	$show.click((event) => {
		let $thisThing = $(event.currentTarget).find(".modal");
		$thisThing.toggle(".showIt");
	});
};

const loadInventory = (player, thing) => {
	if (!thing) {
		player.inventory.forEach((item) => {
			addInventory(player, item);
		});
	} else if (thing) {
		addInventory(player, thing);
	}
};

const clearInventory = (player) => {
	player.inventory.forEach((item) => {
		$("#Inventory").empty();
		console.log(item);
	});
	loadInventory(player);
};

$(() => {
	$("form").on("submit", (event) => {
		event.preventDefault();
		let name = $("#infoRequired").val();
		start(name);
		$(event.currentTarget).remove();
	});
});
