import React, { useState, useEffect } from "react"
import Main from "../template/Main"

import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";

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
        if(statusBlueprint){
            return <span class="badge badge-success"><FiCheck /></span>
        }
        return <span class="badge badge-danger"><FiX /></span>
    }
    
    return (
        <Main
            title="Terminal"
            subtitle="Veja o estado atual do servidor"
            icon={<BsTerminal />}
        >
            <div className="card terminal-status-card mb-3">
                <span>Status atual do servidor</span>
                {getServerStatus(true)}
            </div>
            <div className="card terminal-card">
                <pre>{pythonShellText}</pre>
            </div>
        </Main>
    )
}
