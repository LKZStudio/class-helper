import { contextBridge, ipcRenderer } from 'electron'
import { ConfigDb } from './dbInit'

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

  addName(names: string[]) {
    for (let i = 0;i < names.length;i++) {
      ConfigDb.data.names.push(names[i])
    }
    ConfigDb.save()
  },

  changeNames(names: string[]) {
    ConfigDb.data.names = names
    ConfigDb.save()
  },

  changeRandomType(type: 0 | 1) {
    ConfigDb.data.randomType = type
    ConfigDb.save()
  },

  changeDate(date: number) {
    ConfigDb.data.date = date
    ConfigDb.save()
  },

  getConfigData() {
    return ConfigDb.data
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
