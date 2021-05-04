import React, { useState, useEffect } from "react"
import Main from "../template/Main"

import { FiCheck } from "react-icons/fi"
import { FiX } from "react-icons/fi"
import { FiRotateCw } from "react-icons/fi"

import { BsTerminal } from "react-icons/bs"

import {lastOutput, resetServer, lastServerStatus} from "../../serverSingleton"

import axios from "axios"

var terminalScrollRef = null

export default (props) => {
    const [pythonShellText, setPythonShellText] = useState(lastOutput())
    const [serverResponseTime, setServerResponseTime] = useState(lastServerStatus())

    useEffect(() => {
        getServerData()
    }, [])

    useEffect(() => {
        if(terminalScrollRef){
            terminalScrollRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [pythonShellText])

    const getServerData = () => {
        setInterval(() => {
            setPythonShellText(lastOutput())
            setServerResponseTime(lastServerStatus())
        }, 300)
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
                    {serverResponseTime ?
                        <button type="button" className="btn btn-success w-25 btn-sm no-click"><FiCheck />{" " + serverResponseTime + " ms"}</button> :
                        <button type="button" className="btn btn-danger w-25 btn-sm no-click"><FiX /></button>
                    }
                    <button type="button" className="btn btn-secondary w-25 btn-sm align-self-end ml-1" onClick={() => resetServer()}><FiRotateCw /></button>
                </div>
                
            </div>
            <div className="card terminal-card" ref={(ele) => {terminalScrollRef = ele}}>
                <pre>{pythonShellText}</pre>
            </div>
        </Main>
    )
}
