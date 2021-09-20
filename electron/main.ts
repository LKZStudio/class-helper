import { app, BrowserWindow, ipcMain, Menu, shell, Tray } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null
let calendarWindow: BrowserWindow | null
let randomWindow: BrowserWindow | null
let tray: Tray | null

let forceClose = false

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow () {
  console.log(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    title: "班级工具",
    width: 600,
    height: 450,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // Menu.setApplicationMenu(null)

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + "/#/index")

  mainWindow.on('close', (e) => {
    if (!forceClose) {
      e.preventDefault()
      mainWindow?.hide()
    }
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createCalendarWindow() {
  calendarWindow = new BrowserWindow({
    width: 480,
    height: 260,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  calendarWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + "/#/calendar")

  calendarWindow.on('closed', () => {
    calendarWindow = null
  })
}

function createRandomWindow() {
  randomWindow = new BrowserWindow({
    width: 365,
    height: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  randomWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + "/#/random")
  
  randomWindow.on('closed', () => {
    randomWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  ipcMain.on('open-url', (_, url) => {
    console.log(url)
    shell.openExternal(url)
  })
}

app.whenReady().then(() => {
  tray = new Tray(path.join(assetsPath, 'assets', 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开倒计时', type: 'normal', click: () => {console.log("Item1 was clicked")} },
    { label: '打开抽奖', type: 'normal', click: () => {createRandomWindow()} },
    { label: '打开设置', type: 'normal', click: () => {mainWindow?.show();mainWindow?.focus()} },
    { label: '关闭', type: 'normal', click: () => {forceClose = true;app.quit()} },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.addListener('double-click', () => {
    mainWindow?.show()
    mainWindow?.focus()
  })
})

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

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
