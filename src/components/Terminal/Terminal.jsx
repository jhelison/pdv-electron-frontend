import React, { useState, useEffect } from "react"
import Main from "../template/Main"

import { BsTerminal } from "react-icons/bs"

import getLastOutput from "../../runServer"

export default (props) => {
    const [pythonShellText, setPythonShellText] = useState("")

    useEffect(() => {
        printChildShell()
    }, [])

    const printChildShell = () => {
        setPythonShellText(getLastOutput)
        setInterval(() => {
            console.log(getLastOutput)
            setPythonShellText(getLastOutput)
        }, 1000)
    }

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
