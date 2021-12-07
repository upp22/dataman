import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {AboutPage} from "./pages/AboutPage";
import {LoginPage} from "./pages/LoginPage";

function App() {
    console.log('App Starting..')
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Dataman</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                                <Nav.Link as={Link} to={'/about'}>About</Nav.Link>
                                <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/About'} element={<AboutPage/>}/>
                    <Route path={'/Login'} element={<LoginPage/>}/>
                    <Route path={'*'} element={<p>Not Found</p>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
