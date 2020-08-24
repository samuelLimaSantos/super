import React, { useState, FormEvent, useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.css';
import Success from '../../components/Success';

const NewProduct: React.FC = () => {
  const history = useHistory();
  const token = localStorage.getItem('token')?.replace(/"/g, '');

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, SetIsSuccess] = useState(false);

  async function handleNewProduct(event: FormEvent) {
    event.preventDefault();

    if (
      title === '' ||
      image === '' ||
      value === '' ||
      amount === '' ||
      email === ''
    ) {
      return alert('Preencha todos os campos');
    }

    const data = await api.post(
      '/products',
      {
        title,
        image,
        value,
        amount,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.data.error) {
      return alert(data.data.error);
    }

    SetIsSuccess(true);
    setTimeout(() => {
      SetIsSuccess(false);
      history.push('/products');
    }, 1500);
  }

  return (
    <div className="page-new-product">
      {isSuccess && <Success title="Produto Cadastrado com sucesso!" />}
      <Header secondLabel="Sair" />
      <div className="container-new-product">
        <div className="content-new-product">
          <form>
            <fieldset>
              <legend>Cadastro de novo produto</legend>

              <div className="field-new-product">
                <label htmlFor="title">Título do produto</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={({ target }) => {
                    setTitle(target.value);
                  }}
                />
              </div>

              <div className="field-new-product">
                <label htmlFor="image">Link da imagem</label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={image}
                  onChange={({ target }) => {
                    setImage(target.value);
                  }}
                />
              </div>

              <div className="field-new-product">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={({ target }) => {
                    setEmail(target.value);
                  }}
                />
              </div>

              <div className="fieldNumber-new-product">
                <label htmlFor="amount">Quantidade no estoque</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={({ target }) => {
                    setAmount(target.value);
                  }}
                />
              </div>

              <div className="fieldNumber-new-product">
                <label htmlFor="price">Preço</label>

                <span>
                  R$
                  <input
                    type="number"
                    max="10000"
                    name="price"
                    id="price"
                    value={value}
                    onChange={({ target }) => {
                      setValue(target.value);
                    }}
                  />
                </span>
              </div>
            </fieldset>
            <div className="container-button">
              <button type="submit" onClick={handleNewProduct}>
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewProduct;
