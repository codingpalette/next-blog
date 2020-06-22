import React from 'react';
import { GlobalStyle } from './GlobalStyle';

const AdminLayout = ({ children }) => {
    return (
        <>
            <GlobalStyle />
            <div>
                {children}
            </div>
        </>
    )
}

export default AdminLayout