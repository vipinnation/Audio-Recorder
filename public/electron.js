const path = require("path");
const { app, BrowserWindow } = require("electron");

const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    length: 728,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("http://localhost:3000");

  // // isDev
  // ? "http://localhost:3000"
  // : `file://${path.join(__dirname, "../build/index.html")}`
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
