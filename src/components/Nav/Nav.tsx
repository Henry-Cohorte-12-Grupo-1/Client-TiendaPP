import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
      <Link to='/home'><button className='btn btn-outline-secondary'  id='colorButton'>Home</button></Link>
      <SearchBar />
      </div>
    </nav>
  );
};

export default Nav;