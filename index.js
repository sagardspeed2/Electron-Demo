const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const electron = require('electron');
const ipc = electron.ipcRenderer;

console.log('fone');

const newWindowBtn = document.getElementById('newWindow');
newWindowBtn.addEventListener('click', function(event) {
    let win2 = new BrowserWindow({
        width: 400,
        height: 400,
        backgroundColor: '#f00',
        model: true
    });
    win2.loadURL(url.format({
        pathname: path.join(__dirname, 'second.html'),
        protocol: 'file',
        slashes: true
    }));

    win2.on('closed', () => {
        win=null;
    });
});

const asyncBtn = document.getElementById('asyncBtn');
asyncBtn.addEventListener('click', function(event) {
    console.log('async message 1');
    ipc.send('async-message');
    console.log('async message 2');
});

ipc.on('async-reply', function(event, arg) {
    console.log(arg)
})

const syncBtn = document.getElementById('syncBtn');
syncBtn.addEventListener('click', function(event) {
    console.log('sync message 1');
    const reply = ipc.sendSync('sync-message')
    console.log(reply)
    console.log('sync message 2');
});

const openBtn = document.getElementById('openBtn');
const shell = electron.shell;
openBtn.addEventListener('click', function(e) {
    shell.showItemInFolder('E:\\Untitled.png');
    // shell.openItem('E:\\Untitled.png');
    // shell.openExternal('http://youtube.com');
})