const $ = require("jquery");
const PlsBot = require("./spam");

let bot = null;

$("#token").val(localStorage.getItem("token"));
$("#id").val(localStorage.getItem("id"));

$("#start").on("click", () => {
	var token = $("#token").val();
	var channel = $("#id").val();
	var amount = $("#am").val() || "1";

	if (!bot && token.length > 0 && channel.length > 0) {
		bot = new PlsBot(token, channel, parseInt(amount));
		bot.start();

		$("#start").attr("disabled", true);
		$("#stop").removeAttr("disabled");
	} else {
		if (!bot) console.log("Didn't make bot");
	}

	if (bot && !bot.enabled) {
		bot.start();

		$("#start").attr("disabled", true);
		$("#stop").removeAttr("disabled");
	}
});

$("#stop").on("click", () => {
	if (bot && bot.enabled) {
		bot.stop();

		$("#stop").attr("disabled", true);
		$("#start").removeAttr("disabled");
	}
});

$(document).on("change", "#token", () => {
	localStorage.setItem("token", $("#token").val());
});
$(document).on("change", "#id", () => {
	localStorage.setItem("id", $("#id").val());
});
