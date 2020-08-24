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
      <Header aboutUs={handleShowAboutUs} secondLabel={'Entrar'} />
      <div className="container-home">
        <section>
          <div>
            <h1>Seu marketplace de frutas e verduras</h1>
            <Link to="/login">Conheça</Link>
          </div>
          {isAboutUsSelected && (
            <div className="about-us-description">
              <span></span>
              <p>
                A Xepa&#169; surgiu com o objetivo de unir comerciantes de feira
                com os seus consumidores. Somos um marketplace focado no bem
                estar e saúde de toda a comunidade. Desenvolvido po Samuel
                Santos para o processo seletivo de estágio da Inhalt Soluções.
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
