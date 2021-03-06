//import React from "react";
// import "../../styles/App/App.css";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import routes from "../../config/routes";
import Landing from "../Landing/Landing";
//import NotFound from "../NotFound/NotFound"
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

//redux stuff
//import { masUno } from "../../redux/actions/index";

import "./style.scss";

function App() {
    //const counter = useSelector<CombinedStores, number>((state) => state.counter); //redux store counter varible


    // const onButtonClick = (event: any): void => {
    //     event.preventDefault();
    //     dispatch(masUno());
    // };

    const DefaultRoutes = () => {
        return (
            <div>
                <Nav />
                <div style={{ minHeight: "80vh" }}>
                    <Switch>
                        {routes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    render={(
                                        props: RouteComponentProps<any>
                                    ) => (
                                        <route.component
                                            name={route.name}
                                            {...props}
                                            {...route.props}
                                        />
                                    )}
                                />
                            );
                        })}
                    </Switch>
                </div>
            </div>
        );
    };

    return (
        <div className="App">
            {/* <button style={{ display: "none" }} onClick={onButtonClick}>
                {counter}
            </button> */}
            <Switch>
                {/* <Route exact path="/notfound" component={NotFound} /> */}
                <Route exact path="/" component={Landing} />
                <Route component={DefaultRoutes} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
