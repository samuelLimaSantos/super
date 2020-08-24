import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logoteste.png';
import aboutUs from '../../assets/about_us.svg';
import signIn from '../../assets/sign_out.svg';
import newIcon from '../../assets/new_product.svg';
import { Context } from '../../Context/AuthContext';

import './styles.css';

interface HeaderProps {
  aboutUs?: () => void;
  products?: boolean;
  secondLabel: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { handleLogout } = useContext(Context);
  const category = localStorage.getItem('category');
  return (
    <>
      <header>
        <img src={logoImg} alt="Xepa Logo" />
        <ul className="options">
          {!props.products && (
            <li>
              <img src={aboutUs} alt="About Us Icon" />
              <span onClick={props.aboutUs} className="header-options">
                Sobre nós
              </span>
            </li>
          )}
          {category === '"salesman"' && (
            <Link to="/newProduct">
              <li>
                <img src={newIcon} alt="New Product Icon" />
                <span className="header-options">Novo produto</span>
              </li>
            </Link>
          )}
          <li>
            <img src={signIn} alt="Sign In Icon" />
            <Link to="/login" onClick={handleLogout}>
              {props.secondLabel}
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
