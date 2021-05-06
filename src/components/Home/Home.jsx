import React, { useState, useEffect } from "react"
import Main from "../template/Main"

import { FiHome } from "react-icons/fi"
import { FiUsers } from "react-icons/fi"
import { FiUserCheck } from "react-icons/fi"
import { FiServer } from "react-icons/fi"
import { FiCheck } from "react-icons/fi"
import { FiX } from "react-icons/fi"

import QRCode from "react-qr-code"

import { lastServerStatus } from "../../serverSingleton"

const acessData = [
    ["10/12/2021", "Jhelison Uchoa", "Orçamento", "Adicionado"],
    ["10/12/2021", "Mark", "Clientes", "Atualizado"],
    ["10/12/2021", "Mark", "Orçamento", "Deletado"],
    ["10/12/2021", "Mark", "Vendas", "Atualizado"],
    ["10/12/2021", "Mark", "Clientes", "Adicionado"],
    ["10/12/2021", "Mark", "Clientes", "Deletado"],
]

export default (props) => {
    const [serverStatus, setServerStatus] = useState(lastServerStatus())

    useEffect(() => {
        setInterval(() => {
            setServerStatus(lastServerStatus())
        }, 1000)
    }, [])

    const buildTable = () => {
        return (
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Nome do vendedor</th>
                        <th scope="col">Tabela alterada</th>
                        <th scope="col">
                            <div className="d-flex justify-content-end">
                                Tipo da mudança
                            </div>
                        </th>
                    </tr>
                </thead>
                {buildTableRows()}
            </table>
        )
    }

    const buildTableRows = () => {
        const getTypeOfChange = (text) => {
            if (text === "Adicionado") {
                return (
                    <div className="alert-custom alert-success-custom">
                        {text}
                    </div>
                )
            }
            if (text === "Atualizado") {
                return (
                    <div className="alert-custom alert-alert-custom">
                        {text}
                    </div>
                )
            }
            return (
                <div className="alert-custom alert-danger-custom">{text}</div>
            )
        }

        return (
            <tbody>
                {acessData.map((val, index) => {
                    return (
                        <tr key={index}>
                            <td>{val[0]}</td>
                            <td>{val[1]}</td>
                            <td>{val[2]}</td>
                            <td>
                                <div className="d-flex justify-content-end">
                                    {getTypeOfChange(val[3])}
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

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
                                            <h1>{serverStatus ? serverStatus.users_count : "0"}</h1>
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
                                            <h1>{serverStatus ? serverStatus.users_active : "0"}</h1>
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
                                            {serverStatus ? (
                                                <h1 className="text-success font-weight-bold">
                                                    <FiCheck />
                                                </h1>
                                            ) : (
                                                <h1 className="text-danger font-weight-bold">
                                                    <FiX />
                                                </h1>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-7">
                        <div className="card card-qr d-flex justify-content-between align-items-center">
                            {buildTable()}
                        </div>
                    </div>
                    <div className="col">
                        <div className="card card-qr d-flex justify-content-between align-items-center">
                            <h6>Cadastro rápido de usuário</h6>
                            {serverStatus ?
                            <div className="qr-background d-flex justify-content-center align-items-center mb-5">
                                 <QRCode value={JSON.stringify(serverStatus.host)} size={250} />
                            </div>
                            :
                            null}
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
