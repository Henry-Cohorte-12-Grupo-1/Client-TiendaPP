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
                        <h4>Help</h4>
                        <ul>
                            <li><a className='noFunctional'>Learn how to sell and buy what you want</a></li> {/* eslint-disable-line */}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;