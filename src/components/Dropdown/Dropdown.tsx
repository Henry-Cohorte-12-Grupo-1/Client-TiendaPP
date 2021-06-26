import './Dropdown.css'
import userProfile from './user (1).png';
import logOut from './log-out.png';
import dashBoard from './home.png';

function Dropdown () {

    const menuToggle = (e: any) => {
        e.preventDefault()
        const toggleMenu = document.querySelector('.menu');
        toggleMenu?.classList.toggle('active')
    }

    return(
        <div className="action">
            <div className="profile" onClick={(e) => menuToggle(e)}>
                <img src={userProfile}/>
            </div>
            <div className="menu">
                <h3>Your profile</h3>
                <ul>
                    <li><img src={dashBoard}/><a href="/user">Dashboard</a></li>
                    <li><img src={logOut}/><a href="/" onClick={() => {localStorage.removeItem("token")}}>Log out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown