import { electronAPI } from '@electron-toolkit/preload';
const { contextBridge } = require('electron');
import { exec } from 'child_process';
import { hostname } from 'os';

// Custom APIs for renderer
const api = {};

// custom Functions
// 'wmic bios get serialnumber'
function getComputerInfo_option(query) {
  return new Promise((resolve, reject) => {
    exec(query, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
        // console.log(`Serial Number: ${stdout.toString().split('\n')[1].trim()}`);
      }
    });
  });
}
async function getComputerInfo_preload() {
  try {
    const serialNumber = await getComputerInfo_option('wmic bios get serialnumber');
    const hostName = await getComputerInfo_option('hostname');
    const manufacturerModel = await getComputerInfo_option('wmic baseboard get Manufacturer');
    const data = {
      hostname: hostName,
      serialNumber: serialNumber.split('\n')[1].trim(),
      manufacturerModel: manufacturerModel.split('\n')[1].trim()
     }
     return data
  } catch (error) {
    console.error(`SE PRESENTÓ EL SIGUIENTE ERROR: ${error}`);
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
contextBridge.exposeInMainWorld('electron', {
  ...electronAPI,
  getComputerInfo: async () => {
    return await getComputerInfo_preload();
  },
});
if (process.contextIsolation) {
  console.log('preload script loaded');
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  (window.electron = electronAPI), (window.api = api);
}
