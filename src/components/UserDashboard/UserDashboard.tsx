import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdatePhoto from '../ProfilePic/UpdatePhoto';
import './UserDashboard.scss'


function UserDashboard() {
    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    let userName = token.username;

    const [editPic, setEditPic] = useState<boolean>(false)

    const handleProfilePic = (e: any) => {
        e.preventDefault();
        setEditPic(!editPic)
    }
    return (
        <div>
            <div className="d-flex row m-3 align-items-center justify-content-center">
                <button
                    style={{ border: "none", backgroundColor: "transparent" }}
                    onClick={handleProfilePic}>
                    <div className="circle">
                        <img src="https://image.shutterstock.com/image-vector/thin-line-black-camera-logo-260nw-627479624.jpg" className="pfp" alt="profile"></img>
                    </div>
                </button>
                <p className="h3 color text-center" id="usernameD">{userName.length < 18 ? userName : null}</p>
            </div>
            {editPic && <div className="d-flex row m-3 justify-content-center"><UpdatePhoto /></div>}

            {/* <div className="d-flex justify-content-around m-5">
                <a className="btn btn-primary" id='colorB' href={`/user/activeProducts`}>Active sales</a>
                <a className="btn btn-primary" id='colorB' href="/user/create">Create New</a>
                <a className="btn btn-primary" id='colorB' href={`/user/orders`}>My Orders</a>
                <a className="btn btn-primary" id='colorB' href={`/user/sales`}>Sold</a>
            </div> */}
            <div id="displayUserBoard">
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
                        <img src="https://img.freepik.com/free-vector/online-wishes-list-concept-illustration_114360-3632.jpg?size=338&ext=jpg" className="card-img-top" id="cardsHeight" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary" id="mButtonU" href={`/user/wishlist`}>My whishlist</a>
                    </div>
                </div>
                <div className="card mr-5" id="cardWidth">
                    <Link to={`/seller/edit/${userName}`}>
                        <img src="https://www.torodigital.com.au/wp-content/uploads/2018/10/Lawyers-Profile-Page.jpg" className="card-img-top" id="cardsHeight" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary ml-3" href={`/seller/edit/${userName}`}>Edit my Site</a>
                    </div>
                </div>
                <div className="card mr-5" id="cardWidth">
                    <Link to={`/seller/${userName}`}>
                        <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGxpbmtlZGluJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" className="card-img-top" id="cardsHeight" alt="not found" />
                    </Link>
                    <div className="card-body">
                        <a className="btn btn-primary" id="mButtonU" href={`/seller/${userName}`}>My Seller Site</a>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default UserDashboard