const $ = require("jquery");
const swal = require("sweetalert");
const PlsBot = require("./spam");
const { ipcRenderer } = require("electron");
const setJSON = (k, j) => {
	return localStorage.setItem(k, JSON.stringify(j));
};
const getJSON = k => {
	return JSON.parse(localStorage.getItem(k));
};
const getTokens = () => {
	var old = localStorage.getItem("token");

	if (!!old) {
		setJSON("tokens", [old]);
		localStorage.removeItem("token");
	}

	var t = getJSON("tokens");
	var o = t;

	if (!t) {
		o = [];
	}

	setJSON("tokens", o);

	return o;
};
const render = tokens => {
	let id = -1;
	$("input[id^=token][id!=token0]").remove();

	tokens.forEach(token => {
		id++;

		if (id > 0)
			$("#token" + (id - 1))
				.clone()
				.val(token)
				.attr("id", "token" + id)
				.insertAfter("#token" + (id - 1));
		else $("#token0").val(token);

		$("#token" + id).keyup(() => {
			var t = getJSON("tokens");
			t[id] = $("#token" + id).val();

			setJSON("tokens", t);
		});
	});

	ipcRenderer.send("resize", {
		width: window.innerWidth,
		height: $("body").height() + 20
	});

	$("input[id^=token][id!=token0]").on("contextmenu", e => {
		swal("Delete token?", {
			buttons: {
				cancel: {
					text: "No",
					value: false,
					visible: true,
					className: "",
					closeModal: true
				},
				confirm: {
					text: "Yes",
					value: true,
					visible: true,
					className: "",
					closeModal: true
				}
			}
		}).then(yes => {
			if (yes) {
				var t = getJSON("tokens");

				t.splice(parseInt(e.target.id.replace(/token/, "")), 1);

				setJSON("tokens", t);
				render(t);

				init();
			}
		});
	});
};
const makeBot = (token, channel, amount) => {
	var bot = new PlsBot(token, channel, parseInt(amount));
	bot.start();

	bots.push(bot);
};
const stopBots = () => {
	bots.forEach(b => {
		b.stop();
	});
};
const startBots = () => {
	bots.forEach(b => {
		if (b && !b.enabled) {
			b.start();
			$("#start").attr("disabled", true);
			$("#stop").removeAttr("disabled");
		}
	});
};
const setChannel = c => {
	bots.forEach(b => {
		b.setChannel(c);
	});
};
const sendBots = c => {
	bots.forEach(b => {
		b.channel.send(c);
	});
};
const init = () => {
	var channel = $("#id").val();
	var amount = $("#am").val() || "1";

	stopBots();

	bots = [];

	tokens.forEach(t => {
		makeBot(t, channel, amount);
	});
};

let bots = [];
let tokens = getTokens();

render(tokens);

//$("#token").val(tokens[0]);
$("#id").val(localStorage.getItem("id"));

$("#start").on("click", () => {
	var tokens = getJSON("tokens");
	var channel = $("#id").val();
	var amount = $("#am").val() || "1";

	if (bots.length != tokens.length) {
		init();

		$("#start").attr("disabled", true);
		$("#stop").removeAttr("disabled");
		$("#send").removeAttr("disabled");

		$("#start").val("START");
	}

	startBots();
	setChannel(channel);
});

$("#add").on("click", () => {
	var t = getJSON("tokens");
	t.push("");

	setJSON("tokens", t);

	console.log(t);

	render(t);
});

$("#stop").on("click", () => {
	stopBots();

	$("#stop").attr("disabled", true);
	$("#start").removeAttr("disabled");
});

$("#send").on("click", () => {
	var co = $("#co")
		.val()
		.trim();

	if (co.length > 0) {
		sendBots(co);
	}
});

$("#co").on("keyup", e => {
	if (e.key == "Enter") {
		$("#send").click();
	}
});

$(document).on("change", "#id", () => {
	localStorage.setItem("id", $("#id").val());
});
$(window).resize(() => {
	console.log("resize");
	ipcRenderer.send("resize", {
		width: window.innerWidth,
		height: $("body").height() + 20
	});
});
