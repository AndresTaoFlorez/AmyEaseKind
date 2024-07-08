import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { join } from "path";
// import icon from '../../resources/icon.png?asset';
import icon from '../../resources/icon.png';

// getComputerInfo libraries
// const { exec } = require('child_process');

// function getSerialNumber(callback) {
//   exec('wmic bios get serialnumber', (error, stdout) => {
//     if (error) {
//       callback(error, null);
//     } else {
//       // callback(null, stdout.trim().split('\n')[1]); // El número de serie está en la segunda línea de la salida
//       callback(null, stdout); // El número de serie está en la segunda línea de la salida
//     }
//   });
// }
function createWindow() {
  // Create the browser window.
  const preloadPath = join(__dirname, '../../preload/index.js')
console.log(preloadPath)
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
   //  ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
       sandbox: false,
       contextIsolation: true,
       preload: join(__dirname, '../preload/index.js'),
       nodeIntegrationInWorker: true,
    },
  });

//   getSerialNumber((error, serialNumber) => {
//     if (error) {
//       console.error(`No se pudo obtener el serial: ${error}`);
//     } else {
//       mainWindow.webContents.on('did-finish-load', () => {
//         mainWindow.webContents.send('serialNumber', serialNumber);
//       });
//     }
//   });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
