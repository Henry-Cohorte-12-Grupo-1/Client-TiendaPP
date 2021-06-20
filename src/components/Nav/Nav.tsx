import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Nav.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/reducers/index";
import { Navbar, Nav, Form } from "react-bootstrap";
import { orderByCategories, bringProducts } from "../../redux/actions/index";
import { category } from "../../interfaces/products";
import jwtDecode from "jwt-decode";

function NavComponent() {
    const categorias = useSelector<StoreType, category[]>((s) => s.filter);
    const dispatch = useDispatch();

    const handleClick = (category: string) => {
        dispatch(orderByCategories(category));
    };

    const token: any = localStorage.token ? jwtDecode(localStorage.token) : false;
    let admin: boolean = token.admin
    let user: boolean = token.user

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
                    {localStorage.token ? null : (
                        <Link to="/login">
                            <button
                                className="btn font-weight-bold"
                                id="colorButton2"
                            >
                                Login
                            </button>
                        </Link>
                    )}
                    {admin ? (
                        <Link to="/admin">
                            <button
                                className="btn font-weight-bold"
                                id="colorButton2"
                            >
                                Admin
                            </button>
                        </Link>
                    ) : null}
                    {localStorage.token ? null : (
                        <Link to="/sign-up">
                            <button
                                className="btn font-weight-bold"
                                id="colorButton2"
                            >
                                Sign Up
                            </button>
                        </Link>
                    )}

                    <ul>
                        {categorias && (
                            <li
                                className="btn font-weight-bold"
                                id="colorButton4"
                            >
                                Categories
                                <ul>
                                    {categorias.map((c) => {
                                        return (
                                            <li>
                                                <a
                                                    id="colorB"
                                                    onClick={() =>
                                                        handleClick(c.name)
                                                    }
                                                >
                                                    {c.name}
                                                </a>
                                            </li>
                                        );
                                    })}
                                    <li>
                                        {" "}
                                        <a
                                            id="colorB"
                                            onClick={() =>
                                                dispatch(bringProducts())
                                            }
                                        >
                                            Go back
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                    {admin ? null : (
                        <Link to="/cart">
                            <button
                                className="btn font-weight-bold"
                                id="colorButton2"
                            >
                                Cart
                            </button>
                        </Link>
                    )}
                    {user ? (
                        <Link to="/user">
                            <button
                                className="btn font-weight-bold"
                                id="colorButton2"
                            >
                                Profile
                            </button>
                        </Link>
                    ) : null}
                    {
                        localStorage.token && (
                            <div>
                                <a
                                    className="btn font-weight-bold"
                                    id="colorButton2"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                    }}
                                    href="/"
                                >
                                    Log out
                                </a>
                            </div>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
            <Form id="wFormNav">
                <SearchBar />
            </Form>
        </Navbar>
    );
}

export default NavComponent;
