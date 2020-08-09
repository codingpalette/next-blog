import React, {useEffect} from 'react';
import {END} from 'redux-saga';
import axios from 'axios';

import styled from '@emotion/styled'
import Layout from '../components/Layout';
import ContentHeader from "../components/ContentHeader";
import wrapper from "../store/configureStore";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";

import hljs from 'highlight.js';

hljs.configure({
    languages: ['javascript', 'css', 'html', 'xml ', 'typescript'],
});


const ContentBody = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    & .content {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        padding: 1rem;
        box-sizing: border-box;
    }
    
    & pre {
        //font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
        //  'Courier New', monospace;
        font-size: 1rem;
        line-height: 1.6;
        overflow-x: auto;
        white-space: pre;
        margin: 0px 0px 1.5rem;
        padding: 1.5rem;
        //background: rgb(1, 22, 39);
        border-radius: 4px;
    }

`;

const Profile = () => {

    const updataPre = () => {
        document.querySelectorAll('pre').forEach(block => {
            hljs.highlightBlock(block);
        });
    };

    useEffect(() => {

        updataPre();

        return () => {
            updataPre();
        };
    }, []);

    return (
        <>
            <Layout>
                <ContentHeader title="프로필"/>
                <ContentBody>
                    <div className="content">
                        <pre>
{
`let me = {
    content: {
        name: '이성재',
        email: 'codingpalette@gamile.com',
        pages: [
            'https://codingpalette.com',
            'https://github.com/codingpalette'
        ]
    },
    Frontend: {
        html: true,
        css: true,
        javascript: [
            'Vanilla',
            'React',
            'Next',
            'Gatsby',
            'Svelte',
            'Sapper'
        ]
    },
    Backend: {
        node: [
            'Express',
            'Sequelize',
        ]
    },
    DevOps: {
        Cloud: {
            AWS: ['EC2'],
            ETC: ['Firebase']
        }
    },
    Database: {
        RDBMS: ['MySQL'],
        NoSQL: ['Firebase']
    },
}
`}
                        </pre>
                    </div>
                </ContentBody>

            </Layout>
        </>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    // console.log('context -->', context)
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });


    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});


export default Profile;