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
                <title>코딩팔레트</title>
                <link rel="shortcut icon" href="/favicon.png" />
                <link rel="shortcut icon" href="/favicon-32x32.png" sizes="32x32" />
                <link rel="shortcut icon" href="/favicon-48x48.png" sizes="48x48" />
                <link rel="shortcut icon" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="shortcut icon" href="/favicon-144x144.png" sizes="144x144" />
                <meta name="description" content="좋은 개발자를 꿈꾸는 코딩팔레트 입니다" />
                <meta property="og:description" content="좋은 개발자를 꿈꾸는 코딩팔레트 입니다" />
                <meta property="og:image" content={'http://localhost:4000/favicon.png'} />
                <meta property="og:url" content={`https://codingpalette.com`} />
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
