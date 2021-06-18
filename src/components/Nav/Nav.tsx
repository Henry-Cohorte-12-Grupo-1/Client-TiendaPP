import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Nav.scss";
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';
import { Navbar, Nav, Form } from "react-bootstrap";
import { orderByCategories, bringProducts } from '../../redux/actions/index'
import { category } from '../../interfaces/products';

function NavComponent() {
    const categorias = useSelector<StoreType, category[]>((s) => s.filter)
    const dispatch = useDispatch()

    const handleClick = (category: string) => {
        dispatch(orderByCategories(category))
    }

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
                            Sign In
                        </button>
                    </Link>
                    <Link to="/sign-up">
                        <button
                            className="btn font-weight-bold"
                            id="colorButton2"
                        >
                            Sign Up
                        </button>
                    </Link>
                    <ul>
                        {categorias &&
                         <li className="btn font-weight-bold" id="colorButton4">Categories
                        <ul>
                            {categorias.map(c => {
                                return (
                                    <li><a id="colorButton3" onClick={() => handleClick(c.name)}>{c.name}</a></li>
                                )
                            })}
                            <li> <a id="colorButton3" onClick={() => dispatch(bringProducts())}>Go back</a></li>
                        </ul></li>}
                    </ul>
                </Nav>
            </Navbar.Collapse>
            <Form id='wFormNav'>
                <SearchBar />
            </Form>
        </Navbar>
    );
}

export default NavComponent;
