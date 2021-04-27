import React, { useState, useEffect } from "react"
import Main from "../template/Main"

import { FiCheck } from "react-icons/fi"
import { FiX } from "react-icons/fi"
import { FiRotateCw } from "react-icons/fi"

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
        }, 300)
    }

    const getServerStatus = (statusBlueprint) => {
        if (statusBlueprint) {
            return (
                <button type="button" className="btn btn-success w-25 btn-sm no-click"><FiCheck /> 356 ms</button>
            )
        }
        return (
            <button type="button" className="btn btn-danger w-25 btn-sm no-click"><FiX /></button>
        )
    }

    return (
        <Main
            title="Terminal"
            subtitle="Veja o estado atual do servidor"
            icon={<BsTerminal />}
        >
            <div className="small-card mb-3 d-flex justify-content-between align-items-center flex-row">
                <span>Status atual do servidor</span>
                <div className="w-50 d-flex justify-content-end">
                    {getServerStatus(false)}
                    <button type="button" className="btn btn-secondary w-25 btn-sm align-self-end ml-1"><FiRotateCw /></button>
                </div>
                
            </div>
            <div className="card terminal-card">
                <pre>{pythonShellText}</pre>
            </div>
        </Main>
    )
}
