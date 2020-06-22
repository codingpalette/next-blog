import React from 'react';
import { Container } from './styles'

const ContentBody = ({ children }) => {
    return(
        <>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default ContentBody;