import jwtDecode from "jwt-decode";
import { Redirect, Router } from "react-router";

function AuthUser (props: any ) {
    const user : any = localStorage.token ? jwtDecode(localStorage.token) : false;
    if(!user || !user.user){
        return <Redirect to='/login'/>
    }
    return (
        <props.component name={props.name} {...props}/>
    )

}

export default AuthUser;