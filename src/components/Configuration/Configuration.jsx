import React from 'react'
import Main from '../template/Main'

import { FiSettings } from "react-icons/fi"


export default props => {
    return (
        <Main title="Configurações" subtitle="Acesse as principais configurações" icon={<FiSettings />}>
        </Main>
    )
}
