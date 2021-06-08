import React from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import "../../styles/App/App.css";

//redux stuff
import { StoreType } from "../../redux/reducers/index";
import { masUno } from "../../redux/actions/index";

function App() {
    const counter = useSelector<StoreType, number>((state) => state.counter); //redux store counter varible
    const dispatch = useDispatch(); //redux dispatch

    const onButtonClick = (event: any): void => {
        event.preventDefault();
        dispatch(masUno());
    };

    return (
        <div className="App">
            <button onClick={onButtonClick}>{counter}</button>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
