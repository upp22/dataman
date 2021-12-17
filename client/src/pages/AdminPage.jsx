import {useContext, useEffect, useState} from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from 'react-router';

export function AdminPage() {
    let navigate = useNavigate();
    const [authState, setAuthState] = useState(false);

    // Validate user session - TODO: determine if necessary
    useEffect(() => {
        const getSession = async () => {
            const res =  await axios.get(`/sessions/user`, {withCredentials: true});
            setAuthState(!!res.data.email);
        }
        getSession();
    }, [])

    // Bit hacky
    if (!authState) {
        navigate('/');
    }

    return (
        <div>
            <h1>Admin</h1>
            <p>Welcome</p>
            {
                authState && <p>{authState}</p>
            }
        </div>
    );
}