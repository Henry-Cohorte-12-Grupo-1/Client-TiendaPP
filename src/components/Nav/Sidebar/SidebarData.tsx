import React from "react";
import * as AiIcons from "react-icons/ai";


export enum UserStatus {
    all,
    admin,
    notAdmin,
    user,
    guest,
    logged,
}

export const SidebarData = [
    {
        title: "Home",
        path: "/home",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
        role: UserStatus.all,
        onClick: () => {
            return;
        },
    },
    {
        title: "Admin Tools",
        path: "/admin",
        icon: <AiIcons.AiOutlineTool />,
        cName: "nav-text",
        role: UserStatus.admin,
        onClick: () => {
            return;
        },
    },
    {
        title: "My Profile",
        path: "/user",
        icon: <AiIcons.AiOutlineUser />,
        cName: "nav-text",
        role: UserStatus.user,
        onClick: () => {
            return;
        },
    },
    {
        title: "Login",
        path: "/login",
        icon: <AiIcons.AiOutlineLogin />,
        cName: "nav-text",
        role: UserStatus.guest,
        onClick: () => {
            return;
        },
    },
    {
        title: "Sign Up",
        path: "/sign-up",
        icon: <AiIcons.AiOutlineForm />,
        cName: "nav-text",
        role: UserStatus.guest,
        onClick: () => {
            return;
        },
    },
    {
        title: "Cart",
        path: "/cart",
        icon: <AiIcons.AiOutlineShoppingCart />,
        cName: "nav-text",
        role: UserStatus.notAdmin,
        onClick: () => {
            return;
        },
    },
    {
        title: "About",
        path: "/about",
        icon: <AiIcons.AiOutlineInfoCircle />,
        cName: "nav-text",
        role: UserStatus.all,
        onClick: () => {
            return;
        },
    },
    {
        title: "Log out",
        path: "/",
        icon: <AiIcons.AiOutlineLogout />,
        cName: "nav-text",
        role: UserStatus.logged,
        onClick: () => {
            localStorage.removeItem("token");
        },
    },
];
