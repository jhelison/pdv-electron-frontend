import { BrowserWindow, shell, app } from "electron"
import path from "path"

const installExtensions = async () => {
    const installer = require("electron-devtools-installer")
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    const extensions = ["REACT_DEVELOPER_TOOLS"]

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload
        )
        .catch(console.log)
}

const buildMainWindow = async () => {
    if (
        process.env.NODE_ENV === "development" ||
        process.env.DEBUG_PROD === "true"
    ) {
        await installExtensions()
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, "assets")
        : path.join(__dirname, "../../assets")

    const getAssetPath = (...paths) => {
        return path.join(RESOURCES_PATH, ...paths)
    }

    let mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        frame: false,
        resizable: false,
    })

    const indexPath = require('path').resolve(__dirname, '..')
    mainWindow.loadURL(`file://${indexPath}/index.html`)

    mainWindow.webContents.on('did-finish-load', () => {
        if(!mainWindow) {
            throw new Error('"mainWindow" is not defined')
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize()
        } else {
            mainWindow.show()
            mainWindow.focus()
        }
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.webContents.on("new-window", (event, url) => {
        event.preventDefault()
        shell.openExternal(url)
    })

    return mainWindow
}

export default buildMainWindow
