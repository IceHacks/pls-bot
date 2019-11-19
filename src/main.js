const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;
const path = require("path");

Menu.setApplicationMenu(null);

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 303,
		height: 418,
		webPreferences: {
			nodeIntegration: true
		},
		useContentSize: true
	});

	win.loadFile("src/index.html");
	win.setIcon(path.resolve(__dirname, "favicon.png"));

	//win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});
