import React, { useCallback, useState } from 'react';
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Router from "next/router";




const PostTrList = ({post}) => {

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

    return (
        <>
            <tr>
                <td>
                    <div>
                        <Link href="/post/[id]" as={`/post/${post.id}`}>
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
                                <MenuItem onClick={onClickPostMenuClose}>삭제하기</MenuItem>
                            </Menu>
                        </>

                    </div>
                </td>
            </tr>
        </>
    )
}

export default PostTrList;