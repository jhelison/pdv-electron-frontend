import React from 'react'
import Main from '../template/Main'

import { FiUsers } from "react-icons/fi"

export default props => {
    return (
        <Main title="Users" subtitle="Gerencie quem pode acessar o aplicativo" icon={<FiUsers />}>
        </Main>
    )
}