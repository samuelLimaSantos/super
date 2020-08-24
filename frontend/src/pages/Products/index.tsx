import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';
import api from '../../services/api';

const Products: React.FC = () => {
  const { handleLogout } = useContext(Context);
  const token = localStorage.getItem('token')?.replace(/"/g, '');
  const category = localStorage.getItem('category')?.replace(/"/g, '');
  const history = useHistory();

  category === 'salesman' ? console.log('vendendor') : console.log('comprador');

  useEffect(() => {
    (async () => {
      const datas = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(datas.data);
    })();
  });

  return (
    <div>
      <h1>Teste</h1>
      <button
        type="button"
        onClick={() => {
          handleLogout();
          setTimeout(() => {
            history.push('/login');
          }, 1000);
        }}
      >
        Sair
      </button>
    </div>
  );
};

export default Products;
