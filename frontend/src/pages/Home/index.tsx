import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import fruitsImage from '../../assets/home_fruit.jpg';
import './styles.css';

const Home: React.FC = () => {
  const [isAboutUsSelected, setIsAboutUsSelected] = useState(false);

  function handleShowAboutUs() {
    const sectionElement = document.querySelector('.container-home section');
    sectionElement?.classList.toggle('aboutUs');

    setIsAboutUsSelected(!isAboutUsSelected);
  }

  return (
    <div className="home">
      <Header aboutUs={handleShowAboutUs} />
      <div className="container-home">
        <section>
          <div>
            <h1>A feira ao seu alcance</h1>
            <Link to="/login">Sign In</Link>
          </div>
          {isAboutUsSelected && (
            <div className="about-us-description">
              <span></span>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
                magni quaerat possimus inventore earum sunt ratione quae maiores
                ea minima. Odio provident repellat eligendi laudantium voluptas,
                nostrum mollitia totam sunt?
              </p>
            </div>
          )}
        </section>

        <img src={fruitsImage} alt="" />
      </div>
    </div>
  );
};

export default Home;
