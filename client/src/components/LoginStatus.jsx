import {useContext, useState} from "react";
import {Button} from "@material-ui/core";
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure({position: toast.POSITION.BOTTOM_RIGHT});

export default function LoginStatus() {
    const [user, setUser] = useState({});

    const handleClick = (e) => {
        axios.get(`/sessions/user`, {withCredentials: true}).then(res => {
            console.log(res);
            setUser({email: res.data.email});
        })
    }

    const handleLogout = (e) => {
        axios.get(`/sessions/logout`, {withCredentials: true}).then(res => {
            console.log(res.data);

            //setUser({user: null});
            toast.success('Logged out successfully');
        })
    }

    return (
        <div className={'form-stack'}>
            <p>{user.email}</p>
            <div>
                <Button color="primary" variant={"contained"} onClick={handleClick} >Check User</Button>
                <Button color="primary" variant={"contained"} onClick={handleLogout} >Logout</Button>
            </div>
        </div>
    )
}