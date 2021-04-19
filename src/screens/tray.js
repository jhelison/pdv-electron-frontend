import { Tray, Menu, remote } from "electron"

let tray = null
const iconPath = require("path").resolve(
    __dirname,
    "../../assets/templateTrayIcon.png"
)

const buildTray = ( ) => {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show",
            type: "normal",
        },
        { label: "Item2", type: "normal" },
        { label: "Item2", type: "separator" },
        { label: "Item3", type: "normal" },
        { label: "Fechar", type: "normal" },
    ])

    tray = new Tray(iconPath)
    tray.setContextMenu(contextMenu)
    return tray
}

export default buildTray
