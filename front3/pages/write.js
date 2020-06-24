import React, { useState, useCallback, useRef, useEffect } from 'react';


import Layout from '../components/Layout';
import useInput from "../hooks/useInput";
import styled from '@emotion/styled';

import Editor from '../components/Editor'


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";

const PaperBox = styled(Paper)`
    padding: 1rem;
    box-sizing: border-box;
`;

const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding 제거 */
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;


const Write = () => {
    const [title, onChangeTitle] = useInput('');






    const handleEditor = (value) => {

    }

    const onSubmit = useCallback((e) =>{
        e.preventDefault()
    }, [])

    return(
        <>
            <Layout>
                <Grid container>
                    <Grid item xs={12}>
                        <PaperBox>
                            <Typography variant="h5" component="h2" gutterBottom>
                                포스트 작성
                            </Typography>
                            <form onSubmit={onSubmit}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Tilte"
                                    type="text"
                                    fullWidth
                                    value={title}
                                    onChange={onChangeTitle}
                                />
                                <div>
                                    <Editor />
                                </div>

                            </form>
                        </PaperBox>
                    </Grid>
                </Grid>
            </Layout>
        </>
    )
}

export default Write