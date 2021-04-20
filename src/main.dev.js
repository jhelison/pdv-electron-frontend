import "core-js/stable"
import "regenerator-runtime/runtime"
import path from "path"
import { app, BrowserWindow, Menu, Tray } from "electron"

let mainWindow = null
let tray = null

if (process.env.NODE_ENV === "production") {
    const sourceMapSupport = require("source-map-support")
    sourceMapSupport.install()
}

if (
    process.env.NODE_ENV === "development" ||
    process.env.DEBUG_PROD === "true"
) {
    require("electron-debug")()
}

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

    mainWindow = new BrowserWindow({
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

    const indexPath = require('path').resolve(__dirname)
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
}

const buildTray = () => {
    const iconPath = require("path").resolve(
        __dirname,
        "../assets/templateTrayIcon.png"
    )

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Mostrar",
            type: "normal",
            click: () => mainWindow.show()
        },
        {
            label: "Esconder",
            type: "normal",
            click: () => mainWindow.hide()
        },
        {
            label: "Sair",
            type: "normal",
            click: () => mainWindow.close()
        },
    ])
    tray = new Tray(iconPath)
    tray.setContextMenu(contextMenu)
    
    tray.on('double-click', () => {
        mainWindow.show()
    })
}

app.whenReady().then(() => {
    buildMainWindow()
    buildTray()

    app.on("activate", () => {
        if (mainWindow === null){
            buildMainWindow()
        }
    })
}).catch(console.log)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

