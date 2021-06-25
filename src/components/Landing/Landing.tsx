import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Landing.scss";
import sell from "./sell.svg";
import buy from "./buy.svg";
import enjoy from "./enjoy.svg";

function Landing() {
    return (
        <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <header className="hero">
                <div className="textos-hero">
                    <h1>Welcome to TiendApp</h1>
                    <p>Come in and find what you are looking for</p>
                    <Link to="/home">
                        <Button variant="btn btn-secondary">
                            Let&apos;s go
                        </Button>
                    </Link>
                </div>
                <div
                    className="svg-hero"
                    style={{ height: "150px", overflow: "hidden" }}
                >
                    <svg
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                        style={{ height: "100%", width: "100%" }}
                    >
                        <path
                            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                            style={{ stroke: "none", fill: "#fff" }}
                        ></path>
                    </svg>
                </div>
            </header>

            <section className="cardsL contenedor"> 
            <div className="content-cardsL">
                    <article className="cardL">
                        <img className='cardL-img' src={sell} alt="" />
                        <h3>Sell</h3>
                        <p>Sell your products without worries.</p>
                    </article>
                    <article className="cardL">
                    <img className='cardL-img' src={buy} alt="" />
                        <h3>Buy</h3>
                        <p>Buy quickly and easily.</p>
                    </article>
                    <article className="cardL">
                    <img className='cardL-img' src={enjoy} alt="" />
                        <h3>Enjoy</h3>
                        <p>Enjoy your product in the comfort of your home.</p>
                    </article>
                </div>
            </section>
        </div>
    );
}

export default Landing;
