import { useContext } from "react";
import { useEffect, useState } from "react";
import "./profile.css";

import QRC from "../../assets/qr-code.svg";
import LogoIcon from "../../assets/Logo.svg";
import PhotoPlaceholder from "../../assets/profile.png";
import { WBContext } from "../../context/WBContext";
import { API } from "../../config/api";
import Loader from "../../components/loading/Loader";
import moment from "moment";

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

const Profile = () => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getUser();
  }, [status]);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const resProfile = await API.get("/profile");
      const resTransaction = await API.get("/profile/transactions");

      // console.log("get Product", resTransaction, resProfile);
      setTransactions(resTransaction.data.data);
      setUser(resProfile.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  console.log("state USer", user);

  if (isLoading) {
    return <Loader />;
  }

  const onChangePhoto = async (e) => {
    try {
      e.preventDefault();
      setStatus(true);
      setIsLoading(true);

      const data = new FormData();

      data.append("picture", e.target.files[0]);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      await API.patch(`/profile`, data, config);

      setStatus(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const path = "http://localhost:4000/uploads/picture/";

  return (
    <div className="mt-5 color-dominant">
      <div className="d-flex justify-content-evenly ">
        <div className="">
          <p className="title-profile">My Profile</p>
          <div className="d-flex">
            <div>
              <label htmlFor="uploadProfile" className="cursor-pointer">
                <img
                  src={!user.picture ? PhotoPlaceholder : path + user.picture}
                  alt="user"
                  className="profile-pic"
                />
              </label>
              <input
                type="file"
                name="picture"
                id="uploadProfile"
                hidden
                onChange={onChangePhoto}
              />
            </div>
            <div className="">
              <p className="profile-field">Full Name</p>
              <p className="profile-field-content">{user.name}</p>
              <p className="profile-field">Email</p>
              <p className="profile-field-content">{user.email}</p>
            </div>
          </div>
        </div>
        <div
          className=""
          style={{ overflow: "auto", height: "80vh", width: "36rem" }}
        >
          <p className="title-profile">My Transaction</p>
          <div>
            {transactions
              ? transactions.map((transaction) => (
                  <TransactionCard
                    transaction={transaction}
                    setStatus={setStatus}
                    key={transaction.id}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TransactionCard = ({ transaction, setStatus }) => {
  const status = transaction.status;

  // Action For Complete
  const onAction = async (value, e) => {
    e.preventDefault();

    setStatus(true);
    const body = { status: value };
    await API.patch(`/transaction/${transaction.id}`, body);
    setStatus(false);
  };
  //   console.log(item, transaction);

  return (
    <div className="TransactionCardContainer">
      <div className="leftCard">
        {transaction.order.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <div className="right-logo">
        <img
          src={LogoIcon}
          alt="waysbean"
          style={{ width: "3.5rem", margin: "auto" }}
        />
        <img
          src={QRC}
          alt="qrcode"
          style={{ width: "5rem", margin: "auto", marginBottom: "10px" }}
        />
        <div
          className={
            status === "Success"
              ? "success"
              : status === "Waiting Approve"
              ? "wait"
              : status === "Cancel"
              ? "cancel"
              : status === "On The Way" && "otw"
          }
        >
          <p className="status-text">{status}</p>
        </div>
        {status === "On The Way" ? (
          <p
            className="cursor-pointer btn-success-user"
            onClick={(e) => onAction("Success", e)}
          >
            Complete
          </p>
        ) : null}
        <p className="subTotal">Sub Total : {formatPrice(transaction.total)}</p>
      </div>
    </div>
  );
};

const ProductCard = ({ item }) => {
  // console.log("ini adalah item product", item);
  const today = moment().format("dddd");
  const todayDate = moment().format("D MMMM YYYY");
  const path = "http://localhost:4000/uploads/products/";

  const topping =
    item.toppings.length > 0
      ? item.toppings.map((topping) => topping.toppings.title).join(", ")
      : "-";

  return (
    <div className="productCard">
      <img src={path + item.product.image} alt="" className="cardImage" />
      <div className="cardBody">
        <p className="cardBody-name">{item.product.title}</p>
        <p className="cardBody-date">
          <span className="fw-bold">{today}</span>, {todayDate}
        </p>
        <p>Topping : {topping}</p>
        <p className="cardBody-quantity">Qty : {item.quantity}</p>
        <p className="cardBody-sub">Price : {formatPrice(item.subtotal)}</p>
      </div>
    </div>
  );
};

export default Profile;
