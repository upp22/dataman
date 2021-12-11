import axios from "axios";
import {logDOM} from "@testing-library/react";
import LoginStatus from "../components/LoginStatus";
import {useContext} from "react";
import UserContext from "../context/UserContext";

export function HomePage() {


    const { userContext, setUserContext } = useContext(UserContext);
    console.log(userContext);

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}