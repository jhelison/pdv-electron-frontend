import React, { useState, useEffect } from "react"
import Main from "../template/Main"

import { BsTerminal } from "react-icons/bs"

// const child = require("child_process").execFile(
//     "C:\\Users\\Jhelison\\Documents\\Projects\\PDV\\pdv-electron-frontend\\dist\\app\\app.exe",
//     null
// )

// child.stdout.on("data", (data) => {
//     console.log(data)
// })

var child = require("child_process").execFile(
    "C:\\Users\\Jhelison\\Documents\\Projects\\PDV\\pdv-electron-frontend\\dist\\app\\app.exe",
    null,
    {
        // detachment and ignored stdin are the key here:
        detached: true,
        stdio: ["ignore", 1, 2],
    }
)
// and unref() somehow disentangles the child's event loop from the parent's:
child.unref()
child.stdout.on("data", function (data) {
    console.log(data.toString())
})

export default (props) => {
    const [pythonShellText, setPythonShellText] = useState("")

    // useEffect(() => {
    //     console.log("execu")
    //     runPythonShell()
    // }, [])

    // const runPythonShell = () => {
    //     console.log(child)

    return (
        <Main
            title="Terminal"
            subtitle="Veja o estado atual do servidor"
            icon={<BsTerminal />}
        >
            <div className="content-card">
                <pre>{pythonShellText}</pre>
            </div>
        </Main>
    )
}
