import React, { useCallback, useState } from 'react';
import Link from "next/link";
import Router from "next/router";
import {useDispatch} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {REMOVE_POST_REQUEST} from "../reducers/post";




const PostTrList = ({post}) => {
    const dispatch = useDispatch();

    const [postMenu, setPostMenu] = useState(null);

    const onClickPostMenuOpen = useCallback((event) => {
        setPostMenu(event.currentTarget);
    }, []);

    const onClickPostMenuClose = useCallback(() => {
        setPostMenu(null);
    }, []);

    const onClickPostModify = useCallback((id) => () => {
        Router.push(`/write?id=${id}`)
    }, []);

    const onClickPostDelete = useCallback((id) => () => {
        dispatch({
            type : REMOVE_POST_REQUEST,
            data : id
        })
    }, [])


    return (
        <>
            <tr>
                <td>
                    <div>
                        <Link href="/post/[id]" as={`/post/${post.id}`} prefetch={false}>
                            <a>{post.title}</a>
                        </Link>
                    </div>
                </td>
                <td>
                    <div className="btn_box">
                        <>
                            <IconButton aria-label="settings" onClick={onClickPostMenuOpen}>
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                anchorEl={postMenu}
                                keepMounted
                                open={Boolean(postMenu)}
                                onClose={onClickPostMenuClose}
                            >
                                <MenuItem onClick={onClickPostModify(post.id)}>수정하기</MenuItem>
                                <MenuItem onClick={onClickPostDelete(post.id)}>삭제하기</MenuItem>
                            </Menu>
                        </>

                    </div>
                </td>
            </tr>
        </>
    )
}

export default PostTrList;