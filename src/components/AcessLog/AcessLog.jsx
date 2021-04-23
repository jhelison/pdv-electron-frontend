import React from "react"
import Main from "../template/Main"

import { BsClockHistory } from "react-icons/bs"

const acessData = [
    ["10/12/2021", "Jhelison Uchoa", "Orçamento", "Adicionado"],
    ["10/12/2021", "Mark", "Clientes", "Atualizado"],
    ["10/12/2021", "Mark", "Orçamento", "Deletado"],
    ["10/12/2021", "Mark", "Vendas", "Atualizado"],
    ["10/12/2021", "Mark", "Clientes", "Adicionado"],
    ["10/12/2021", "Mark", "Clientes", "Deletado"],
]

export default (props) => {
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
                    <div class="alert-custom alert-success-custom">{text}</div>
                )
            }
            if (text === "Atualizado") {
                return <div class="alert-custom alert-alert-custom">{text}</div>
            }
            return <div class="alert-custom alert-danger-custom">{text}</div>
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
            title="Log de Acessos"
            subtitle="Veja tudo que foi feito pelo aplicativo"
            icon={<BsClockHistory />}
        >
            <div className="small-card mb-3 d-flex justify-content-end"></div>
            <div className="card user-card">{buildTable()}</div>
        </Main>
    )
}
