import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CancelBtn from "../../assets/dashboard/btncancel.svg";
import ApproveBtn from "../../assets/dashboard/btnapprove.svg";
import CancelIcon from "../../assets/dashboard/cancel.svg";
import SuccessIcon from "../../assets/dashboard/success.svg";

import { API } from "../../config/api";
import Loader from "../../components/loading/Loader";
import DetailTransaction from "../../components/modal/DetailTransaction";

const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    getTransactions();
  }, [status]);

  // console.log(transaction);

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/transactions");
      // console.log(res.data.data);
      setIsLoading(false);
      setTransaction(res.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="containerTable">
        <p className="fs-3 mb-4 color-dominant fw-bold">Income Transaction</p>
        <table className="table table-bordered border-dark">
          <thead>
            <tr style={{ backgroundColor: "#E5E5E5" }}>
              <th scope="col" style={{ width: "2rem" }}>
                No
              </th>
              <th scope="col" style={{ width: "10rem" }}>
                Name
              </th>
              <th scope="col">Address</th>
              <th scope="col" style={{ width: "7rem" }}>
                Post Code
              </th>
              <th scope="col" style={{ width: "8rem" }}>
                Income
              </th>
              <th scope="col" style={{ width: "10rem" }}>
                Detail
              </th>
              <th scope="col" style={{ width: "10rem" }}>
                Status
              </th>
              <th scope="col" style={{ textAlign: "center", width: "15rem" }}>
                Action
              </th>
            </tr>
          </thead>

          {transaction
            ? transaction?.map((item, index) => (
                <Td
                  item={item}
                  key={item.id}
                  index={index}
                  setStatus={setStatus}
                />
              ))
            : null}
        </table>
      </div>
    </div>
  );
};

export const Td = ({ item, index, setStatus }) => {
  const [showDetail, setShowDetail] = useState(false);

  const onAction = async (value, e) => {
    e.preventDefault();
    setStatus(false);
    const body = { status: value };
    await API.patch(`/transaction/${item.id}`, body);
    setStatus(true);
  };

  const WaitingButton = (
    <div className="text-center">
      <img
        src={CancelBtn}
        alt=""
        onClick={(e) => onAction("Cancel", e)}
        className="cursor-pointer"
      />{" "}
      <img
        src={ApproveBtn}
        alt=""
        onClick={(e) => onAction("On The Way", e)}
        className="cursor-pointer"
      />
    </div>
  );

  return (
    <>
      <tbody>
        <tr>
          <th key={index} scope="row">
            {index + 1}
          </th>
          <td>{item.name}</td>
          <td>{item.address} </td>
          <td>{item.zipCode}</td>
          <td style={{ color: "#061E99" }}> {item.total}</td>
          <td
            className="cursor-pointer text-primary"
            onClick={() => setShowDetail(true)}
          >
            Detail Transaction
          </td>
          <td
            className={
              item.status === "Waiting Approve"
                ? "text-warning text-center"
                : item.status === "Cancel"
                ? "text-danger  text-center"
                : item.status === "Success"
                ? "text-success text-center"
                : item.status === "On The Way" && "text-primary text-center"
            }
          >
            {item.status}
          </td>
          <td>
            {item.status === "Waiting Approve" ? (
              WaitingButton
            ) : item.status === "Cancel" ? (
              <div className="text-center">
                <img src={CancelIcon} alt="" />
              </div>
            ) : item.status === "Success" || item.status === "On The Way" ? (
              <div className="text-center">
                <img src={SuccessIcon} alt="" className="text-center" />
              </div>
            ) : null}
          </td>
        </tr>
      </tbody>
      <DetailTransaction
        show={showDetail}
        hide={() => setShowDetail(false)}
        data={item}
      />
    </>
  );
};

export default Dashboard;
