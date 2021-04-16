import React from "react"
import { remote } from "electron"

import { FiMinus } from "react-icons/fi"
import { FiX } from "react-icons/fi"

var window = remote.getCurrentWindow()

export default (props) => {

    const minimizeWindow = () => {
        window.minimize()
    }

    const closeWindow = () => {
        window.close()
    }

    return (
        <header className="header">
            <div className="header-dragable-zone">
                <span>C-Plus App Dashboard</span>
            </div>
            <div className="header-actions">
                <div className="header-action-icon" onClick={minimizeWindow}>
                    <FiMinus />
                </div>
                <div className="header-action-icon red" onClick={closeWindow}>
                    <FiX />
                </div>
            </div>
        </header>
    )
}
