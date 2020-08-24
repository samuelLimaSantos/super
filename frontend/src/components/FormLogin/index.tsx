import React, { useState, FormEvent, SetStateAction, Dispatch } from 'react';
import { Context } from '../../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useContext } from 'react';

interface FormLoginProps {
  setHasCount: Dispatch<SetStateAction<boolean>>;
}

const FormLogin: React.FC<FormLoginProps> = ({ setHasCount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticated, handleLogin } = useContext(Context);
  const history = useHistory();

  async function handleLoginEvent(event: FormEvent) {
    event.preventDefault();
    const data = await api.post('/users/login', {
      email,
      password,
    });

    if (data.data.error) {
      alert(data.data.error);
      return;
    }
    const { token, category } = data.data;

    handleLogin(token.toString(), category);

    setTimeout(() => {
      history.push('/products');
    }, 100);
  }

  return (
    <form>
      <fieldset>
        <legend>Login</legend>
        <div className="field">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            required
          />
        </div>
        <div className="field">
          Senha
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            required
          />
        </div>
      </fieldset>
      <button type="submit" onClick={handleLoginEvent}>
        Login
      </button>
      <p className="no-count">
        Não tem conta ainda?{' '}
        <span
          onClick={() => {
            setHasCount(false);
          }}
        >
          Crie uma já!
        </span>
      </p>
    </form>
  );
};

export default FormLogin;
