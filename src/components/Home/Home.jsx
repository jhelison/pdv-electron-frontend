import React from "react"
import Main from "../template/Main"

import { FiHome } from "react-icons/fi"
import { FiUsers } from "react-icons/fi"
import { FiUserCheck } from "react-icons/fi"
import { FiServer } from "react-icons/fi"

import QRCode from "react-qr-code"

export default (props) => {
    return (
        <Main
            title="Home"
            subtitle="Bem vindo, veja o que está acontecendo hoje"
            icon={<FiHome />}
        >
            <div className="home-content">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="container">
                                <div className="row">
                                    <div className="col d-flex justify-content-start align-items-center">
                                        <div className="d-flex justify-content-center align-items-center bg-primary rounded-card-icon">
                                            <FiUsers />
                                        </div>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center flex-column">
                                        <div>
                                            <h6>Usuários Cadastrados</h6>
                                            <h1>12</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="container">
                                <div className="row">
                                    <div className="col d-flex justify-content-start align-items-center">
                                        <div className="d-flex justify-content-center align-items-center bg-success rounded-card-icon">
                                            <FiUserCheck />
                                        </div>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center flex-column">
                                        <div>
                                            <h6>Usuários Ativos</h6>
                                            <h1>6</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="container">
                                <div className="row">
                                    <div className="col d-flex justify-content-start align-items-center">
                                        <div className="d-flex justify-content-center align-items-center bg-warning rounded-card-icon">
                                            <FiServer />
                                        </div>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center flex-column">
                                        <div>
                                            <h6>Status Servidor</h6>
                                            <h1>Ativo</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-7">
                        <div className="card">

                        </div>
                    </div>
                    <div className="col">
                        <div className="card card-qr d-flex justify-content-between align-items-center">
                            <h6>Cadastro rápido de usuário</h6>
                            <div className="qr-background d-flex justify-content-center align-items-center mb-5">
                                <QRCode value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" size={250} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
