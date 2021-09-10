// import { data, topping } from "../../data/fakedata";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Loader from "../../components/loading/Loader";

import "./product.css";
import { useContext } from "react";
import { WBContext } from "../../context/WBContext";
import LoginModal from "../../components/modal/LoginModal";
import { API } from "../../config/api";
import PopUp from "../../components/modal/PopUp";

const DetailProduct = () => {
  const { state, dispatch } = useContext(WBContext);
  const [dataProduct, setDataProduct] = useState({});
  const [dataTopping, setDataTopping] = useState([]);
  const [checkedToppings, setCheckedToppings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  // ------ state for Pop Up Notification
  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  // console.log("ini checked Toppings", id);

  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  useEffect(() => {
    const getProductAndTopping = async () => {
      try {
        setLoading(true);
        const product = await API.get(`/product/${id}`);
        const topping = await API.get("/toppings");

        setDataProduct(product.data.data);
        setDataTopping(topping.data.data);
        setLoading(false);
        // console.log(product, topping);
      } catch (error) {
        console.log(error);
        alert("Error, cannot get data!");
      }
    };

    getProductAndTopping();
  }, []);

  const handleChangeTopping = (e) => {
    setCheckedToppings({
      ...checkedToppings,
      [e.target.id]: e.target.checked,
    });
  };

  const selectedToppingsId = [];
  for (let key in checkedToppings) {
    checkedToppings[key]
      ? selectedToppingsId.push(+key)
      : selectedToppingsId.splice(+key, 1);
  }

  const selectedToppings = selectedToppingsId.map((selectedToppingId) =>
    dataTopping.find((topping) => topping.id === +selectedToppingId)
  );

  const subTotal = selectedToppings
    .map((selectedTopping) => selectedTopping.price)
    .reduce((prev, curr) => prev + curr, dataProduct.price);

  // console.log(selectedToppingsId);

  const AddToCart = (e) => {
    e.preventDefault();

    console.log(selectedToppingsId);

    if (state.isLogin === true) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: dataProduct.id,
          toppings: selectedToppings,
          initialPrice: subTotal,
          quantity: 1,
          subTotal: subTotal,
        },
      });
      dispatch({
        type: "SAVE_CART",
      });
      setShowPop(true);
      setMessage("Success added item to cart!");
      setSuccess(true);
    } else {
      setShowLogin(true);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="detail-product-container">
      <div className="d-flex justify-content-center">
        <div className="photo">
          <img src={dataProduct.image} alt="..." className="photo-detail" />
        </div>
        <div className="right color-dominant">
          <h1>
            <strong>{dataProduct.title}</strong>
          </h1>
          <h4>{formatPrice(dataProduct.price)}</h4>
          <h3 className="mt-5">Topping</h3>
          <div className="topping-container">
            <Row>
              {dataTopping.map((item) => (
                <Col sm={3} key={item.id}>
                  <ToppingCheckbox
                    item={item}
                    handleChange={handleChangeTopping}
                  />
                </Col>
              ))}
            </Row>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <h4>Total</h4>
            <h4>{formatPrice(subTotal)}</h4>
          </div>
          <button
            className="button-dominant full-width mt-3"
            onClick={AddToCart}
          >
            Add Cart
          </button>
          <LoginModal
            show={showLogin}
            hide={() => setShowLogin(false)}
            dispatch={dispatch}
          />
        </div>
      </div>
      <PopUp
        show={showPop}
        hide={() => setShowPop(false)}
        message={message}
        success={success}
      />
    </div>
  );
};

export const ToppingCheckbox = ({ item, handleChange }) => {
  return (
    <div>
      <input type="checkbox" id={+item.id} onChange={handleChange} />
      <label htmlFor={+item.id} className="topping-label">
        <img src={item.image} alt="..." className="card-topping-photo" />

        <p className="">{item.title}</p>
      </label>
    </div>
  );
};

export default DetailProduct;
