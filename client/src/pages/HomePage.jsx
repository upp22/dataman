import {GetUserContext, SetUserContext} from "../context/UserContext";
import {useEffect} from "react";
import axios from "axios";
import LoginStatus from "../components/LoginStatus";


export function HomePage() {
    const userContext = GetUserContext();
    const setUserContext = SetUserContext();

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}