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
		$("#send").removeAttr("disabled");

		$("#start").val("START");
	} else {
		if (!bot) console.log("Didn't make bot");
	}

	if (bot && !bot.enabled) {
		bot.start();
		bot.setChannel(channel);

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

$("#send").on("click", () => {
	var co = $("#co")
		.val()
		.trim();

	if (co.length > 0 && bot) {
		bot.channel.send(co);
	}
});

$("#co").on("keyup", e => {
	if (e.key == "Enter") {
		$("#send").click();
	}
});

$(document).on("change", "#token", () => {
	localStorage.setItem("token", $("#token").val());
});
$(document).on("change", "#id", () => {
	localStorage.setItem("id", $("#id").val());
});
