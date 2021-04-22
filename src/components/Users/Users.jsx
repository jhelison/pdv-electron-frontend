import React from "react"
import Main from "../template/Main"

import { FiUsers } from "react-icons/fi"
import { FiEdit } from "react-icons/fi"
import { FiTrash } from "react-icons/fi"

import { Modal } from "bootstrap"

var editUserModal = null
var deleteUserModal = null

const usersData = [
    [
        "10/12/2021",
        "Jhelison Gabriel Lima Uchoa Big Ttext even bigger!",
        "Samsung Big text samsung even bigger!",
        "Em espera",
    ],
    ["10/12/2021", "Mark", "Otto", "Liberado"],
    ["10/12/2021", "Mark", "Otto", "Bloqueado"],
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
                        <th scope="col" className="text-right">
                            Ações
                        </th>
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
                                        onClick={showEditUserModal}
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={showDeleteUserModal}
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

    //User Edit modal functions
    const showEditUserModal = () => {
        editUserModal = new Modal(document.getElementById("edit-user-modal"))
        editUserModal.show()
    }
    const hideEditUserModal = () => {
        editUserModal.hide()
    }

    //User delete modal funcions
    const showDeleteUserModal = () => {
        deleteUserModal = new Modal(document.getElementById("delete-user-modal"))
        deleteUserModal.show()
    }
    const hideDeleteUserModal = () => {
        deleteUserModal.hide()
    }

    return (
        <Main
            title="Usuários"
            subtitle="Gerencie quem pode acessar o aplicativo"
            icon={<FiUsers />}
        >
            <div className="card user-card">{buildTable()}</div>

            {/* Edit User modal */}
            <div className="modal fade" tabIndex="-1" id="edit-user-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h5 className="modal-title">Alteração de usuário</h5>
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
                                className="btn btn-secondary btn-sm"
                                onClick={hideEditUserModal}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-success btn-sm"
                            >
                                Salvar alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit user modal end */}

            {/* Delete User modal */}
            <div className="modal fade" tabIndex="-1" id="delete-user-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h5 className="modal-title">Exclusão</h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                Você tem certeza que deseja excluir o usuário?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={hideDeleteUserModal}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete User modal end */}
        </Main>
    )
}
