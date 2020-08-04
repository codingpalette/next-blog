import React from 'react';
import Link from 'next/link';

import styled from '@emotion/styled';

import DateRangeIcon from '@material-ui/icons/DateRange';


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
        height: 250px;
        background-color: #fff;
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
    word-break: break-all;
`;


const PostList = ({ post }) => {

    const today  = new Date(post.createdAt)
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    const yyyy = today.getFullYear();
    if(mm<10) {
        mm='0'+mm
    }
    if(dd<10) {
        dd='0'+dd
    }

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

                                </div>
                                <div className="icon_box">
                                    <DateRangeIcon fontSize="small" />
                                    <span>작성일 {`${yyyy}-${mm}-${dd}`}</span>
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
