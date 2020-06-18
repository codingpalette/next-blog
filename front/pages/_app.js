import React from 'react';
import Head from 'next/head';
import { GlobalStyle } from '../components/GlobalStyle'

const App = ({Component}) => {
    return(
        <>
            <GlobalStyle />
            <Head>
                <meta charSet="utf-8" />
                <title>CodingPalette</title>
            </Head>
            <Component />
        </>
    )
}

export default App;