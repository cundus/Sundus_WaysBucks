import React from "react";
import "./Cartpage.css";
import MockPhoto from "../../assets/Rectangle 4.svg";
import TrashBin from "../../assets/TrashBin.svg";
import BillIcon from "../../assets/Vectorbill.svg";

const CartPage = () => {
  return (
    <div>
      <div className="d-flex justify-content-center color-dominant">
        <div className="left-container me-5">
          <h3>My Cart</h3>
          <p>Review Your Order</p>
          <hr className="solid" />
          <CartCard />
          <hr className="solid" />

          <div className="d-flex">
            <div className="subtotal-info">
              <hr className="solid" />
              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>69.000</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Qty</p>
                <p>2</p>
              </div>
              <hr className="solid" />
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>69.000</p>
              </div>
            </div>
            <div className="attachment">
              <label htmlFor="upload" className="mt-1 cursor-pointer">
                <img src={BillIcon} alt="" className="mb-2" />
                <p>Attach Of Transaction</p>
              </label>
              <input type="file" hidden id="upload" />
            </div>
          </div>
        </div>

        <div className="right-container ms-4">
          <CartForm />
        </div>
      </div>
    </div>
  );
};

const CartCard = ({ item }) => {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <img
            src={MockPhoto}
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
            <p>Judul</p>
            <p>Topping: ....</p>
          </div>
        </div>
        <div className="mt-1">
          <p>Price</p>
          <div className="cursor-pointer" style={{ textAlign: "right" }}>
            <img src={TrashBin} alt="" width="17px" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartForm = () => {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Name"
          className="form-dominant full-width mb-3 p-1"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form-dominant full-width mb-3 p-1"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          className="form-dominant full-width mb-3 p-1"
          required
        />
        <input
          type="text"
          placeholder="Pos Code"
          className="form-dominant full-width mb-3 p-1"
          required
        />
        <textarea
          placeholder="Address"
          rows="4"
          className="form-dominant full-width mb-3 p-1"
          required
        />

        <button className="button-dominant full-width p-1">Pay</button>
      </form>
    </div>
  );
};

export default CartPage;
