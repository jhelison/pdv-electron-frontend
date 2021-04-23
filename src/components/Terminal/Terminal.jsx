import React, { useState, useEffect } from "react"
import Main from "../template/Main"

import { FiCheck } from "react-icons/fi"
import { FiX } from "react-icons/fi"

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
                <button type="button" className="btn btn-success btn-sm w-25 align-self-end" disabled><FiCheck /> 356 ms</button>
            )
        }
        return (
            <button type="button" className="btn btn-danger btn-sm w-25 align-self-end"><FiX /> Pressione para reinicializar</button>
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
                {getServerStatus(true)}
            </div>
            <div className="card terminal-card">
                <pre>{pythonShellText}</pre>
            </div>
        </Main>
    )
}
