import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/App/App.css";
import { Route, RouteComponentProps, Switch } from "react-router-dom";


import Home from '../Home/Home'
import Client from '../Client/Client'
import ProductForm from '../ProductForm/ProductForm'
import routes from '../../config/routes'

//redux stuff
import { StoreType } from "../../redux/reducers/index";
import { masUno } from "../../redux/actions/index";
import { formatDiagnostic } from "typescript";
import { resourceLimits } from "worker_threads";

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
            {/* <Route exact path='/' component={Home}/>
        <Route exact path='/client' component={Client}/> 
        <Route exact path='/client/create' component={ProductForm}/> */}
            <Switch>
                {routes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(props: RouteComponentProps<any>) => (
                                <route.component
                                    name={route.name}
                                    {...props}
                                    {...route.props}
                                />
                            )}
                        />
                    )
                })}
            </Switch>

        </div>
    );
}

export default App;
