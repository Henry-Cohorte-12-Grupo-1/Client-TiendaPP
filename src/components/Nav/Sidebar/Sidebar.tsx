import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./Sidebar.scss";

//ICONS
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

import { useState } from "react";
import { SidebarData, UserStatus } from "./SidebarData";

function Sidebar() {
    //STATES
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    //IS USER LOGGED???
    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const admin: boolean = token.admin;
    const user: boolean = token.user;
    const userStatus: number = admin
        ? UserStatus.admin
        : user
        ? UserStatus.user
        : UserStatus.guest;

    return (
        <IconContext.Provider value={{ color: "#fff" }}>
            <div className="sidebar">
                <Link to="#" className="manu-bars">
                    <FaIcons.FaBars onClick={toggleSidebar} />
                </Link>
            </div>

            <div
                className={sidebar ? "full-overlay active" : "full-overlay"}
                onClick={toggleSidebar}
            ></div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={toggleSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="tiendapp">
                            TiendApp
                            <FaIcons.FaOpencart />
                        </Link>
                    </li>

                    <li className="nav-menu-items profile">
                        <img src="https://prod-virtuoso.dotcmscloud.com/dA/e53bd89c-d52f-45b0-a2e3-238f1e2cef3d/heroImage1/DowntownLA_hero.jpg"></img>
                        <div id="circle">
                            <img
                                src="https://avatars.githubusercontent.com/u/26018920?v=4"
                                className="pfp"
                            ></img>
                        </div>
                    </li>

                    {SidebarData.map((item, index) => {
                        if (
                            //Matches role
                            userStatus === item.role ||
                            //always show
                            item.role === UserStatus.all ||
                            //Is logged
                            ((userStatus === UserStatus.admin ||
                                userStatus === UserStatus.user) &&
                                item.role === UserStatus.logged) ||
                            //Not admin
                            (userStatus !== UserStatus.admin &&
                                userStatus === UserStatus.user &&
                                item.role === UserStatus.notAdmin)
                        ) {
                            return (
                                <li
                                    className={item.cName}
                                    key={index}
                                    onClick={item.onClick}
                                >
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
    );
}

export default Sidebar;
