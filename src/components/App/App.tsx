//import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import "../../styles/App/App.css";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import decoder from 'jwt-decode';

import routes from '../../config/routes'
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer'

//redux stuff
import { StoreType } from "../../redux/reducers/index";
import { masUno } from "../../redux/actions/index";

import './style.scss'

function App() {
    const counter = useSelector<StoreType, number>((state) => state.counter); //redux store counter varible
    const dispatch = useDispatch(); //redux dispatch

    const onButtonClick = (event: any): void => {
        event.preventDefault();
        dispatch(masUno());
    };

    // si es un guest no puede ver las rutas {User, Create, ProductEdit, Admin}
    const routesGuest = routes.filter(route => {
        return (route.name !== 'User' && route.name !== 'Create' && route.name && 'ProductEdit' && route.name !== 'Admin'); 
    })
    // si es un User no puede ver las rutas {Login, Admin, Sing Up}
    // atob(localStorage.token.split('.')[1].user)
    const routesUser = routes.filter(route => {
        return (route.name !== 'Login' && route.name !== 'Sing Up' && route.name !== 'Admin'); 
    })

    // si es admin no puede ver las rutas {Login, Sing Up ,User, Create, ProductEdit}

    const routesAdmin = routes.filter(route => {
        return (route.name !== 'Login' && route.name !== 'Sing Up' && route.name && 'User' && route.name !== 'Create' && route.name !== 'ProductEdit'); 
    })

    const payloadToken :any = localStorage.token ? decoder(localStorage.token) : false;


    return (
        <div className="App">
            <button style={{ display: 'none' }} onClick={onButtonClick}>{counter}</button>
            <Nav />
            <div style={{ minHeight: "80vh" }}>
                <Switch>
                    {!localStorage.token && routesGuest.map((route, index) => {
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
                     { payloadToken.user && routesUser.map((route, index) => {
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
                     { payloadToken.admin  && routesAdmin.map((route, index) => {
                        console.log(routesGuest)
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
            <Footer />

        </div>
    );
}

export default App;
