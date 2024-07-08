import { electronAPI } from '@electron-toolkit/preload'
const { contextBridge } = require('electron');
// const os = require('os')

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// contextBridge.exposeInMainWorld('electron', {
//    ...electronAPI,
//    serialNumber: ()=>{ return Math.floor(Math.random() * 1000) }
//    })
if (process.contextIsolation) {
   console.log('preload script loaded');
   try {
      contextBridge.exposeInMainWorld('electron', {
         ...electronAPI,
         serialNumber: ()=>{ return Math.floor(Math.random() * 1000) }
         })
      contextBridge.exposeInMainWorld('api', api)
   } catch (error) {
     console.error(error)
   }
 } else {
   window.electron = {
     ...electronAPI,
     serialNumber: ()=>{ return Math.floor(Math.random() * 1000) }

   }
   window.api = api
 }
 

