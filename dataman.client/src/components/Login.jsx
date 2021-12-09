import {Button, TextField} from "@material-ui/core";
import {useContext, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import UserContext from "../context/UserContext";
import { toast } from 'react-toastify';
toast.configure({position: toast.POSITION.BOTTOM_RIGHT});

export default function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // ------ Context ------
    const { user, setUser } = useContext(UserContext);
    // ---------------------

    const handleSubmit = () => {
        const allFieldsInput = [email, password].every(i => i);
        if (!allFieldsInput) {
            toast.error('All fields need to be filled');
            return;
        }

        const payload = {
            username: email,
            password: password
        }

        axios.post(`${process.env.REACT_APP_API_URL}/sessions/login`,payload, {withCredentials: true}).then(res => {
            if (res.data == 'Successfully Authenticated') {
                toast.success('Successfully logged in');
                setUser({user: email});
            } else {
                toast.warning('Unable to login');
            }
        }).catch(err => {
            console.log(err);
            toast.error('Error occured while logging in');
        })
    }

    return (
        <div className={"form-stack"}>
            <h6>Login</h6>
            <TextField id="email_id" label="email" variant="standard" type={"email"} onChange={(e) => setEmail(e.target.value)}/>
            <TextField id="password_id" label="password" variant="standard" type={"password"} onChange={(e) => setPassword(e.target.value)}/>
            <div>
                <Button color="primary" variant={"contained"} onClick={handleSubmit} >Login</Button>
            </div>
        </div>
    )
}