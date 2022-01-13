import '../styles/Home.css';
import { Link } from "react-router-dom"

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="hero-section__text">
                <div className="hero-container">
                    <h1 className="hero-section__text--title">
                            The unique furniture for your special house
                    </h1>

                    <Link to='/products' className="hero-section__text--btn">Shop Now</Link>
                </div>
            </div>
            <div className="hero-section__img">
                <img src="./assets/images/chair1.jpg" alt="chair"/>
            </div>
        </section>
    )
}

export default HeroSection