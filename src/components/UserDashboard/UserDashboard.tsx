import { Container } from 'react-bootstrap'




function UserDashboard() {





    return (
        <Container className="d-flex flex-column m-5">
            <h1>Dashboard</h1>
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