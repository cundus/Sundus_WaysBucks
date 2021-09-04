import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/navbar/Header";

import "./App.css";
import Home from "./pages/homepage/Home";
import DetailProduct from "./pages/detailproduct/DetailProduct";
import CartPage from "./pages/cart/CartPage";
import Loader from "./components/loading/Loader";
import PrivateRoute from "./components/private/PrivateRoute";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={DetailProduct} />
        <PrivateRoute exact path="/cart" component={CartPage} />
        <PrivateRoute exact path="/profile" component={Profile} />

        <Route exact path="/loading" component={Loader} />
      </Switch>
    </Router>
  );
};

export default App;
