import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import searchIcon from '../../assets/searchIcon.svg';

import './styles.css';
import Success from '../../components/Success';
import Footer from '../../components/Footer';

interface ProductsData {
  id: number;
  title: string;
  image: string;
  value: number;
  amount: string;
  name: string;
}

const Products: React.FC = () => {
  const token = localStorage.getItem('token')?.replace(/"/g, '');
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const Authorization = `Bearer ${token}`;

  useEffect(() => {
    async function getProducts() {
      const datas = await api.get('/products', {
        headers: {
          Authorization,
        },
      });

      setProducts(datas.data);
    }

    getProducts();
  }, [Authorization]);

  async function handleSearch() {
    if (search === '' || price === '') {
      alert('Campo vazios');
      return;
    }

    const datas = await api.get('/products/filter', {
      params: {
        title: search,
        price,
      },
    });

    const filteredProducts = datas.data;
    if (filteredProducts.length === 0) {
      alert('Nenhum resultado encontrado');
      return;
    }

    setProducts(filteredProducts);
  }

  async function handleBuy(id: number) {
    const inputNumber = document.querySelector(`input[name=name_${id}]`) as any;
    const quantity = inputNumber.value;

    if (!quantity) {
      return alert('Informe a quantidade desejada!');
    }

    const data = await api.put(
      `/products/${id}`,
      {
        quantity,
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.data.error) {
      return alert('Quantidade acima do estoque!');
    }

    console.log(data.data[0].id);
    const newProducts = products.map((product) => {
      if (product.id === data.data[0].id) {
        console.log(data.data);
        return data.data[0];
      }

      return product;
    });

    if (newProducts) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    }

    setProducts(newProducts);
  }

  return (
    <div className="product-page">
      {isSuccess && <Success title="Compra realizada com sucesso!" />}
      <Header secondLabel={'Sair'} products={true} />
      <section className="product-container">
        <div className="product-menu">
          <h1>Escolha já os seus produtos</h1>
          <div className="product-input">
            <div className="product-input-text">
              <input
                type="text"
                value={search}
                onChange={({ target }) => {
                  setSearch(target.value);
                }}
              />
              <span onClick={handleSearch}>
                <img src={searchIcon} alt="Search Icon" />
              </span>
            </div>

            <select
              name="price"
              id="price"
              value={price}
              onChange={({ target }) => {
                setPrice(target.value);
              }}
            >
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              <option value="10">Até R$ 10,00</option>
              <option value="25">Até R$ 25,00</option>
              <option value="30">Até R$ 30,00</option>
              <option value="35">Até R$ 35,00</option>
              <option value="40">Até R$ 40,00</option>
              <option value="1000000000000">Todos os preços</option>
            </select>
          </div>
        </div>
        <div className="line"></div>
        <div className="product-content">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt="image" />
              <h3 className="title">{product.title}</h3>
              <h3>
                R$ <span>{product.value}</span>
              </h3>

              <p className="vendor">Vendido por {product.name}</p>
              {Number(product.amount) > 0 ? (
                <>
                  <strong>
                    <p>Apenas {product.amount} em estoque!</p>
                  </strong>
                  <input
                    min={0}
                    type="number"
                    max={product.amount}
                    placeholder="Quantidade"
                    name={`name_${product.id}`}
                  />
                  <button
                    onClick={() => {
                      handleBuy(product.id);
                    }}
                  >
                    Comprar
                  </button>
                </>
              ) : (
                <h3>Produto Esgotado!!</h3>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
