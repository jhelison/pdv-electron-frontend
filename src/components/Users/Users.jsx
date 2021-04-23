import React from "react"
import Main from "../template/Main"

import { FiUsers } from "react-icons/fi"
import { FiEdit } from "react-icons/fi"
import { FiTrash } from "react-icons/fi"
import { FiLock } from "react-icons/fi"
import { FiUnlock } from "react-icons/fi"

import { Modal } from "bootstrap"

var editUserModal = null
var deleteUserModal = null

const usersData = [
    [
        "10/12/2021",
        "Jhelison Gabriel Lima Uchoa Big Ttext even bigger",
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

        const getLockButton = (status) => {
            if (status === "Liberado" ) {
                return (
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm mr-1"
                    >
                        <FiLock />
                    </button>
                )
            }
            return (
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm mr-1"
                >
                    <FiUnlock />
                </button>
            )
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
                                    {getLockButton(val[3])}
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
        deleteUserModal = new Modal(
            document.getElementById("delete-user-modal")
        )
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
            <div className="card mb-3"></div>

            <div className="card user-card">{buildTable()}</div>

            {/* Edit User modal */}
            <div className="modal fade" tabIndex="-1" id="edit-user-modal">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Alteração de usuário - dced34dcb17e39f4 (Android
                                - samsung)
                            </h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                <form>
                                    <h6>Informações Basicas</h6>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEmail">
                                                Nome do perfil
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-sm"
                                                id="inputEmail"
                                                placeholder="Perfil"
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="inputState">
                                                Vendedor
                                            </label>
                                            <select
                                                id="inputState"
                                                className="form-control form-control-sm"
                                            >
                                                <option selected>
                                                    Escolha
                                                </option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEmail">
                                                Data Admissional
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-sm"
                                                id="inputEmail"
                                                placeholder="Data"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <h6>Informações Detalhadas</h6>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputEmail">
                                                Salário
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-sm"
                                                id="inputEmail"
                                                placeholder="R$ 00.00"
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputEmail">
                                                Objetivo comissão
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-sm"
                                                id="inputEmail"
                                                placeholder="R$ 00.00"
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputEmail">
                                                Multi. comissão
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-sm"
                                                id="inputEmail"
                                                placeholder="1.00"
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputEmail">
                                                Desconto máximo
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-sm"
                                                id="inputEmail"
                                                placeholder="0.00 %"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <h6>Informações Adicionais</h6>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="gridCheck1"
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="gridCheck1"
                                                >
                                                    Tem acesso
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="gridCheck"
                                                />
                                                <label
                                                    class="form-check-label"
                                                    for="gridCheck"
                                                >
                                                    Pode ver todos os orçamentos
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                    <div className="modal-content text-dark">
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
