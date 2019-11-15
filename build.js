const builder = require("electron-builder");
const Platform = builder.Platform;
const token = process.env.TOKEN;

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
	.then(() => {});
