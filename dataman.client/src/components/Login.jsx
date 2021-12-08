import {Button, TextField} from "@material-ui/core";
import {useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
toast.configure({position: toast.POSITION.BOTTOM_RIGHT});

export default function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

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
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={"register-stack"}>
            <h6>Login</h6>
            <TextField id="email_id" label="email" variant="standard" type={"email"} onChange={(e) => setEmail(e.target.value)}/>
            <TextField id="password_id" label="password" variant="standard" type={"password"} onChange={(e) => setPassword(e.target.value)}/>
            <div>
                <Button color="primary" variant={"contained"} onClick={handleSubmit} >Login</Button>
            </div>
        </div>
    )
}