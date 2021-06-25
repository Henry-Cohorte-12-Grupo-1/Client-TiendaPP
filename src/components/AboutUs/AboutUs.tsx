import './AboutUs.css'
import logo1 from './Dario Santillan.jpg'
import logo2 from './Juan Pablo.jpg'
import logo3 from './Leandro Gordillo.jpg'
import logo4 from './Manuel Nagami.jpg'
import logo5 from './Nahuel Lugones.jpg'
import logo6 from './Pedro Escuredo.jpg'
import logo7 from './Tomas Garcia.jpg'
import logo8 from './Violeta Fuentes.jpg'
import logo9 from './Juan Cruz Becerra.jpg'

function AboutUs() {
    return (
        <div className='team-section'>
            <div className='marginAbout'>
                <h1 className="ourTeam">Our Team</h1>
                <span className='aboutUsBorder'></span>
                <div className='ps'>
                    <a href='https://www.linkedin.com/in/santillandario/'><img src={logo1} alt='not found'></img></a>
                    <a href='https://www.linkedin.com/in/pedro-maresc/'><img src={logo6} alt='not found'></img></a>
                    <a href='https://www.linkedin.com/in/juan-pablo-olivera-70682b200/'><img src={logo2} alt='not found'></img></a>
                    <a href='https://www.linkedin.com/in/leandro-gordillo-b24378148/'><img src={logo3} alt='not found'></img></a>
                    <a href='https://www.linkedin.com/in/manuel-nagami/'><img src={logo4} alt='not found'></img></a>
                    <a href='https://www.linkedin.com/in/nahuel-lugones/'><img src={logo5} alt='not found'></img></a>
                    <a href='https://www.linkedin.com/in/tomas-ggarcia/'><img src={logo7} alt='not found'></img></a>
                    <a href='https://www.linkedin.com/in/violeta-fuentes-fullstackdeveloper/'><img src={logo8} alt=' not found'></img></a>
                    <a href='https://www.linkedin.com/in/jc-becerra/'><img src={logo9} alt=''></img></a>
                </div>
                <div className='sectionAbout'>
                    <span className='nameA'>About the project</span>
                    <span className='aboutUsBorder'></span>
                    <p>We developed a market place using Scrum metodology, React, Typescript, redux, Sequelize, React Boostrap, Boostrap, SCSS and other techonolies.</p> 
                    <p>The web is full responsive and the pproject lasted four weeks.</p>
                    <p>Some features are: payment gateway, cart, log In using google or gitHub, Authentication</p>
                    <b></b>
                    <span className='aboutUsBorder'></span>
                    <h3>Contact us!</h3>
                    <p>Feel free to click in one of the team members image and it will send you to that person's linkedin profile</p>
                </div>
            </div>
        </div>
    )

}

export default AboutUs;