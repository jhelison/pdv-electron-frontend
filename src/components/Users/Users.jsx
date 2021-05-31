import React, { useEffect, useState } from "react"
import Main from "../template/Main"

import { FiUsers } from "react-icons/fi"
import { FiEdit } from "react-icons/fi"
import { FiTrash } from "react-icons/fi"
import { FiLock } from "react-icons/fi"
import { FiUnlock } from "react-icons/fi"
import { FiPlus } from "react-icons/fi"

import { Modal } from "bootstrap"

import {
    CurrencyInput,
    PercentualInput,
    DecimalNumberInput,
} from "../MaskedInputs"
import DateInput from "../DateInput"

import QRCode from "react-qr-code"
import Axios from "axios"
import moment from "moment"
import "moment/locale/pt-br"
moment.locale("pt-br")
import DatePicker, { registerLocale } from "react-datepicker"
import ptBR from "date-fns/locale/pt-BR"

import { lastServerStatus } from "../../serverSingleton"

var editUserModal = null
var deleteUserModal = null
var newUserModal = null

const url = "http://localhost:5151/"

export default (props) => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [sellers, setSellers] = useState([])

    const [serverStatus, setServerStatus] = useState(lastServerStatus())

    useEffect(() => {
        getUsers()
        getSellers()

        setInterval(() => {
            setServerStatus(lastServerStatus())
        }, 300)
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
            if (status === null) {
                return <status-indicator pulse></status-indicator>
            } else if (status) {
                return <status-indicator positive></status-indicator>
            } else {
                return <status-indicator negative></status-indicator>
            }
        }

        const getLockButton = (user) => {
            if (user.flag_have_acess) {
                return (
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm mr-1"
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
                                        {user.flag_have_acess === null
                                            ? "Em espera"
                                            : user.flag_have_acess
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
                                            setSelectedUser(parseNumbers(user))
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
    const updateUser = async () => {
        var parsedUser = { ...selectedUser }
        if (!validadeEditUserForm()) {
            return
        }

        const sellerSelection = document.getElementById("sellerSelection")
        sellers.forEach((val) => {
            if (sellerSelection.value === val.NOMEVENDED) {
                parsedUser.cod_vend = val.CODVENDED
                parsedUser.nome_vend = val.NOMEVENDED
            }
        })

        parsedUser = parseNumbers(parsedUser)
        setSelectedUser(parsedUser)
        console.log(parsedUser)

        try {
            const res = await Axios.put(url + "user", {
                id: parsedUser.id,
                content: {
                    ...parsedUser,
                },
            })
            getUsers()
            hideEditUserModal()
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

    //Form validation
    const validadeEditUserForm = () => {
        const profileNameInput = document.getElementById("profileNameInput")
        const admissionalDate = document.getElementById("admissional_date")
        var isValid = true

        if (!profileNameInput.value.trim()) {
            profileNameInput.classList.add("is-invalid")
            isValid = false
        } else {
            profileNameInput.classList.remove("is-invalid")
        }

        if (
            !moment(admissionalDate.value, "DD/MM/YYYY").isValid() ||
            moment(admissionalDate.value, "DD/MM/YYYY").isAfter(moment())
        ) {
            admissionalDate.classList.add("is-invalid")
            isValid = false
        } else {
            admissionalDate.classList.remove("is-invalid")
        }

        return isValid
    }

    const parseNumbers = (user) => {
        var parsedUser = { ...user }
        const parseNumber = (val) => {
            if (val) {
                if (typeof val === "string") {
                    return parseFloat(
                        val
                            .replace(" %", "")
                            .replace("R$ ", "")
                            .replace(",", "")
                    ).toFixed(2)
                }
                return parseFloat(val)
            }
            return null
        }

        parsedUser.salary = parseNumber(parsedUser.salary)
        parsedUser.comission_objective = parseNumber(
            parsedUser.comission_objective
        )
        parsedUser.max_discount = parseNumber(parsedUser.max_discount)

        return parsedUser
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
                    className="btn btn-success btn-sm w-25 h-100 align-self-end"
                    onClick={showNewUserModal}
                >
                    Adicionar novo telefone
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
                                                id="profileNameInput"
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
                                            <label>Vendedor</label>
                                            <select
                                                id="sellerSelection"
                                                className="form-control form-control-sm"
                                            >
                                                {sellers.map((val) => {
                                                    return (
                                                        <option
                                                            key={val.CODVENDED}
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
                                                className="form-control form-control-sm"
                                                value={
                                                    selectedUser.admissional_date
                                                }
                                                id="admissional_date"
                                                onChange={(val) => {
                                                    setSelectedUser(
                                                        (oldState) => {
                                                            return {
                                                                ...oldState,
                                                                admissional_date: val,
                                                            }
                                                        }
                                                    )
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
                                            <DecimalNumberInput
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
                                                    for="gridCheck1"
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
                                                    for="gridCheck"
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
                                onClick={updateUser}
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
                                        {serverStatus ? (
                                            <QRCode
                                                value={JSON.stringify(
                                                    serverStatus.server_data
                                                )}
                                                size={250}
                                            />
                                        ) : null}
                                    </div>
                                    <span className="mr-5 ml-3 text-center">
                                        Ou insira manualmente
                                    </span>
                                    <ul>
                                        {serverStatus &&
                                            <React.Fragment>
                                            <li>{"Porta = " + serverStatus.server_data['port']}</li>
                                            <li>{"Chave de acesso = " + serverStatus.server_data['acess_code']}</li>
                                            </React.Fragment>
                                        }
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
