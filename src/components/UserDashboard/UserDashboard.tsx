import { Container } from 'react-bootstrap'


function UserDashboard() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userName: string | null = params.get('username');

    return (
        <Container>
            <a className="btn btn-primary" id='colorB' href={`/user/activeProducts?username=${userName}`}>Active sales</a>
            <a className="btn btn-primary" id='colorB' href="/user/create">Create New</a>
            <a className="btn btn-primary" id='colorB' href="/user/orders">My Purchases</a>
        </Container>
    )
}
export default UserDashboard