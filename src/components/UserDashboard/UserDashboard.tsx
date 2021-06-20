import { Container } from 'react-bootstrap'


function UserDashboard() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userName: string | null = params.get('username');

    return (
        <Container className="d-flex flex-column m-5">
            <h1>{userName} Dashboard</h1>
            <div className="d-flex justify-content-around m-5">
                <a className="btn btn-primary" id='colorB' href={`/user/activeProducts?username=${userName}`}>Active sales</a>
                <a className="btn btn-primary" id='colorB' href="/user/create">Create New</a>
                <a className="btn btn-primary" id='colorB' href={`/user/orders?user=${userName}`}>My Orders</a>
                <a className="btn btn-primary" id='colorB' href={`/user/sales?user=${userName}`}>Sold</a>
            </div>
        </Container>
    )
}
export default UserDashboard