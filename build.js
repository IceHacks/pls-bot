const builder = require("electron-builder");
const fs = require("fs-extra");
const path = require("path");

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
	.then(() => {
		fs.readdir("./dist/", (err, files) => {
			if (err) {
				console.log(err);
			}

			files.forEach(file => {
				const fileDir = path.join("./dist/", file);

				if (!file.match(/plsbot-built\.(\w+)$/g)) {
					try {
						fs.removeSync(fileDir);
					} catch (e) {}
				}
			});
		});
	});
