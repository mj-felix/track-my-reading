import React from 'react';
import { useSelector } from 'react-redux';
import JSONPretty from 'react-json-pretty';

const UserPage = () => {

    const auth = useSelector(state => state.auth);
    const { user, loading, error: authError } = auth;

    return (
        <>
            <h1>User Details:</h1>
            {loading && 'Loading...'}
            {authError && <h2>{authError}</h2>}
            {user && <JSONPretty data={user} />}
        </>
    );
};

export default UserPage;