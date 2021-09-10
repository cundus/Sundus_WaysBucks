import { Modal } from "react-bootstrap";

import React from "react";

const PopUp = ({ show, hide, message, success }) => {
  const succeed = "text-center text-success p-2 mt-2";
  const failed = "text-center text-danger p-2 mt-2";

  return (
    <div>
      <Modal show={show} onHide={hide} centered>
        <p className={success ? succeed : failed}>{message}</p>
      </Modal>
    </div>
  );
};

export default PopUp;
