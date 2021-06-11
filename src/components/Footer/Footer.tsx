import './Footer.css'
import {Link} from 'react-router-dom'

function Footer() {
   return(
       <footer className='footer'>
           <div className='containerF'>
                <div className='row'>
                    <div className='footer-col'>
                        <h4>About us</h4>
                        <ul>
                            <li><a href='#'>Know more about the team</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Home</h4>
                        <ul>
                            <li><a href='/home'>See products</a></li>
                            {/* <Link to='/home'><li><a>See products</a></li></Link> */}
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Help</h4>
                        <ul>
                            <li><a href='#'>Learn how to sell and buy what you want</a></li>
                        </ul>
                    </div>
                </div>
           </div>
       </footer>
   ) 
}

export default Footer;