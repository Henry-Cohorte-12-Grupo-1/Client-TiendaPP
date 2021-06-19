import { Redirect, Route } from "react-router";
import jwtDecode from "jwt-decode";

function AuthAdmin (props:any) {
    console.log(props)
    const admin : any = localStorage.token ? jwtDecode(localStorage.token) : false;
    if(!admin || !admin.admin){
        return <Redirect to='/login'/>
    }

    return (
        <props.component/>
    )
}

export default AuthAdmin;