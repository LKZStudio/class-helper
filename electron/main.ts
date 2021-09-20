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
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    title: "班级工具",
    width: 600,
    height: 450,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false
    }
  })

  Menu.setApplicationMenu(null)
  // mainWindow.webContents.openDevTools()

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + "#/index")

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
    width: 520,
    height: 380,
    transparent: true,
    resizable: false,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false
    }
  })

  calendarWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + "#/calendar")

  calendarWindow.on('closed', () => {
    calendarWindow = null
  })
}

function createRandomWindow() {
  randomWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 365,
    height: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false
    }
  })

  randomWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + "#/random")
  
  randomWindow.on('closed', () => {
    randomWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('open-url', (_, url) => {
    shell.openExternal(url)
  })
}

function clickCalendarWindow() {
  if (calendarWindow === null || calendarWindow === undefined) {
    createCalendarWindow()
  } else {
    calendarWindow.close()
  }
}

app.whenReady().then(() => {
  tray = new Tray(path.join(assetsPath, 'assets', 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: '开关倒计时', type: 'normal', click: clickCalendarWindow },
    { label: '打开抽奖', type: 'normal', click: createRandomWindow },
    { label: '打开设置', type: 'normal', click: () => {mainWindow?.show();mainWindow?.focus()} },
    { label: '关闭', type: 'normal', click: () => {forceClose = true;app.quit()} },
  ])
  tray.setToolTip('班级工具')
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
