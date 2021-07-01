import './Dropdown.css'
import userProfile from './profile-icon.jpeg';
import logOut from './log-out.png';
import dashBoard from './home.png';
import { useSelector } from 'react-redux';
import { CombinedStores } from '../../redux/interfaces/reduxStore';

function Dropdown() {

    const userPic = useSelector<CombinedStores, string>(
        (state) => state.profilePicReducer.profilePic
    );

    const menuToggle = (e: any) => {
        e.preventDefault()
        const toggleMenu = document.querySelector('.menu');
        toggleMenu?.classList.toggle('active')
    }

    return (
        <div className="action">
            <div className="profile" onClick={(e) => menuToggle(e)}>
                <img src={userPic ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${userPic}` : userProfile} alt="profile icon" />
            </div>
            <div className="menu">
                <h3>Your profile</h3>
                <ul>
                    <li><img src={dashBoard} alt="dashboard-pic" /><a href="/user">Dashboard</a></li>
                    <li><img src={logOut} alt="log out" /><a href="/" onClick={() => { localStorage.removeItem("token") }}>Log out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown