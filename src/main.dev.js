import "core-js/stable"
import "regenerator-runtime/runtime"
import path from "path"
import { app, BrowserWindow } from "electron"

let mainWindow = null

import buildMainWindow from "./screens/MainWindow"
import buildTray from "./screens/tray"

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

app.whenReady().then(() => {
    buildMainWindow()
    buildTray()

    app.on("activate", () => {
        if (mainWindow === null){
            buildMainWindow()
            buildTray()
        }
    })
}).catch(console.log)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

