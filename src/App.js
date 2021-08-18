import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/navbar/Header";

import "./App.css";
import Home from "./pages/homepage/Home";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/product/:id" component={DetailProduct} /> */}
        {/* <Route exact path="/add-product" component={AddProduct} /> */}
      </Switch>
    </Router>
  );
};

export default App;
