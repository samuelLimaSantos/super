import React, { useContext } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';
import { Context } from './Context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import newProduct from './pages/NewProduct';

const Routes: React.FC = () => {
  const { authenticated, category } = useContext(Context);
  function CustomRoute({ isPrivate, salesman, ...rest }: any) {
    if (isPrivate && !authenticated) {
      return <Redirect to="login" />;
    }

    if (isPrivate && !authenticated && salesman && category !== 'salesman') {
      return <Redirect to="login" />;
    }

    return <Route {...rest} />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute exact path="/" component={Home} />
        <CustomRoute path="/login" component={Login} />
        <CustomRoute path="/products" component={Products} isPrivate />
        <CustomRoute
          path="/newProduct"
          component={newProduct}
          isPrivate
          salesman
        />
        <CustomRoute component={() => <h1>Page not Found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
