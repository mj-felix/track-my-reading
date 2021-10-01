import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import AuthenticationButton from './authentication-button.component';

import { Container, AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const { isLoading } = useAuth0();

    return (
        <header>
            {isLoading ? 'Loading ...' :
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Container maxWidth='md' pt='10'>
                                <Toolbar disableGutters={true}>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        TrackMyReading
                                    </Typography>
                                    <AuthenticationButton />
                                </Toolbar>
                            </Container>
                        </AppBar>
                    </Box>

                    <NavLink to="/books/reading">Reading</NavLink>{' '}
                    <NavLink to="/books/added">Not Started</NavLink>{' '}
                    <NavLink to="/books/finished">Finished</NavLink>{' '}
                    <NavLink to="/user">User</NavLink>{' '}
                </>

            }
        </header>
    );
};

export default Header;