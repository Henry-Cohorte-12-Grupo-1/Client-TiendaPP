import jwtDecode from "jwt-decode";
import { Redirect } from "react-router";

function AuthUser(props: any) {
    const user: any = localStorage.token ? jwtDecode(localStorage.token) : false;
    if (!user || !user.user || !props.component) {
        return <Redirect to='/login' />
    } else if (props.match.params.hasOwnProperty("userName") && props.match.params.userName !== user.username) {
        return <Redirect to='/user' />
    }
    return (
        <props.component name={props.name} {...props} />
    )

}

export default AuthUser;