import React, { useState, useEffect } from 'react';
import HeaderLoginRegister from '../../components/HeaderLoginRegister';
import './styles.css';
import FormLogin from '../../components/FormLogin';
import FormRegistry from '../../components/FormRegistry';

const Login: React.FC = () => {
  const [hasCount, setHasCount] = useState(true);

  useEffect(() => {
    document.querySelector('.login-page')?.classList.toggle('registryImg');
  }, [hasCount]);

  return (
    <div className="login-page ">
      <div></div>
      <div className="login-content">
        <HeaderLoginRegister />
        {hasCount ? (
          <FormLogin setHasCount={setHasCount} />
        ) : (
          <FormRegistry setHasCount={setHasCount} />
        )}
      </div>
    </div>
  );
};

export default Login;
