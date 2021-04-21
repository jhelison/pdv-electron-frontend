import React from "react"
import { remote } from "electron"

import { FiHome } from "react-icons/fi"
import { FiUsers } from "react-icons/fi"
import { BsClockHistory } from "react-icons/bs"
import { FiSettings } from "react-icons/fi"
import { FiMenu } from "react-icons/fi"
import { FiLogOut } from "react-icons/fi"
import { FiInfo } from "react-icons/fi"
import { BsTerminal } from "react-icons/bs"

import { FiX } from "react-icons/fi"

import { Modal } from "bootstrap"

var window = remote.getCurrentWindow()
var exitModal = null

export default (props) => {
    const toggleMenu = (navId, mainId) => {
        console.log("CLICKED")
        const nav = document.getElementById(navId)
        const main = document.getElementById(mainId)
        nav.classList.toggle("expand-nav")
        main.classList.toggle("expand-left-margin")
    }

    const changeSelected = (ele) => {
        const navLinks = document.querySelectorAll(".nav-link")
        navLinks.forEach((l) => l.classList.remove("active"))
        ele.classList.add("active")

        const nav = document.getElementById("navbar")
        if (nav.classList.contains("expand-nav")) {
            toggleMenu("navbar", "main-content")
        }
    }

    const showCloseModal = () => {
        exitModal = new Modal(document.getElementById("exit-modal"))
        exitModal.toggle()
    }
    const hideCloseModal = () => {
        exitModal.hide()
    }

    const hideWindow = () => {
        window.hide()
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
                                onClick={() =>
                                    toggleMenu("navbar", "main-content")
                                }
                            >
                                <FiMenu />
                            </div>
                        </div>
                    </div>

                    <div>
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
                        href="#/about"
                        className="nav-link"
                        onClick={(e) => changeSelected(e.currentTarget)}
                    >
                        <div className="nav-link-icon">
                            <FiInfo />
                        </div>
                        <span className="nav-name">Sobre</span>
                    </a>

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
                        className="nav-link nav-link-exit"
                        onClick={showCloseModal}
                    >
                        <div className="nav-link-icon">
                            <FiLogOut />
                        </div>
                        <span className="nav-name">Sair</span>
                    </a>
                </div>
            </div>

            <div className="modal" tabIndex="-1" id="exit-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sair</h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                Isso encerra a atividade do servidor e fechará o
                                APP
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={hideCloseModal}
                            >
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-warning" onClick={hideWindow}>
                                Minimizar
                            </button>
                            <button type="button" className="btn btn-danger" onClick={closeWindow}>
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
