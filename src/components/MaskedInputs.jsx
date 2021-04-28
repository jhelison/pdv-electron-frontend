import React from "react"
import MaskedInput from "react-text-mask"
import createNumberMask from "text-mask-addons/dist/createNumberMask"

const currencyMaskOptions = {
    prefix: "R$ ",
    suffix: "",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ",",
    allowDecimal: true,
    decimalSymbol: ".",
    decimalLimit: 2,
    integerLimit: 6,
    allowNegative: false,
    allowLeadingZeroes: false,
}
const percentualMaskOption = {
    prefix: "",
    suffix: " %",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ",",
    allowDecimal: true,
    decimalSymbol: ".",
    decimalLimit: 2,
    integerLimit: 3,
    allowNegative: false,
    allowLeadingZeroes: false,
}

const CurrencyInput = ({ ...inputProps }) => {
    const currencyMask = createNumberMask(currencyMaskOptions)

    return <MaskedInput mask={currencyMask} {...inputProps} />
}

const PercentualInput = ({ ...inputProps }) => {
    const percentualMask = createNumberMask(percentualMaskOption)

    return <MaskedInput mask={percentualMask} {...inputProps} />
}

export { CurrencyInput, PercentualInput }
