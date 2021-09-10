import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/navbar/Header";

import "./App.css";
import Home from "./pages/homepage/Home";
import DetailProduct from "./pages/detailproduct/DetailProduct";
import CartPage from "./pages/cart/CartPage";
import Loader from "./components/loading/Loader";
import PrivateRoute from "./components/private/PrivateRoute";
import Profile from "./pages/profile/Profile";
import { WBContext } from "./context/WBContext";
import { API, setAuthToken } from "./config/api";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminRoute from "./components/private/AdminRoute";
import AddProduct from "./pages/addproduct/AddProduct";
import AddTopping from "./pages/addtopping/AddTopping";

const App = () => {
  const { state, dispatch } = useContext(WBContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return null;
        }
        setAuthToken(token);
        const getProfile = await API.get("/profile");
        console.log(getProfile);
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { ...getProfile.data.data },
        });
        dispatch({
          type: "UPDATE_CART",
        });
      } catch (error) {
        // console.log(error);
        dispatch({ type: "AUTH_ERROR" });
      }
    };
    checkUser();
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={DetailProduct} />
        <PrivateRoute exact path="/cart" component={CartPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <AdminRoute exact path="/dashboard" component={Dashboard} />
        <AdminRoute exact path="/add-product" component={AddProduct} />
        <AdminRoute exact path="/add-topping" component={AddTopping} />

        <Route exact path="/loading" component={Loader} />
      </Switch>
    </Router>
  );
};

export default App;
