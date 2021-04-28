import React, { useEffect, useState } from "react"
import Main from "../template/Main"

import { FiUsers } from "react-icons/fi"
import { FiEdit } from "react-icons/fi"
import { FiTrash } from "react-icons/fi"
import { FiLock } from "react-icons/fi"
import { FiUnlock } from "react-icons/fi"
import { FiPlus } from "react-icons/fi"

import { Modal } from "bootstrap"

import { CurrencyInput, PercentualInput } from "../MaskedInputs"
import DateInput from "../DateInput"

import QRCode from "react-qr-code"
import Axios from "axios"
import moment from "moment"
import "moment/locale/pt-br"
moment.locale("pt-br")
import DatePicker, { registerLocale } from "react-datepicker"
import ptBR from "date-fns/locale/pt-BR"

var editUserModal = null
var deleteUserModal = null
var newUserModal = null

const url = "http://localhost:5000/"

export default (props) => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [sellers, setSellers] = useState([])

    useEffect(() => {
        getUsers()
        getSellers()
    }, [])

    //Update select user on edituser
    useEffect(() => {}, [setSelectedUser])

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
            if (status) {
                return <status-indicator positive></status-indicator>
            } else {
                return <status-indicator negative pulse></status-indicator>
            }
        }

        const getLockButton = (user) => {
            if (user.flag_have_acess) {
                return (
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm mr-1"
                        onClick={() => {
                            changeUserAcess(user)
                        }}
                    >
                        <FiLock />
                    </button>
                )
            }
            return (
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm mr-1"
                    onClick={() => {
                        changeUserAcess(user)
                    }}
                >
                    <FiUnlock />
                </button>
            )
        }

        return (
            <tbody>
                {users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{moment(user.insert_date).fromNow()}</td>
                            <td>{user.profile_name}</td>
                            <td>{user.phone_model}</td>
                            <td>
                                <div className="d-flex">
                                    <div className="mr-3">
                                        {getStatusIndicator(
                                            user.flag_have_acess
                                        )}
                                    </div>
                                    <span>
                                        {user.flag_have_acess
                                            ? "Liberado"
                                            : "Bloqueado"}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex justify-content-end">
                                    {getLockButton(user)}
                                    <button
                                        type="button"
                                        className="btn btn-outline-warning btn-sm mr-1"
                                        onClick={() => {
                                            setSelectedUser(user)
                                            showEditUserModal()
                                        }}
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {
                                            setSelectedUser(user)
                                            showDeleteUserModal()
                                        }}
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

    //New user modal functions
    const showNewUserModal = () => {
        newUserModal = new Modal(document.getElementById("new-user-modal"))
        newUserModal.show()
    }
    const hideNewUserModal = () => {
        newUserModal.hide()
    }

    //Axios functions
    const getUsers = async () => {
        try {
            const res = await Axios.get(url + "users")
            setUsers(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteUser = async (user) => {
        try {
            const res = await Axios.delete(url + "user", {
                data: {
                    id: user.id,
                },
            })
            getUsers()
            hideDeleteUserModal()
        } catch (error) {
            console.log(error)
        }
    }
    const changeUserAcess = async (user) => {
        try {
            const res = await Axios.put(url + "user", {
                id: user.id,
                content: {
                    flag_have_acess: !user.flag_have_acess,
                },
            })
            getUsers()
        } catch (error) {
            console.log(error)
        }
    }
    const getSellers = async () => {
        try {
            const res = await Axios.get(url + "sellers")
            setSellers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Main
            title="Usuários"
            subtitle="Gerencie quem pode acessar o aplicativo"
            icon={<FiUsers />}
        >
            <div className="small-card mb-3 d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-success btn-sm w-25 align-self-end"
                    onClick={showNewUserModal}
                >
                    Adicionar novo telefone <FiPlus />
                </button>
            </div>

            <div className="card user-card">{buildTable()}</div>

            {/* Edit User modal */}
            <div className="modal fade" tabIndex="-1" id="edit-user-modal">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Alteração de usuário - {selectedUser.id} (
                                {selectedUser.platform}-{" "}
                                {selectedUser.phone_model})
                            </h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form>
                                    <h6>Informações Basicas</h6>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEmail">
                                                Nome do perfil
                                            </label>
                                            <input
                                                className="form-control form-control-sm"
                                                placeholder="Perfil"
                                                value={
                                                    selectedUser.profile_name
                                                }
                                                onChange={(e) =>
                                                    setSelectedUser(
                                                        (oldState) => {
                                                            return {
                                                                ...oldState,
                                                                profile_name:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        }
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label>
                                                Vendedor
                                            </label>
                                            <select
                                                id="sellerSelection"
                                                className="form-control form-control-sm"
                                            >
                                                {sellers.map((val) => {
                                                    return (
                                                        <option
                                                            selected={
                                                                val.NOMEVENDED ===
                                                                selectedUser.nome_vend
                                                            }
                                                        >
                                                            {val.NOMEVENDED}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEmail">
                                                Data Admissional
                                            </label>
                                            <DateInput
                                                value={
                                                    selectedUser.admissional_date
                                                }
                                                onChange={(val) => {
                                                    setSelectedUser(
                                                        (oldState) => {
                                                            return {
                                                                ...oldState,
                                                                admissional_date: val,
                                                            }
                                                        }
                                                    )
                                                    console.log(val)
                                                }}
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
                                            <CurrencyInput
                                                className="form-control form-control-sm"
                                                placeholder="R$ 0.00"
                                                value={selectedUser.salary}
                                                onChange={(e) =>
                                                    setSelectedUser(
                                                        (oldState) => {
                                                            return {
                                                                ...oldState,
                                                                salary:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        }
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputEmail">
                                                Objetivo comissão
                                            </label>
                                            <CurrencyInput
                                                className="form-control form-control-sm"
                                                placeholder="R$ 0.00"
                                                value={
                                                    selectedUser.comission_objective
                                                }
                                                onChange={(e) =>
                                                    setSelectedUser(
                                                        (oldState) => {
                                                            return {
                                                                ...oldState,
                                                                comission_objective:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        }
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputEmail">
                                                Multi. comissão
                                            </label>
                                            <input
                                                className="form-control form-control-sm"
                                                placeholder="1.00"
                                                value={
                                                    selectedUser.comission_multiplier
                                                }
                                                onChange={(e) =>
                                                    setSelectedUser(
                                                        (oldState) => {
                                                            return {
                                                                ...oldState,
                                                                comission_multiplier:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        }
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputEmail">
                                                Desconto máximo
                                            </label>
                                            <PercentualInput
                                                className="form-control form-control-sm"
                                                placeholder="0.00 %"
                                                value={
                                                    selectedUser.max_discount
                                                }
                                                onChange={(e) =>
                                                    setSelectedUser(
                                                        (oldState) => {
                                                            return {
                                                                ...oldState,
                                                                max_discount:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        }
                                                    )
                                                }
                                                onBlur={() =>
                                                    parseFloat(
                                                        selectedUser.max_discount.substring(
                                                            0,
                                                            selectedUser
                                                                .max_discount
                                                                .length - 1
                                                        )
                                                    ) > 100
                                                        ? (selectedUser.max_discount = 100)
                                                        : null
                                                }
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <h6>Informações Adicionais</h6>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="gridCheck1"
                                                    checked={
                                                        selectedUser.flag_have_acess
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedUser(
                                                            (oldState) => {
                                                                return {
                                                                    ...oldState,
                                                                    flag_have_acess:
                                                                        e.target
                                                                            .checked,
                                                                }
                                                            }
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                >
                                                    Tem acesso
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="gridCheck"
                                                    checked={
                                                        selectedUser.flag_see_all_budgets
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedUser(
                                                            (oldState) => {
                                                                return {
                                                                    ...oldState,
                                                                    flag_see_all_budgets:
                                                                        e.target
                                                                            .checked,
                                                                }
                                                            }
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                >
                                                    Pode ver todos os orçamentos
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
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
                                onClick={() => {
                                    deleteUser(selectedUser)
                                }}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete User modal end */}

            {/* Add new user modal */}
            <div className="modal fade" tabIndex="-1" id="new-user-modal">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title">Novo usuário</h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div>
                                        <QRCode
                                            value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                            size={250}
                                        />
                                    </div>
                                    <span className="mr-5 ml-3 text-center">
                                        Ou insira manualmente
                                    </span>
                                    <ul>
                                        <li>Servidor=Teste</li>
                                        <li>IP=107.1.2.100:5000</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={hideNewUserModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add new user modal */}
        </Main>
    )
}
