import React from 'react'
import Head from 'next/head';
import {GlobalStyle} from '../components/GlobalStyle';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import wrapper from '../store/configureStore';


const App = ({Component}) => {

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        main: '#536DFE',
                    }
                },
            }),
        [],
    );

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>CodingPalette</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
                <link href="//cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/atom-one-light.min.css"/>


            </Head>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <CssBaseline/>
                <Component/>
            </ThemeProvider>
        </>
    )
}

export default wrapper.withRedux(App);