import { Modal } from "react-bootstrap";

const DetailTransaction = ({ show, hide, data }) => {
  const {
    address,
    attachment,
    email,
    name,
    phone,
    total,
    userOrder,
    zipCode,
    order,
  } = data;
  console.log(userOrder);

  const path = "http://localhost:4000/uploads/transaction/";

  return (
    <div>
      <Modal
        show={show}
        onHide={hide}
        size="xl"
        closeButton
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Detail Transaction
          </Modal.Title>
        </Modal.Header>
        <div className="detail-modal-container">
          <div>
            <div className="userOrder">
              <h5 className="color-dominant">Ordered By : </h5>
              <p>Name : {userOrder.name}</p>
              <p>Email : {userOrder.email}</p>
            </div>
            <div>
              <h5 className="color-dominant">Payment Attachment :</h5>
              <img
                src={path + attachment}
                alt=""
                className="attachment-detail"
              />
            </div>
          </div>
          <div>
            <h5>Product Ordered</h5>
            <div>
              {order.map((product, i) => (
                <div className="productOrdered">
                  <h6>
                    {i + 1}. {product.product.title}
                  </h6>
                  <p>
                    Topping :{" "}
                    {product.toppings
                      .map((topping) => topping.toppings.title)
                      .join(", ")}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="shippingAddress">
            <h5>Shipping Address</h5>
            <div>
              <p>To : {name}</p>
              <p>Phone : {phone}</p>
              <p>Email : {email} </p>
              <p>Address : {address}</p>
              <p>Zipcode : {zipCode}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DetailTransaction;
