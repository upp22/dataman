import {Box, TextField} from "@material-ui/core";
import {Stack} from "@mui/material";
import "../styles/login.css";
import Register from "../components/Register";
import Login from "../components/Login";
import LoginStatus from "../components/LoginStatus";


export function LoginPage() {
    return (
        <div className={'login-page-wrapper'}>
            <Stack>
                <Login></Login>
                <Register></Register>
                <LoginStatus></LoginStatus>
            </Stack>
        </div>
    )
}