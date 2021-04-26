import React, { useState, useEffect, forwardRef } from "react"
import Main from "../template/Main"

import { BsClockHistory } from "react-icons/bs"

import Select from "react-select"
import DatePicker, { registerLocale } from "react-datepicker"
import ptBR from "date-fns/locale/pt-BR"

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
    })
}


const acessData = [
    ["10/12/2021", "Jhelison Uchoa", "Orçamento", "Adicionado"],
    ["10/12/2021", "Jhelison Uchoa", "Orçamento", "Visualizado"],
    ["10/12/2021", "Mark", "Clientes", "Atualizado"],
    ["10/12/2021", "Mark", "Orçamento", "Deletado"],
    ["10/12/2021", "Mark", "Vendas", "Atualizado"],
    ["10/12/2021", "Mark", "Clientes", "Adicionado"],
    ["10/12/2021", "Mark", "Clientes", "Deletado"],
]

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
]

export default (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <input className="form-control" type="text" onClick={onClick} ref={ref} placeholder="Default input" value={startDate.getDay() + "/" + startDate.getMonth() + "/" + startDate.getFullYear()}/>
    ))

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
                    <tr>
                        <th scope="col" className="w-15">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                customInput={<ExampleCustomInput />}
                                locale={ptBR}
                                todayButton="Hoje"
                            />
                        </th>
                        <th scope="col">
                            <Select options={options} styles={customStyles} isMulti/>
                        </th>
                        <th scope="col">
                            <Select options={options} styles={customStyles} isMulti/>
                        </th>
                        <th scope="col">
                            <Select options={options} styles={customStyles} isMulti/>
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
            if (text === "Visualizado") {
                return (
                    <div className="alert-custom alert-info-custom">{text}</div>
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
            title="Log de Acessos"
            subtitle="Veja tudo que foi feito pelo aplicativo"
            icon={<BsClockHistory />}
        >
            <div className="card user-card">{buildTable()}</div>
        </Main>
    )
}
