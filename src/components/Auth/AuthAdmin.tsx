import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

function AuthAdmin(props: any) {
    console.log(props)
    const admin: any = localStorage.token ? jwtDecode(localStorage.token) : false;
    if (!admin || !admin.admin) {
        return <Redirect to='/login' />
    }

    return (
        <props.component name={props.name} {...props} />
    )
}

export default AuthAdmin;