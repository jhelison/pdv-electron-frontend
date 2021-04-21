import React from "react"
import Main from "../template/Main"

import { FiUsers } from "react-icons/fi"
import { FiEdit } from "react-icons/fi"
import { FiTrash } from "react-icons/fi"

const usersData = [
    [
        "10/12/2021",
        "Jhelison Gabriel Lima Uchoa Big Ttext",
        "Samsung",
        "Em espera",
    ],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Bloqueado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
]

export default (props) => {
    const buildTable = () => {
        return (
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">Data criação </th>
                        <th scope="col">Nome do perfil</th>
                        <th scope="col">Modelo to telefone</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-right">Ações</th>
                    </tr>
                </thead>

                {buildTableRows()}
            </table>
        )
    }

    const buildTableRows = () => {
        const getStatusIndicator = (status) => {
            if (status === "Liberado") {
                return <status-indicator positive></status-indicator>
            }
            if (status === "Em espera") {
                return <status-indicator pulse></status-indicator>
            }
            return <status-indicator negative></status-indicator>
        }

        return (
            <tbody>
                {usersData.map((val, index) => {
                    return (
                        <tr key={index}>
                            <td>{val[0]}</td>
                            <td>{val[1]}</td>
                            <td>{val[2]}</td>
                            <td>
                                <div className="d-flex">
                                    <div className="mr-3">
                                        {getStatusIndicator(val[3])}
                                    </div>
                                    <span>{val[3]}</span>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline-warning btn-sm mr-1"
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        <FiTrash />
                                    </button>
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
            title="Usuários"
            subtitle="Gerencie quem pode acessar o aplicativo"
            icon={<FiUsers />}
        >
            <div className="card user-card">{buildTable()}</div>
        </Main>
    )
}
