import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Landing.scss";

function Landing() {
    return (
        <div>
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
        </div>
    );
}

export default Landing;
