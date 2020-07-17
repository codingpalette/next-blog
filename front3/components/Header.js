import React, {useState, useCallback, useEffect} from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import useToggle from "../hooks/useToggle";
import {useDispatch, useSelector} from 'react-redux';
import {LOG_OUT_REQUEST} from "../reducers/user";
import styled from '@emotion/styled';
import LoginForm from "./LoginForm";


import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';




const TopHeader = styled.div`
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    order: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 0 1rem;
    box-sizing: border-box;
    
    border-bottom: 1px solid #edf1f7;
    & h1{
        
    }
    @media (min-width: 1024px) {
    
    }

`;

const BtmHeader = styled.div`
    position: sticky;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    margin-top: auto;
    background-color: #fff;
    box-sizing: border-box;
    order: 2;
    border-top: 1px solid #edf1f7;
    z-index: 40;
    & ul{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
    @media (min-width: 1024px) {
        order: 0;
        width: 250px;
        height: calc(100% - 50px);
        border-top: none;
        border-right: 1px solid #edf1f7;
        padding-top: 40px;
        box-sizing: border-box;
        & ul{
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
        }
    }  
`;

const List = styled.li`
    width: 25%;
    height: 100%;
    color : ${props =>
        props.path ? '#536DFE' : '#000'
    };
    & :hover{
        opacity: 0.75;
    }
    
    & a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    
    
    & .text{
        display: none;
    }
    @media (min-width: 1024px) {
        width: 100%;
        height: 40px;
        & + li{
            margin-top: 1.5rem;
        }
        & a{
            padding: 0 1rem;
            box-sizing: border-box;
            justify-content: flex-start;
        }
        & .text{
            display: block;
            margin-left: 0.5rem;
            //font-weight: bold;
        }
    }

`;

const Header = ({ router }) => {
    const dispatch = useDispatch();
    const {me, logOutDone} = useSelector((state) => state.user);
    
    const [loginmodalOpen, onClickModalOpen, onClickModalClose] = useToggle(false);


    const [userMenu, setUserMenu] = useState(null);
    const onClickUserMenuOpen = useCallback((event) => {
        setUserMenu(event.currentTarget);
    }, []);
    const onClickUserMenuClose = useCallback(() => {
        setUserMenu(null);
    }, []);

    const onClickUserLogOut = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        })
    }, []);

    useEffect(() => {
        if (logOutDone) {
            setUserMenu(null);
        }
    }, [logOutDone])

    return (
        <>
            <TopHeader>

                <h1>
                    <Link href='/'>
                        <a>CodingPalette</a>
                    </Link>
                </h1>
                {me ? (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={onClickUserMenuOpen}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            anchorEl={userMenu}
                            keepMounted
                            open={Boolean(userMenu)}
                            onClose={onClickUserMenuClose}
                        >
                            <MenuItem onClick={onClickUserMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={onClickUserMenuClose}>My account</MenuItem>
                            <MenuItem onClick={onClickUserLogOut}>Logout</MenuItem>
                            {me.level === 0 && (
                                <MenuItem>
                                    <Link href="/admin/post_list">
                                        <a>
                                            관리자
                                        </a>
                                    </Link>
                                </MenuItem>
                            )}
                        </Menu>

                    </div>
                ) : (
                    <div>
                        <Button color="inherit" onClick={onClickModalOpen}>Login</Button>
                        <LoginForm modalOpen={loginmodalOpen} closeEvent={onClickModalClose}/>
                    </div>

                )}

            </TopHeader>
            <BtmHeader>
                <ul>
                    <List path={router.pathname === '/' || router.pathname.indexOf('/post/') !== -1}>
                        <Link href='/'>
                            <a>
                                <HomeIcon />
                                <span className="text">
                                    메인
                                </span>
                            </a>
                        </Link>
                    </List>
                    <List path={router.pathname === '/asd'}>
                        <Link href='/'>
                            <a>
                                <DashboardIcon />
                                <span className="text">
                                    게시판
                                </span>
                            </a>
                        </Link>
                    </List>
                    <List path={router.pathname === '/sdf'}>
                        <Link href='/'>
                            <a>
                                <ChatIcon />
                                <span className="text">
                                    채팅
                                </span>
                            </a>
                        </Link>
                    </List>
                    <List path={router.pathname === '/fsdf'}>
                        <Link href='/'>
                            <a>
                                <SettingsIcon />
                                <span className="text">
                                    설정
                                </span>
                            </a>
                        </Link>
                    </List>
                </ul>
            </BtmHeader>
        </>
    )
}

export default withRouter(Header);