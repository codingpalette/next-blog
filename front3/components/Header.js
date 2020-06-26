import React, {useState, useCallback, useEffect} from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import useToggle from "../hooks/useToggle";
import {useDispatch, useSelector} from 'react-redux';
import {LOG_OUT_REQUEST} from "../reducers/user";
import styled from '@emotion/styled';
import LoginForm from "./LoginForm";

import {createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            fontSize: '1.5rem',
            textAlign: 'center'
        },
    }),
);

const TopHeader = styled.div`
    width: 100%;
    order: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 1rem;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #edf1f7;
    & h1{
        
    }
    @media (min-width: 1024px) {
    
    }

`;

const BtmHeader = styled.div`
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
        props.path ? '#536DFE' : 'rgb(95, 108, 145);'
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
            font-weight: bold;
        }
    }

`;


// const HeaderBox = styled.header`
//     width: 100%;
//     min-height: 50px;
//     display: flex;
//     align-items: center;
//
// `;

const DrawrBox = styled.div`
    width: 250px;
`;

const DrawerTitle = styled.div`
    padding: 8px 16px;
    & strong{
        display: block;
    }
    & span{
        display: block;
        color: rgba(0,0,0,0.6);
        font-size: 0.75rem;
    }
`;


const Header = ({ router }) => {
    const dispatch = useDispatch();
    const {me, logOutDone} = useSelector((state) => state.user);

    const classes = useStyles();

    const [drawerOpne, onClickDrawerOpen, onClickDrawerClose] = useToggle(false);
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
                            {me.level === 1 && (
                                <MenuItem>
                                    <Link href="/write">
                                        <a>
                                            포스트 작성
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
                    <List path={router.pathname === '/'}>
                        <Link href='/'>
                            <a>
                                <HomeIcon />
                                <span className="text">
                                    Home
                                </span>
                            </a>
                        </Link>
                    </List>
                    <List path={router.pathname === '/asd'}>
                        <Link href='/'>
                            <a>
                                <HomeIcon />
                                <span className="text">
                                    Home
                                </span>
                            </a>
                        </Link>
                    </List>
                    <List path={router.pathname === '/sdf'}>
                        <Link href='/'>
                            <a>
                                <HomeIcon />
                                <span className="text">
                                    Home
                                </span>
                            </a>
                        </Link>
                    </List>
                    <List path={router.pathname === '/fsdf'}>
                        <Link href='/'>
                            <a>
                                <HomeIcon />
                                <span className="text">
                                    Home
                                </span>
                            </a>
                        </Link>
                    </List>
                </ul>


                {/*    <Drawer anchor="left" open={drawerOpne} onClose={onClickDrawerClose}>*/}
                {/*        <DrawrBox>*/}
                {/*            <DrawerTitle>*/}
                {/*                <div>*/}
                {/*                    <strong>CODINGPALETTE</strong>*/}
                {/*                    <span>v0.01</span>*/}
                {/*                </div>*/}
                {/*            </DrawerTitle>*/}
                {/*            <Divider/>*/}
                {/*            <List component="nav" aria-label="secondary mailbox folders">*/}
                {/*                <ul>*/}
                {/*                    <li>*/}
                {/*                        <Link href="/">*/}
                {/*                            <a>*/}
                {/*                                <ListItem button>*/}
                {/*                                    <ListItemText primary="HOME"/>*/}
                {/*                                </ListItem>*/}
                {/*                            </a>*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                    <li>*/}
                {/*                        <Link href="/about">*/}
                {/*                            <a>*/}
                {/*                                <ListItem button>*/}
                {/*                                    <ListItemText primary="ABOUT"/>*/}
                {/*                                </ListItem>*/}
                {/*                            </a>*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </List>*/}
                {/*            <Divider/>*/}
                {/*            {me && me.level === 1 && (*/}
                {/*                <List component="nav" aria-label="secondary mailbox folders">*/}
                {/*                    <ul>*/}
                {/*                        <li>*/}
                {/*                            <Link href="/write">*/}
                {/*                                <a>*/}
                {/*                                    <ListItem button>*/}
                {/*                                        <ListItemText primary="포스트 작성"/>*/}
                {/*                                    </ListItem>*/}
                {/*                                </a>*/}
                {/*                            </Link>*/}
                {/*                        </li>*/}
                {/*                    </ul>*/}
                {/*                </List>*/}
                {/*            )}*/}
                {/*        </DrawrBox>*/}
                {/*    </Drawer>*/}
                {/*</Container>*/}
            </BtmHeader>
        </>
    )
}

export default withRouter(Header);