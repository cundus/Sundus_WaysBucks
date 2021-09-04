// import { data, topping } from "../../data/fakedata";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Loader from "../../components/loading/Loader";

import "./product.css";
import { useContext } from "react";
import { WBContext } from "../../context/WBContext";
import LoginModal from "../../components/modal/LoginModal";
import { API } from "../../config/api";

const DetailProduct = () => {
  const { state, dispatch } = useContext(WBContext);
  const [dataProduct, setDataProduct] = useState({});
  const [dataTopping, setDataTopping] = useState([]);
  const [checkedToppings, setCheckedToppings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { id } = useParams();

  // console.log("ini checked Toppings", dataTopping);

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

  console.log(selectedToppingsId);

  const AddToCart = (e) => {
    e.preventDefault();

    if (state.isLogin === true) {
      dispatch({
        type: "ADD_CART",
        payload: { id, subTotal, toppings: selectedToppingsId },
      });
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
          <LoginModal show={showLogin} hide={() => setShowLogin(false)} />
        </div>
      </div>
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
