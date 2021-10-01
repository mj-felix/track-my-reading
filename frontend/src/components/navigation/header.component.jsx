import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import AuthenticationButton from './authentication-button.component';

import { Container, AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookIcon from '@mui/icons-material/Book';
import AccountIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const { isLoading } = useAuth0();
    const location = useLocation();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsDrawerOpen(isOpen);
    };

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
                                        onClick={toggleDrawer(true)}
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

                    <Drawer
                        anchor={'left'}
                        open={isDrawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary={'Books'}
                                        primaryTypographyProps={{
                                            fontSize: 18,
                                            fontWeight: 'medium'
                                        }}
                                    />
                                </ListItem>
                                <ListItem button component={Link} to='/books/reading'>
                                    <ListItemIcon>
                                        <MenuBookIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Reading'} />
                                </ListItem>
                                <ListItem button component={Link} to='/books/added'>
                                    <ListItemIcon>
                                        <LibraryBooksIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Not Started'} />
                                </ListItem>
                                <ListItem button component={Link} to='/books/finished'>
                                    <ListItemIcon>
                                        <BookIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Finished'} />
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button component={Link} to='/user'>
                                    <ListItemIcon>
                                        <AccountIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'My Account'} />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </>
            }
        </header>
    );
};

export default Header;