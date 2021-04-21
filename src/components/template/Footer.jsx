import React from "react"

import Package from "../../../package.json"

export default (props) => (
    <footer className="footer">
        <span>Desenvolvido por Jhelison Uchoa</span>
        <div className="footer-version-container bg-info">
            <span>{Package.version + " - Ultima versão"}</span>
        </div>
    </footer>
)
