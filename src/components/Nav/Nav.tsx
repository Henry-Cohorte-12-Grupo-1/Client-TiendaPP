import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Nav.scss";
import { Navbar, Nav, Form } from "react-bootstrap";

function NavComponent() {
    return (
        <Navbar bg="primary" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/home">
                        <button
                            className="btn font-weight-bold"
                            id="colorButton"
                        >
                            Home
                        </button>
                    </Link>
                    <Link to="/login">
                        <button
                            className="btn font-weight-bold"
                            id="colorButton2"
                        >
                            Login
                        </button>
                    </Link>
                </Nav>
            </Navbar.Collapse>
            <Form id='wFormNav'>
                <SearchBar />
            </Form>
        </Navbar>
    );
}

export default NavComponent;
