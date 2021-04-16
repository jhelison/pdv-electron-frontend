import React from 'react'
import Main from '../template/Main'

import { FiHome } from "react-icons/fi"

export default props => {
    return (
        <Main title="Home" subtitle="Bem vindo, veja o que está acontecendo hoje" icon={<FiHome />}>
            <span>Home</span>
        </Main>
    )
}
