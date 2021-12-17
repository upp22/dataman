import {Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {HomePage} from "../pages/HomePage";
import {MapPage} from "../pages/MapPage";
import {LoginPage} from "../pages/LoginPage";
import axios from "axios";
import {AboutPage} from "../pages/AboutPage";
import {GetUserContext, SetUserContext} from "../context/UserContext";
import socket from '../context/SocketModule';

export default function TopNavigation() {
    const [routes, setRoutes] = useState((
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/Maps'} element={<MapPage/>}/>
            <Route path={'/Login'} element={<LoginPage/>}/>
            <Route path={'*'} element={<p>Not Found here</p>}/>
        </Routes>
    ))

    const [authState, setAuthState] = useState(false);

    const userContext = GetUserContext();
    const setUserContext = SetUserContext();

    useEffect(x => {
        console.log(`context changed in nav`)
    }, [GetUserContext().userContext])

    axios.get(`${process.env.REACT_APP_API_URL}/sessions/user`, {withCredentials: true}).then(res => {
        const isLoggedIn = !!res.data.email;
        if (isLoggedIn) {
            setAuthState(true);
        } else {
            setAuthState(false);
        }
    })

    const handleLogout = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/sessions/logout`, {withCredentials: true}).then(res => {
            res.data.email ? setAuthState(true) : setAuthState(false);
            setAuthState(!!res.data.email);
            socket.emit('logout', "");
        })
    }

    console.log(`AuthState: ${authState}`);

    // When auth state changes protect the routes
    useEffect((x) => {
        console.log(`UseEffect triggered by authstate change`)
        determineRoutes();
    }, [authState])

    const determineRoutes = () => {
        // Set authenticated routes here - this does not prevent the menu from rendering (the conditional rendering happens below)
        if (authState) {
            setRoutes((
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/About'} element={<AboutPage/>}/>
                    <Route path={'/Maps'} element={<MapPage/>}/>
                    <Route path={'/Login'} element={<LoginPage/>}/>
                    <Route path={'*'} element={<p>Not Found</p>}/>
                </Routes>
            ))
        }
    }

    return (
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Dataman</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                                {
                                    // Render about page only if logged in
                                    authState &&
                                    <Nav.Link as={Link} to={'/about'}>About</Nav.Link>

                                }
                                <Nav.Link as={Link} to={'/maps'}>Maps</Nav.Link>
                            </Nav>
                            {
                                authState
                                    ?
                                    <Nav><Nav.Link onClick={handleLogout} as={Link} to={'/login'}>Logout</Nav.Link></Nav>
                                    : <Nav><Nav.Link as={Link} to={'/login'}>Login</Nav.Link></Nav>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {
                    routes
                }
            </BrowserRouter>

    )
}