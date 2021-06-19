import './Footer.css'

function Footer() {
    return (
        <footer className='footer'>
            <div className='containerF'>
                <div className='rowF'>
                    <div className='footer-col'>
                        <h4>About us</h4>
                        <ul>
                            <li><a href='/about'>Know more about the team</a></li>
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
                        <h4>Sing Up</h4>
                        <ul>
                            <li><a href='/sign-up' className='noFunctional'>Sign up to start selling and buying your products</a></li> {/* eslint-disable-line */}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;