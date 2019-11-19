const Discord = require("discord.js");
const _ = require("lodash");

module.exports = class {
	constructor(token, channel, id) {
		this.data = {
			autos: {
				beg: {
					timeout: 60000
				},
				slots: {
					timeout: 10000,
					amount: true
				},
				gamble: {
					timeout: 10000,
					amount: true
				},
				daily: {
					timeout: 86400000
				},
				dep: {
					timeout: 12000,
					amount: true,
					override: 10
				},
				with: {
					timeout: 15000,
					amount: true,
					override: 5
				}
			}
		};

		this.enabled = false;
		this.ready = false;
		this.client = new Discord.Client();

		this.amount = id || 1;
		this.token = token;
		this.channelId = channel;
		this.giveId = "340711358465179669";
		this.last = {};
		this.lastSent = 0;
		this.maxTimeout = 2500;

		_.forIn(this.data.autos, (opt, name) => {
			this.last[name] = 0;
		});

		this.run = () => {
			if (this.enabled && this.channel && this.ready) {
				var autos = this.data.autos;
				var amount = this.amount;
				var giveId = this.giveId;
				var now = Date.now();

				_.forIn(autos, (opt, name) => {
					if (
						now - this.last[name] >
							opt.timeout +
								500 +
								~~(Math.random() * this.maxTimeout) +
								1 &&
						now - this.lastSent > 2000
					) {
						this.channel.send(
							"pls " +
								name +
								(opt.amount
									? " " + (amount + opt.override || amount)
									: "")
						);

						this.lastSent = now;
						this.last[name] = now;
					}
				});
			}

			window.requestAnimationFrame(this.run);
		};

		window.requestAnimationFrame(this.run);

		this.client.on("ready", () => {
			this.ready = true;
			this.channel = this.client.channels.get(this.channelId);
		});

		this.client.login(this.token);
	}

	setAmount(g) {
		this.amount = g;
	}

	setChannel(c) {
		this.channelId = c;
		this.channel = this.client.channels.get(this.channelId);
	}

	start() {
		this.enabled = true;
	}

	stop() {
		this.enabled = false;
	}
};
