import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav>
      <span>
      <SearchBar />
      <Link to='/home'><button className='btn btn-outline-secondary'  id='colorButton'>Home</button></Link>
      </span>
    </nav>
  );
};

export default Nav;