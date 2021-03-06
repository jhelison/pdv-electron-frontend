import React from 'react'
import Main from '../template/Main'

import { BsClockHistory } from "react-icons/bs"

export default props => {
    return (
        <Main title="Log de Acessos" subtitle="Tenha acesso a tudo que foi feito pelo aplicativo" icon={<BsClockHistory />}>
        </Main>
    )
}
