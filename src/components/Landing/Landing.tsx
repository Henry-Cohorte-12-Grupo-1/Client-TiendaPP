import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Landing.scss'

function Landing() {
    return (
        <div>
            <header className='hero'>
                <div className='textos-hero'>
                    <h1>Welcome to TiendApp</h1>
                    <p>Come in and find what you are looking for</p>
                    <Link to='/home'>
                        <Button variant="outline-secondary">Let's go</Button>
                    </Link>
                </div>
                <div className="svg-hero" style={{ height: "150px", overflow: "hidden" }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: "none", fill: "#fff" }}></path>
                    </svg>
                </div>
            </header>

            <section className="cardsL contenedor">
                <div className="content-cardsL">
                    <article className="cardL">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                        </svg>
                        <h3>Sell</h3>
                        <p>Sell your products without worries.</p>
                    </article>
                    <article className="cardL">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                        </svg>
                        <h3>Buy</h3>
                        <p>Buy quickly and easily.</p>
                    </article>
                    <article className="cardL">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                        </svg>
                        <h3>Enjoy</h3>
                        <p>Enjoy your product in the comfort of your home.</p>
                    </article>
                </div>
            </section>


            <div style={{ maxWidth: '100vw' }}>
                <Footer />
            </div>
        </div>
    )
}


export default Landing;