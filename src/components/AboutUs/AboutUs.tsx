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
import Footer from '../Footer/Footer'

function AboutUs() {
    return (
        <div className='team-section'>
            <div className='marginAbout'>
                <h1>Our Team</h1>
                <span className='border'></span>
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
                    <span className='border'></span>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <Footer />
            </div>
        </div>
    )

}

export default AboutUs;