const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;
const Tray = electron.Tray;
const iconPath = path.join(__dirname, 'logo.png');

let win;
let tray = null;

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('http://e-attendance.ultimatefreehost.in');
    
}

// ipc.on('async-message', function(event) {
//     event.sender.send('async-reply', 'Main Process opened');
// })

// ipc.on('sync-message', function(event) {
//     event.returnValue = 'sync-reply'
// })

app.on('ready', function() {
    tray = new Tray(iconPath);
    createWindow()

    let template = [
        {
            label: 'Exit',
            click: function() {
                win = null;
            }
        },
    ]
    const ctxMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(ctxMenu);
    tray.setToolTip('My Attendance');
});

app.on('will-quit', function() {
    globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
})