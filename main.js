const { app, BrowserWindow, nativeTheme } = require('electron');

const SIZE = {
    WIDTH: 800,
    HEIGHT: 600
}

function createWindow() {
    const { WIDTH, HEIGHT } = SIZE;
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    win.loadFile('./src/pages/main/main.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})