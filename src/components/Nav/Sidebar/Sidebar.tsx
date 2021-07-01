import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./Sidebar.scss";

//ICONS
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import profileIcon from "../../Dropdown/profile-icon.jpeg"

import { useState } from "react";
import { SidebarData, UserStatus } from "./SidebarData";

//redux
import { useSelector, useDispatch } from "react-redux";
import { CombinedStores } from "../../../redux/interfaces/reduxStore";
import SellerProfile from "../../../interfaces/sellerProfile";
import { bringSellerProfile } from "../../../redux/seller/sellerActions";
import { useEffect } from "react";
import { bringProfilePic } from "../../../redux/profile/profilePicActions";

function Sidebar() {
    //redux
    const dispatch = useDispatch();
    const sellerProfile = useSelector<CombinedStores, SellerProfile>(
        (state) => state.sellerReducer.sellerProfile
    );
    const userPic = useSelector<CombinedStores, string>(
        (state) => state.profilePicReducer.profilePic
    );
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
    const logged: boolean = admin || user;
    const userStatus: number = admin
        ? UserStatus.admin
        : user
        ? UserStatus.user
        : UserStatus.guest;
    const userId = token.id;

    let username = token.username ? token.username : "guest";
    username = admin ? "ADMINISTRATOR" : username;

    useEffect(() => {
        if (username !== "guest") {
            dispatch(bringSellerProfile(username));
            dispatch(bringProfilePic(userId))
        }
    }, []);//eslint-disable-line

    //SET IMAGES URL
    let cover_URL: string;
    let pfp_URL: string;

    if (sellerProfile.error || !sellerProfile.images?.length || !sellerProfile) {
        cover_URL =
            "https://cartcraze.com/sites/default/files/assets/images/blog-images/visual-inspiration-15-e-commerce-websites-with-beautiful-clean-design.jpg"
    } else {
        cover_URL = `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${sellerProfile.images}`;
    }
    pfp_URL = userPic ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${userPic}` : profileIcon;

    const sidebarBody = SidebarData.filter((item) => {
        return (
            item.title !== "About" &&
            //Matches role
            (userStatus === item.role ||
                //always show
                item.role === UserStatus.all ||
                //Is logged
                (logged && item.role === UserStatus.logged) ||
                //Not admin and logged
                (!admin && item.role === UserStatus.notAdmin))
        );
    });

    const sidebarFooter = SidebarData.filter((item) => {
        return item.title === "About";
    });

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
                <div className="nav-header">
                    <Link to="/" className="tiendapp">
                        TiendApp
                        <FaIcons.FaOpencart />
                    </Link>
                </div>

                {/*PROFILE PIC*/}
                <div
                    className="nav-profile"
                    style={{
                        backgroundImage: `url(${cover_URL})`,
                    }}
                >
                    <div className="profile-overlay"></div>

                    <a href={user ? `/seller/${username}` : "#"}>
                        <div className="circle">
                            <img src={`${pfp_URL}`} className="pfp" alt="profile"></img>
                        </div>
                    </a>

                    <div className="username">
                        <p>{username}</p>
                    </div>
                </div>

                <div className="nav-body">
                    <ul onClick={toggleSidebar}>
                        {sidebarBody.map((item, index) => {
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
                        })}
                    </ul>
                </div>

                <div className="nav-footer">
                    <ul onClick={toggleSidebar}>
                        {sidebarFooter.map((item, index) => {
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
                        })}
                    </ul>
                </div>
            </nav>
        </IconContext.Provider>
    );
}

export default Sidebar;
