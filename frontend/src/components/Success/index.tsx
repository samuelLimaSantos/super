import React from 'react';
import successIcon from '../../assets/success.svg';
import './styles.css';

interface SuccessProps {
  title: string;
}

const Success: React.FC<SuccessProps> = ({ title }) => {
  return (
    <div className="success">
      <section className="success-content">
        <img src={successIcon} alt="Success Icon" />
        <h1>{title}</h1>
      </section>
    </div>
  );
};

export default Success;
