const builder = require("electron-builder");
const Platform = builder.Platform;
const token = process.env.GH_TOKEN;

console.log(token);

builder
	.build({
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
