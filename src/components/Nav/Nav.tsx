import SearchBar from '../SearchBar/SearchBar';
import {Link} from 'react-router-dom';
import './Nav.css';
import { Navbar, Nav, Form } from 'react-bootstrap';

function NavComponent() {
  return (
    <Navbar bg="light" expand="lg">
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
          <Link to='/home'><button className='btn'  id='colorButton'>Home</button></Link>
          <Link to='/login'><button className='btn'  id='colorButton2'>Login</button></Link>
    </Nav>
  </Navbar.Collapse>
  <Form inline>
      <SearchBar />
    </Form>
</Navbar>
  )
}

export default NavComponent;