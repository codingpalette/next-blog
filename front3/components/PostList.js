import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import Router from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import { WRITE_MODE_MODIFY } from "../reducers/post";
import styled from '@emotion/styled';


import DateRangeIcon from '@material-ui/icons/DateRange';
import LabelIcon from '@material-ui/icons/Label';


const ListBox = styled.li`
    position: relative;
    width: 100%;
    padding-left: 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    transition: 0.3s;
    
    &:hover{
        transform: translateY(-5px);
    }
    
    @media (min-width: 1024px) {
        width: 50%;
    }
    
    @media (min-width: 1280px) {
        width: 33.33%;
    }
    
    @media (min-width: 1600px) {
        width: 25%;
    }
    
    @media (min-width: 2000px) {
        width: 20%;
    }
    
    & .list_content{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        border-radius: 4px;
        height: 300px;
    }

`;

const CardHeader = styled.div`
    color: rgb(95, 108, 145);
    border-bottom: 1px solid #edf1f7;
    padding: 1rem;
    box-sizing: border-box;
    & .title_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & h2{
        font-weight: bold;
    }
    & .icon_box{
        display: flex;
        align-items: center;
        padding-top: 1rem;
        font-size: 0.5rem;
    }
    
    & .icon_box span{
        display: block;
        margin-left: 5px;
        margin-right: 1rem;
    }
`;

const CardBody = styled.div`
    padding: 1rem;
    box-sizing: border-box;
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
            <ListBox>
                <Link href="/post/[id]" as={`/post/${post.id}`}>
                    <a>
                        <div className="list_content">
                            <CardHeader>
                                <div className="title_box">
                                    <h2>
                                        {post.title}
                                    </h2>
                                    {/*{me && me.level === 1 && (*/}
                                    {/*    <>*/}
                                    {/*        <IconButton aria-label="settings" onClick={onClickPostMenuOpen}>*/}
                                    {/*            <MoreVertIcon />*/}
                                    {/*        </IconButton>*/}
                                    {/*        <Menu*/}
                                    {/*            anchorEl={postMenu}*/}
                                    {/*            keepMounted*/}
                                    {/*            open={Boolean(postMenu)}*/}
                                    {/*            onClose={onClickPostMenuClose}*/}
                                    {/*        >*/}
                                    {/*            <MenuItem onClick={ onClickPostModify(post.id)}>수정하기</MenuItem>*/}
                                    {/*            <MenuItem onClick={onClickPostMenuClose}>삭제하기</MenuItem>*/}
                                    {/*        </Menu>*/}
                                    {/*    </>*/}
                                    {/*)}*/}
                                </div>
                                <div className="icon_box">
                                    <DateRangeIcon fontSize="small" />
                                    <span>작성일 2020-06-10</span>
                                    <LabelIcon fontSize="small" />
                                    <span>카테고리 HTML</span>
                                </div>
                            </CardHeader>
                            <CardBody>
                                {post.description}
                            </CardBody>
                        </div>
                    </a>
                </Link>
            </ListBox>

        </>
    )
}

export default PostList;