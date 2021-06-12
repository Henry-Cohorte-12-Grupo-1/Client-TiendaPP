import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <Link to='/home'><button className='btn'  id='colorButton'>Home</button></Link>
      <Link to='/login'><button className='btn'  id='colorButton2'>Login</button></Link>
      <SearchBar />
      </div>
    </nav>
  );
};

export default Nav;