import React from 'react';
import { DivTag } from './styles'

const Content = ({children}) => {
    return(
        <>
            <DivTag>
                {children}
            </DivTag>
        </>
    )
};

export default Content;