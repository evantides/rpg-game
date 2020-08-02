console.log($);
const updateDOM = ($element, popUp) => {
	const $modal = $("<div>");
	$modal.addClass("modalVisible");
	const $text = $("<p>");
	$text.addClass("description");
	$text.text(popUp);
	$(`${$element}`).append($modal);
	$modal.append($text);
};

$(() => {
	const loadInventory = () => {
		player.inventory.forEach((item) => {
			const $show = $("<div>");
			$show.addClass("inventory-container");
			const $modal = $("<div>");
			$modal.addClass("modal");
			const $image = $("<img>");
			if (item.name === "rusty sword") {
				$image.attr("src", "img/rusty_sword.png");
				$image.attr("class", "sword");
			} else if (item.name === "good sword") {
				$image.attr("src", "img/just_a_sword.png");
				$image.attr("class", "sword");
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
		});
	};
	loadInventory();
	let chosen = null;
	$(".inventory-container").on("click", (event) => {
		let $thisThing = $(event.currentTarget).find(".modal");
		chosen = $thisThing.find("h2").text();
		$thisThing.toggle(".showIt");
	});
	$(".modalVisible").on("click", (event) => {
		let $thisThing = $(event.currentTarget);
		$thisThing.remove();
	});
});
