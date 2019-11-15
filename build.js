const builder = require("electron-builder");
const Platform = builder.Platform;
const token = process.env.TOKEN;
const gh = require("gh-release");

console.log(token);

builder
	.build({
		targets: Platform.MAC.createTarget(),
		config: {
			appId: "com.pls.bot",
			productName: "PlsBot",
			copyright: "© 2019-20 IceHacks",
			directories: {},
			mac: {
				electronLanguages: []
			},
			artifactName: "plsbot-built.${ext}"
		}
	})
	.then(() => {
		gh(
			{
				tag_name: "v1.0.0",
				name: "Travis Automated Build",
				body: "Built",
				owner: "IceHacks",
				repo: "pls-bot",
				assets: ["dist/plsbot-built.dmg"],
				auth: token
			},
			(err, result) => {
				if (err) throw err;

				console.log(result);
			}
		);
	});
