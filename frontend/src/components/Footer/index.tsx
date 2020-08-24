import React from 'react';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';
import heartIcon from '../../assets/heart.svg';
import './styles.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>
        Desenvolvido com <img src={heartIcon} alt="Heart Icon" /> por Samuel
        Santos
      </p>
      <div className="social-medias">
        <a
          href="https://www.linkedin.com/in/samuel-santos-036375174/"
          target="_blank"
        >
          <img src={linkedinIcon} alt="Linkedin Icon" />
        </a>
        <a href="https://github.com/samuelLimaSantos" target="_blank">
          <img src={githubIcon} alt="Github Icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
