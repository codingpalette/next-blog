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
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
            </Head>
            <Component />
        </>
    )
}

export default App;