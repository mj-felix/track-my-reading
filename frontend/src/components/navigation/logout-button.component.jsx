import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="logout"
            sx={{ ml: 2 }}
            onClick={() =>
                logout({
                    returnTo: window.location.origin,
                })
            }
        >
            <PowerSettingsNewIcon />
        </IconButton>
    );
};

export default LogoutButton;