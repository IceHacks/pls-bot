const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;

Menu.setApplicationMenu(null);

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 303,
		height: 323,
		webPreferences: {
			nodeIntegration: true
		},
		useContentSize: true
	});

	win.loadFile("src/index.html");

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
