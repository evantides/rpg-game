console.log($);
$(() => {
	const loadInventory = () => {
		player.inventory.forEach((item) => {
			const $show = $("<div>");
			$show.addClass("inventory-container");
			const $modal = $("<div>");
			$modal.addClass("modal");
			const $image = $("<img>");
			if (item.type === "sword") {
				$image.attr("src", "img/sword.jpg");
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
});
