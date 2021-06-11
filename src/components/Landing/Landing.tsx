import {Link} from 'react-router-dom'
import Footer from '../Footer/Footer';
import './Landing.css'

function Landing (){
    return (
        <div id='landing-container'>
            <div id='text-container'>
                <h1>TiendApp</h1>
                <Link to='/home'> 
                    <button className="btn btn-outline-primary btn-space">
                        Lets Go! 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </button>
                </Link>
            </div>

            <div id='information-container' className="row justify-content-center">

                <div className="col-lg-4 col-md-12">
                    <div className="card text-center" style={{border: 'none'}}>
                        <img src={"https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
                            </svg>
                            <h3>Sell</h3>
                            <p className="card-text">Sell your products without worries.</p>
                         </div>                           
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card text-center" style={{border: 'none'}}>
                        <img src={"https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                            <h3>Buy</h3>
                            <p className="card-text">Buy quickly and easily.</p>
                         </div>                           
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card text-center" style={{border: 'none'}}>
                        <img src={"https://images.pexels.com/photos/3616677/pexels-photo-3616677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} className='card-img-top' alt="..."/>
                        <div className="card-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-emoji-laughing" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
                            </svg>
                            <h3>Enjoy</h3>
                            <p className="card-text">Enjoy your product in the comfort of your home.</p>
                         </div>                           
                    </div>
                </div>
                
            </div>
            <Footer/>
        </div>
    )
}


export default Landing;