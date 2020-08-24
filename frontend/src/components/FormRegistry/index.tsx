import React, { useState, FormEvent, SetStateAction, Dispatch } from 'react';
import api from '../../services/api';
import consumerIcon from '../../assets/iconConsumer.svg';
import salesmanIcon from '../../assets/IconSalesman.svg';

interface FormRegistryProps {
  setHasCount: Dispatch<SetStateAction<boolean>>;
}

const FormRegistry: React.FC<FormRegistryProps> = ({ setHasCount }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');

  async function handleRegistry(event: FormEvent) {
    event.preventDefault();

    const data = await api.post('/users/register', {
      name,
      email,
      password,
      category,
    });

    if (data.data.error) {
      alert(data.data.error);
    } else if (data.status === 201) {
      alert('Conta criada com sucesso');
      setHasCount(true);
    } else {
      alert('Erro');
    }
  }

  return (
    <form className="registry">
      <fieldset>
        <legend>Registro</legend>
        <div className="field">
          Nome
          <input
            type="name"
            name="name"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
            required
          />
        </div>
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
        <div className="categories">
          <label>
            <div className="category" id="consumer">
              <img src={consumerIcon} alt="Icon consumidor" />
              Consumidor
              <input
                type="radio"
                name="react-tips"
                value="consumer"
                checked={true}
                onSelect={() => {}}
                className="form-check-input"
                onChange={({ target }) => {
                  setCategory(target.value);
                }}
              />
            </div>
          </label>
          <label>
            <div className="category" id="salesman">
              <img src={salesmanIcon} alt="Icon Feirante" />
              Feirante
              <input
                type="radio"
                name="react-tips"
                value="salesman"
                onChange={({ target }) => {
                  setCategory(target.value);
                }}
                className="form-check-input"
              />
            </div>
          </label>
        </div>
      </fieldset>
      <button type="submit" onClick={handleRegistry}>
        Criar conta
      </button>
      <p className="no-count">
        Já tem uma conta?{' '}
        <span
          onClick={() => {
            setHasCount(true);
          }}
        >
          Faça o login
        </span>
      </p>
    </form>
  );
};

export default FormRegistry;
