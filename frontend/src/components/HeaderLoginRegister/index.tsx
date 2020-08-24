import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from '../../assets/back.svg';
import logoDark from '../../assets/logo_dark.svg';
import './styles.css';

const HeaderLoginRegister: React.FC = () => {
  return (
    <div className="header-login">
      <Link to="/" className="back">
        <span>
          <img src={backIcon} alt="Back Icon" />
        </span>
        Voltar
      </Link>
      <img src={logoDark} alt="logo" className="logodark" />
    </div>
  );
};

export default HeaderLoginRegister;
