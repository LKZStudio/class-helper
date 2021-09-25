import { contextBridge, ipcRenderer } from 'electron'
import sql from './utils/sql'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  openUrl(url: string) {
    ipcRenderer.send('open-url', url)
  },
  
  addName: sql.addName,

  changeNames: sql.changeNames,

  changeRandomType: sql.changeRandomType,

  changeDate: sql.changeDate,

  getConfigData: sql.getConfigData,

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
