import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import useToggle from "../hooks/useToggle";
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from "../reducers/user";
import styled from '@emotion/styled';
import LoginForm from "./LoginForm";

import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



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
            fontSize:'1.5rem',
            textAlign:'center'
        },
    }),
);

const ContainerTag = styled.div`
    background-color: #fff;
    position: sticky;
    left: 0;
    top: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12); 
    box-sizing: border-box;
`;


const HeaderBox = styled.header`
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: center;
`;

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


const Header = () => {
    const dispatch = useDispatch();
    const { me, logOutDone } = useSelector((state) => state.user);

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
            type:LOG_OUT_REQUEST
        })
    }, []);

    useEffect(() => {
        if (logOutDone) {
            setUserMenu(null);
        }
    }, [logOutDone])

    return(
        <>
            <ContainerTag>
            <Container maxWidth="md">
                <HeaderBox>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onClickDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h1" className={classes.title}>
                        CodingPaletee
                    </Typography>
                    {me ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={onClickUserMenuOpen}
                            >
                                <AccountCircle  />

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
                            </Menu>
                        </div>
                    ) : (
                        <Button color="inherit" onClick={onClickModalOpen}>Login</Button>
                    )}
                </HeaderBox>
                <LoginForm modalOpen={loginmodalOpen} closeEvent={onClickModalClose} />

                <Drawer anchor="left" open={drawerOpne} onClose={onClickDrawerClose} >
                    <DrawrBox>
                        <DrawerTitle>
                            <div>
                                <strong>CODINGPALETTE</strong>
                                <span>v0.01</span>
                            </div>
                        </DrawerTitle>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ul>
                                <li>
                                    <Link href="/">
                                        <a>
                                            <ListItem button>
                                                <ListItemText primary="HOME" />
                                            </ListItem>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about">
                                        <a>
                                            <ListItem button>
                                                <ListItemText primary="ABOUT" />
                                            </ListItem>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </List>
                        <Divider />
                        { me && me.level === 1 && (
                            <List component="nav" aria-label="secondary mailbox folders">
                                <ul>
                                    <li>
                                        <Link href="/write">
                                            <a>
                                                <ListItem button>
                                                    <ListItemText primary="포스트 작성" />
                                                </ListItem>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </List>
                        )}
                    </DrawrBox>
                </Drawer>
            </Container>
            </ContainerTag>
        </>
    )
}

export default Header;