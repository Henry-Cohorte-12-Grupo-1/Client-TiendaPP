import jwtDecode from 'jwt-decode';
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './UserDashboard.css'


function UserDashboard() {
    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    let userName = token.username;
    return (
        <div className="d-flex flex-column ml-8 mt-5">
            <h1 id="usernameD">{userName.length < 18 ? userName : null} Dashboard</h1>
            {/* <div className="d-flex justify-content-around m-5">
                <a className="btn btn-primary" id='colorB' href={`/user/activeProducts`}>Active sales</a>
                <a className="btn btn-primary" id='colorB' href="/user/create">Create New</a>
                <a className="btn btn-primary" id='colorB' href={`/user/orders`}>My Orders</a>
                <a className="btn btn-primary" id='colorB' href={`/user/sales`}>Sold</a>
            </div> */}
            <div className="d-flex justify-content-around m-5">
                <div className="card mr-5" id="cardWidth">
                    <Link to={`/user/activeProducts`}>
                        <img src="https://underconstructionpage.com/app/wp-content/uploads/2018/08/how-to-effectively-manage-online-sales.jpg" id="cardsHeight" className="card-img-top" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary" id="mButtonU" href={`/user/activeProducts`}>Active sales</a>
                    </div>
                </div>
                <div className="card mr-5" id="cardWidth">
                    <Link to="/user/create">
                        <img src="https://www.intheblack.com/-/media/intheblack/allimages/magazine-2020/07-july/illustration-online-sales-recipts-ipad.jpg?rev=0ac69ac842954cbe82782edd331ad3c3" className="card-img-top" id="cardsHeight" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary" id="mButtonU" href="/user/create">Create new</a>
                    </div>
                </div>
                <div className="card mr-5" id="cardWidth">
                    <Link to={`/user/orders`}>
                        <img src="https://thenewdaily.com.au/wp-content/uploads/2019/10/1572243151-online-shopping-edm-960x540.jpg" className="card-img-top" id="cardsHeight" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary" id="mButtonU" href={`/user/orders`}>My orders</a>
                    </div>
                </div>
                <div className="card mr-5" id="cardWidth">
                    <Link to={`/user/sales`}>
                        <img src="https://shipearly.com/wp-content/uploads/2016/12/12_ways_to_increase_online_sales_1100x500px.png" className="card-img-top" id="cardsHeight" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary" id="mButtonU" href={`/user/sales`}>Sold products</a>
                    </div>
                </div>
                <div className="card mr-5" id="cardWidth">
                    <Link to={`/user/wishlist`}>
                        <img src="https://cdn.dribbble.com/users/40733/screenshots/1631989/wishlist.png" className="card-img-top" id="cardsHeight" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary" id="mButtonU" href={`/user/wishlist`}>My whishlist</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserDashboard