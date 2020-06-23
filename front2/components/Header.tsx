import React, { useState, useCallback } from 'react';
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled';
import LoginForm from "./LoginForm";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            fontSize:'1rem',
        },
    }),
);

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
    const { logInDone } = useSelector((state) => state.user);
    const classes = useStyles();
    const [opne , setOpen] = useState(false);
    const [modalOpen , setModalOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onClickModalOpen = useCallback(() => {
        setModalOpen(true)
    }, [])

    const onClickModalClose = useCallback(() => {
        setModalOpen(false)
    }, [])

    return(
        <>
            <AppBar position="sticky" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h1" className={classes.title}>
                        CodingPaletee
                    </Typography>
                    {logInDone ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    ) : (
                        <Button color="inherit" onClick={onClickModalOpen}>Login</Button>
                    )}


                </Toolbar>
                <LoginForm modalOpen={modalOpen} closeEvent={onClickModalClose} />
                <Drawer anchor="left" open={opne} onClose={handleDrawerClose} >
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
                    </DrawrBox>
                </Drawer>
            </AppBar>

        </>
    )
}

export default Header;