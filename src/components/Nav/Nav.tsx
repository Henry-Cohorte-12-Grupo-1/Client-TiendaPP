import SearchBar from "./SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Nav.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { CombinedStores } from "../../redux/interfaces/reduxStore";
import { Navbar, Nav, Form } from "react-bootstrap";
import { orderByCategories } from "../../redux/categories/categoriesActions";
import { bringProducts } from "../../redux/products/productsActions";
import { ICategory } from "../../interfaces/products";
import { IProduct } from "../../interfaces/product";
import jwtDecode from "jwt-decode";
import Dropdown from "../Dropdown/Dropdown";

import Sidebar from "./Sidebar/Sidebar";

function NavComponent() {
    const categories = useSelector<CombinedStores, ICategory[]>(
        (s) => s.categoriesReducer.filter
    );
    const dispatch = useDispatch();

    // const cart = useSelector<CombinedStores, IProduct[]>(
    //     (c) => c.cartReducer.cart
    // )

    const cartItem = useSelector<CombinedStores, IProduct[]>(
        (c) => c.cartReducer.cartItem
    )

    console.log('CART',cartItem)

    const handleClick = (category: string) => {
        dispatch(orderByCategories(category));
    };

    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const admin: boolean = token.admin;
    const user: boolean = token.user;

    return (
        <Navbar bg="primary" expand="lg">
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
            <div className="navbar-toggler" aria-controls="basic-navbar-nav">
                <Sidebar />
            </div>
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
                        {categories && (
                            <li
                                className="btn font-weight-bold"
                                id="colorButton4"
                            >
                                Categories
                                <ul>
                                    {categories.map((c, i) => {
                                        return (
                                            <li key={i}>
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
                        <div>
                            {cartItem ? (
                                <div className="shoppingConatiner">
                                    <div className="counterContainer">
                                        <span>{cartItem.length}</span>
                                    </div>
                                </div>
                            ): null}
                            <Link to="/cart">
                                <button
                                    className="btn font-weight-bold"
                                    id="colorButton5"
                                >
                                    Cart
                                </button>
                            </Link>
                        </div>
                    )}
                    {user ? <Dropdown /> : null}
                    {/* {user ? (
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
                    } */}
                </Nav>
            </Navbar.Collapse>
            <Form id="wFormNav">
                <SearchBar />
            </Form>
        </Navbar>
    );
}

export default NavComponent;
