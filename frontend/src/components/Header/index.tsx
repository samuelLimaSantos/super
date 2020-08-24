import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logoteste.png';
import aboutUs from '../../assets/about_us.svg';
import signIn from '../../assets/sign_out.svg';
import './styles.css';

interface HeaderProps {
  aboutUs: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <header>
        <img src={logoImg} alt="Xepa Logo" />
        <ul className="options">
          <li>
            <img src={aboutUs} alt="About Us Icon" />
            <span onClick={props.aboutUs} className="header-options">
              Sobre nós
            </span>
          </li>
          <li>
            <img src={signIn} alt="Sign In Icon" />
            <Link to="/login">Entrar</Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
