import React from "react"
import { remote } from "electron"

import { FiHome } from "react-icons/fi"
import { FiUsers } from "react-icons/fi"
import { BsClockHistory } from "react-icons/bs"
import { FiSettings } from "react-icons/fi"
import { FiMenu } from "react-icons/fi"
import { FiLogOut } from "react-icons/fi"
import { BsTerminal } from "react-icons/bs"

var window = remote.getCurrentWindow()

export default (props) => {
    //Nav Toogle Script
    const toggleMenu = (rootId) => {
        const root = document.getElementById(rootId)
        root.classList.toggle("expand")
    }

    const changeSelected = (ele) => {
        const navLinks = document.querySelectorAll(".nav-link")
        navLinks.forEach((l) => l.classList.remove("active"))
        ele.classList.add("active")
    }

    const closeWindow = () => {
        window.close()
    }

    return (
        <aside className="menu-area" id="navbar">
            <div className="nav">
                <div>
                    <div className="nav-link">
                        <div className="nav-link-icon">
                            <div
                                className="nav-toggle"
                                id="nav-toggle"
                                onClick={() => toggleMenu("app-root")}
                            >
                                <FiMenu />
                            </div>
                        </div>
                    </div>

                    <div className="nav-list">
                        <a
                            href="#"
                            className="nav-link active"
                            onClick={(e) => changeSelected(e.currentTarget)}
                        >
                            <div className="nav-link-icon">
                                <FiHome />
                            </div>
                            <span className="nav-name">Home</span>
                        </a>

                        <a
                            href="#/users"
                            className="nav-link"
                            onClick={(e) => changeSelected(e.currentTarget)}
                        >
                            <div className="nav-link-icon">
                                <FiUsers />
                            </div>
                            <span className="nav-name">Usuários</span>
                        </a>

                        <a
                            href="#/terminal"
                            className="nav-link"
                            onClick={(e) => changeSelected(e.currentTarget)}
                        >
                            <div className="nav-link-icon">
                                <BsTerminal />
                            </div>
                            <span className="nav-name">Servidor</span>
                        </a>

                        <a
                            href="#/acesslog"
                            className="nav-link"
                            onClick={(e) => changeSelected(e.currentTarget)}
                        >
                            <div className="nav-link-icon">
                                <BsClockHistory />
                            </div>
                            <span className="nav-name">Log de acessos</span>
                        </a>
                    </div>
                </div>

                <div>
                    <a
                        href="#/configuration"
                        className="nav-link"
                        onClick={(e) => changeSelected(e.currentTarget)}
                    >
                        <div className="nav-link-icon">
                            <FiSettings />
                        </div>
                        <span className="nav-name">Configurações</span>
                    </a>

                    <a
                        href="#"
                        className="nav-link"
                        onClick={closeWindow}
                    >
                        <div className="nav-link-icon">
                            <FiLogOut />
                        </div>
                        <span className="nav-name">Sair</span>
                    </a>
                </div>
            </div>
        </aside>
    )
}
