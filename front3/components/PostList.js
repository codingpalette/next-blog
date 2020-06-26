import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import Router from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import { WRITE_MODE_MODIFY } from "../reducers/post";
import styled from '@emotion/styled';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";




const Content = styled.div`
    
`;

const CardBox = styled(Card)`
    max-width: 100%;
    width: 100%;
`;

const CardActionsBox = styled(CardActions)`
    flex-wrap: wrap;
    & a {
        display: inline-block;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    & a div{
        cursor: pointer;
    }
`;

const PostList = ({ post }) => {


    const { me } = useSelector((state) => state.user);

    const [postMenu, setPostMenu] = useState(null);
    const onClickPostMenuOpen = useCallback((event) => {
        setPostMenu(event.currentTarget);
    }, []);
    const onClickPostMenuClose = useCallback(() => {
        setPostMenu(null);
    }, []);

    const onClickPostModify = useCallback((id) => () => {
        Router.push(`/write?id=${id}`)
    }, [])

    return(
        <>
            <Grid item xs={12}>
                <Content>
                    <CardBox variant="outlined">
                        <CardHeader
                            action={
                                me && me.level === 1 && (
                                    <>
                                        <IconButton aria-label="settings" onClick={onClickPostMenuOpen}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={postMenu}
                                            keepMounted
                                            open={Boolean(postMenu)}
                                            onClose={onClickPostMenuClose}
                                        >
                                            <MenuItem onClick={ onClickPostModify(post.id)}>수정하기</MenuItem>
                                            <MenuItem onClick={onClickPostMenuClose}>삭제하기</MenuItem>
                                        </Menu>
                                    </>
                                )
                            }
                            title={ <Link href="/post/[id]" as={`/post/${post.id}`}><a>{post.title}</a></Link> }
                            subheader={post.date}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.description}
                            </Typography>
                        </CardContent>
                        <CardActionsBox disableSpacing>
                            {post.tags.map((v, i) => (
                                <Link href="/" key={i}>
                                    <a>
                                        <Chip label={v} variant="outlined" />
                                    </a>
                                </Link>
                            ))}

                        </CardActionsBox>
                    </CardBox>
                </Content>
            </Grid>
        </>
    )
}

export default PostList;