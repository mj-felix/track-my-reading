import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import AuthenticationButton from './authentication-button.component';

const Header = () => {
    const { isLoading } = useAuth0();

    return (
        <header>
            {isLoading ? 'Loading ...' :
                <>

                    <>
                        <NavLink to="/books/reading">Reading</NavLink>{' '}
                        <NavLink to="/books/added">Not Started</NavLink>{' '}
                        <NavLink to="/books/finished">Finished</NavLink>{' '}
                        <NavLink to="/user">User</NavLink>{' '}
                    </>

                    <AuthenticationButton />
                </>

            }
        </header>
    );
};

export default Header;