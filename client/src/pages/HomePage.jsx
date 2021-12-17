import {GetUserContext, SetUserContext} from "../context/UserContext";
import {useEffect} from "react";
import axios from "axios";
import LoginStatus from "../components/LoginStatus";


export function HomePage() {
    const userContext = GetUserContext();
    const setUserContext = SetUserContext();

    // console.log(`From homepage (email) : ${GetUserContext().userContext.email}`);
    // console.log(`From homepage (loginStatus) : ${GetUserContext().userContext.loginStatus}`);

    // // TODO: Not sure if we need to do this here
    // axios.get(`${process.env.REACT_APP_API_URL}/sessions/user`, {withCredentials: true}).then(res => {
    //     //console.log(` axios from home: ${!!res.data.email}`);
    // })

    return (
        <div>
            <h1>Home Page</h1>
            <LoginStatus></LoginStatus>
        </div>
    )
}