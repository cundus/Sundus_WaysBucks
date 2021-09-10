import React, { useContext, useEffect, useState } from "react";
import "./Cartpage.css";
// import MockPhoto from "../../assets/Rectangle 4.svg";
import TrashBin from "../../assets/TrashBin.svg";
import BillIcon from "../../assets/Vectorbill.svg";
import EmptyCartImage from "../../assets/emptycart.png";
import { WBContext } from "../../context/WBContext";
import { API } from "../../config/api";
import { useHistory } from "react-router";
import PopUp from "../../components/modal/PopUp";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

const CartPage = () => {
  const { state, dispatch } = useContext(WBContext);
  const [attachment, setAttachmet] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      state.cart.map((product) => product.subTotal).reduce((a, b) => a + b, 0)
    );
  }, [state.cart]);
  // console.log(state);

  return state.cart.length > 0 ? (
    <div>
      <div className="d-flex justify-content-center color-dominant cartContainer">
        <div className="cart-left-container me-5">
          <h3>My Cart</h3>
          <p>Review Your Order</p>
          <hr className="solid" />
          <div className="productCardContainer">
            {state.cart.map((item) => (
              <CartCard item={item} dispatch={dispatch} />
            ))}
          </div>
          <hr className="solid" />

          <div className="d-flex">
            <div className="subtotal-info">
              <hr className="solid" />
              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>{formatPrice(total)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Qty</p>
                <p>{state.cart.length}</p>
              </div>
              <hr className="solid" />
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>{formatPrice(total)}</p>
              </div>
            </div>
            <div>
              <div className="attachment">
                <label htmlFor="upload" className="mt-1 cursor-pointer">
                  {attachment && attachment !== null ? (
                    <img
                      src={URL.createObjectURL(attachment)}
                      alt="attachment"
                      className="attachment-preview"
                    />
                  ) : (
                    <>
                      <img src={BillIcon} alt="" className="mb-2" />
                      <p>Attach Of Transaction</p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  hidden
                  id="upload"
                  name="attachment"
                  onChange={(e) => setAttachmet(e.target.files[0])}
                />
              </div>
              {attachment && attachment !== null ? (
                <center>
                  <label
                    htmlFor="upload"
                    className="change-attachment cursor-pointer"
                  >
                    Change Attachment
                  </label>
                </center>
              ) : null}
            </div>
          </div>
        </div>

        <div className="cart-right-container ms-4">
          <CartForm
            total={total}
            attachment={attachment}
            cart={state.cart}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
};

const CartCard = ({ item, dispatch }) => {
  // console.log("ini Item", item);

  const [product, setProduct] = useState({});
  useEffect(() => {
    getProductById();
  }, [item]);

  const getProductById = async () => {
    try {
      const res = await API.get(`/product/${item.id}`);
      // console.log("responcart", res);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const topping =
    item.toppings.length > 0
      ? item.toppings.map((topping) => topping.title).join(", ")
      : "-";

  const handleRemoveFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };

  const saveCart = () => {
    dispatch({
      type: "SAVE_CART",
    });
    dispatch({
      type: "GET_TOTAL_CART",
    });
  };

  const onIncrease = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
    saveCart();
  };

  const onDecrease = () => {
    if (item.quantity > 1) {
      dispatch({
        type: "DECREASE_CART",
        payload: item,
      });
    } else {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: item,
      });
    }
    saveCart();
  };

  return (
    <div className="mb-3" key={item.id}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <img
            src={product.image}
            alt=""
            style={{
              height: "5rem",
              width: "4rem",
              objectFit: "cover",
              borderRadius: "10px",
              marginRight: "1em",
            }}
          />
          <div className="info-card">
            <h5>{product.title}</h5>
            <p className="quantity-info">
              Quantity :{" "}
              <span className="cursor-pointer" onClick={onDecrease}>
                &minus;
              </span>{" "}
              <span className="quantity-number">{item.quantity}</span>{" "}
              <span className="cursor-pointer" onClick={onIncrease}>
                &#43;
              </span>
            </p>
            <p>Topping : {topping}</p>
          </div>
        </div>
        <div className="mt-1">
          <p>{formatPrice(item.subTotal)}</p>
          <div
            className="cursor-pointer"
            style={{ textAlign: "right" }}
            onClick={handleRemoveFromCart}
          >
            <img src={TrashBin} alt="" width="17px" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartForm = ({ attachment, total, cart, dispatch }) => {
  const history = useHistory();
  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
    address: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (attachment === null) {
        setShowPop(true);
        setMessage("Payment Attachment is Required!");
        setSuccess(false);
        return false;
      }

      const order = [];

      cart.map((product) => {
        const toppings = [];
        product.toppings.forEach((topping) =>
          toppings.push({
            toppingId: topping.id,
          })
        );
        order.push({
          productId: product.id,
          quantity: product.quantity,
          subtotal: product.subTotal,
          toppings,
        });
      });

      console.log(JSON.stringify(order));

      const body = new FormData();
      body.append("name", data.name);
      body.append("address", data.address);
      body.append("zipCode", data.zipCode);
      body.append("phone", data.phone);
      body.append("email", data.email);
      body.append("attachment", attachment);
      body.append("total", total);
      body.append("order", JSON.stringify(order));

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      await API.post("/add-transaction", body, config);

      setShowPop(true);
      setMessage(
        "Thank you for ordering in us, please wait to verify you order"
      );
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closePopUp = () => {
    setShowPop(false);
    history.push("/profile");
    dispatch({
      type: "RESET_CART",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="form-dominant full-width mb-3 p-1"
          required
          name="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-dominant full-width mb-3 p-1"
          required
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          className="form-dominant full-width mb-3 p-1"
          required
          onChange={handleChange}
          name="phone"
        />
        <input
          type="number"
          placeholder="Pos Code"
          className="form-dominant full-width mb-3 p-1"
          required
          name="zipCode"
          onChange={handleChange}
        />
        <textarea
          placeholder="Address"
          rows="4"
          className="form-dominant full-width mb-3 p-1"
          required
          name="address"
          onChange={handleChange}
        />

        <button className="button-dominant full-width p-1" type="submit">
          Pay
        </button>
      </form>
      <PopUp
        show={showPop}
        hide={closePopUp}
        message={message}
        success={success}
      />
    </div>
  );
};

const EmptyCart = () => {
  const history = useHistory();

  return (
    <>
      <div className="text-center mt-5 mb-5">
        <img src={EmptyCartImage} alt="" width="500px" />
      </div>
      <div className="fs-3 text-center mt-5">
        Your Cart Is Empty, Please Check Our Products{" "}
        <span
          className="fw-bold cursor-pointer"
          onClick={() => history.push("/")}
        >
          Here
        </span>
      </div>
    </>
  );
};

export default CartPage;
