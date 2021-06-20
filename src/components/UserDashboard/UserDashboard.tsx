import jwtDecode from 'jwt-decode';
import { Container } from 'react-bootstrap'


function UserDashboard() {
    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    let userName = token.username;
    return (
        <Container className="d-flex flex-column m-5">
            <h1>{userName.length < 18 ? userName : null} Dashboard</h1>
            <div className="d-flex justify-content-around m-5">
                <a className="btn btn-primary" id='colorB' href={`/user/activeProducts`}>Active sales</a>
                <a className="btn btn-primary" id='colorB' href="/user/create">Create New</a>
                <a className="btn btn-primary" id='colorB' href={`/user/orders`}>My Orders</a>
                <a className="btn btn-primary" id='colorB' href={`/user/sales`}>Sold</a>
            </div>
        </Container>
    )
}
export default UserDashboard