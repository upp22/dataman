import {Button, TextField} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";

// ---- Toast Library ----
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({position: toast.POSITION.BOTTOM_RIGHT});

export default function Register() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [conf, setConf] = useState(null);

    const handleSubmit = () => {
        const allFieldsInput = [username, email, password, conf].every(i => i);
        if (!allFieldsInput) {
            toast.error('All fields need to be filled');
            return;
        }

        if (password !== conf) {
            toast.error('Passwords do not match');
            return;
        }

        const payload = {
            username: username,
            email: email,
            password: password
        }

        axios.post(`/sessions/register`,payload, {withCredentials: true}).then(res => {
            console.log(res);
            if (res.data == 'User Exists') {
                toast.warning('User Exists');
            } else if (res.data == 'User Created') {
                toast.success('User Created');
            }
        }).catch(err => {
            console.log(err);
            toast.error("Unable to register user. Check logs for details");
        })
    }

    return (
        <div className={"form-stack"}>
            <h6>Register</h6>
            <TextField id="username_id" label="username" variant="standard" onChange={(e) => setUsername(e.target.value)}/>
            <TextField id="email_id" label="email" variant="standard" type={"email"} onChange={(e) => setEmail(e.target.value)}/>
            <TextField id="password_id" label="password" variant="standard" type={"password"} onChange={(e) => setPassword(e.target.value)}/>
            <TextField id="conf_id" label="confirm password" variant="standard" type={"password"} onChange={(e) => setConf(e.target.value)}/>
            <div>
                <Button color="primary" variant={"contained"} onClick={handleSubmit} >Submit</Button>
            </div>
        </div>
    )
}