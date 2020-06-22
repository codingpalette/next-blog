import React from 'react';
import { Header } from './styles'

const ContentHeader = ({ children }) => {
    return(
        <>
            <Header>
                {children}
            </Header>
        </>
    )
}

export default ContentHeader;