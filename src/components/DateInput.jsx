import React, { forwardRef } from "react"
import DatePicker from "react-datepicker"
import ptBR from "date-fns/locale/pt-BR"
import moment from 'moment'
import MaskedInput from "react-text-mask"

const DateInput = ({ ...inputProps }) => {
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <input
            className="form-control form-control-sm"
            type="text"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            onClick={onClick}
            ref={ref}
            placeholder="00/00/0000"
            value={
                value
            }
        />
    ))

    const updateDate = (value) => {
        var fieldValue = moment(value).isValid() ? moment(value).format("DD/MM/YYYY") : value
        return fieldValue
    }

    return (
        <DatePicker
            customInput={<CustomInput/>}
            locale={ptBR}
            todayButton="Hoje"
            type="text"
            dateFormat="dd/MM/yyyy"
            {...inputProps}
        />
    )
}

export default DateInput