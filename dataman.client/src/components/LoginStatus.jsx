import {useContext, useState} from "react";
import {Button} from "@material-ui/core";
import axios from 'axios';
import UserContext from "../context/UserContext";
import { toast } from 'react-toastify';
toast.configure({position: toast.POSITION.BOTTOM_RIGHT});

export default function LoginStatus() {
    const [name, setName] = useState(null);
    const { user, setUser } = useContext(UserContext);

    const handleClick = (e) => {
        axios.get(`${process.env.REACT_APP_API_URL}/sessions/user`, {withCredentials: true}).then(res => {
            setName(res.data.email);
        })
    }

    const handleLogout = (e) => {
        axios.get(`${process.env.REACT_APP_API_URL}/sessions/logout`, {withCredentials: true}).then(res => {
            console.log(res.data);
            setName(res.data.email);
            setUser({user: null});
            toast.success('Logged out successfully');
        })
    }

    return (
        <div className={'form-stack'}>
            <p>{user.user}</p>
            <div>
                <Button color="primary" variant={"contained"} onClick={handleClick} >Check User</Button>
                <Button color="primary" variant={"contained"} onClick={handleLogout} >Logout</Button>
            </div>
        </div>
    )
}