import React from 'react'
import Main from '../template/Main'

import { FiInfo } from "react-icons/fi"

export default props => {
    return (
        <Main title="Sobre" subtitle="Quem fez o aplicativo" icon={<FiInfo />}>
        </Main>
    )
}