import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const PublicRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <Route
            {...rest}
            render={
                (props) => {
                    return isLoading ? 'Loading ...' :

                        isAuthenticated ? (
                            <Redirect to='/books/reading' />
                        ) : (
                            <Component {...props} />
                        );

                }
            }
        />
    );
};

export default PublicRoute;