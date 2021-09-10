import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Add.css";
import UploadIcon from "../../assets/UploadIcon.svg";

import { API } from "../../config/api";
import { useHistory } from "react-router-dom";
import PopUp from "../../components/modal/PopUp";

const AddProduct = () => {
  const history = useHistory();
  const [preview, setPreview] = React.useState(null);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState();
  const [showPop, setShowPop] = React.useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("title", name);
      data.append("price", price);
      data.append("image", preview);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      await API.post("/add-product", data, config);
      setShowPop(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeAfterAdd = () => {
    setShowPop(false);
    history.push("/dashboard");
  };

  return (
    <div>
      <div className="add-form-container">
        <div className="left-container">
          <h2 className="color-dominant fw-bold mb-5">Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="ControlInput1">
              <Form.Control
                type="text"
                placeholder="Name Product"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="form-dominant color-dominant"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="ControlInput3">
              <Form.Control
                required
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-dominant color-dominant"
              />
            </Form.Group>

            <div className="form-dominant color-dominant uploadForm mb-5">
              <label
                htmlFor="upload"
                className="d-flex justify-content-between"
              >
                {preview ? preview.name : "Photo Product"}{" "}
                <img src={UploadIcon} alt="upload" width="15px" />
              </label>
              <input
                required
                type="file"
                hidden
                id="upload"
                name="photo"
                onChange={(e) => {
                  setPreview(e.target.files[0]);
                  // setImage(e.target.files[0].name);
                }}
              />
            </div>
            <center>
              <Button
                className="button-dominant medium-width mt-3"
                type="submit"
              >
                Add Product
              </Button>
            </center>
          </Form>
        </div>
        <div className="right-container-product">
          {preview && preview !== null ? (
            <img
              src={URL.createObjectURL(preview)}
              alt="preview"
              className="preview-image-product"
            />
          ) : (
            <h1>Preview</h1>
          )}
        </div>
      </div>
      <PopUp
        show={showPop}
        hide={closeAfterAdd}
        message="Success Add New Product"
        success={true}
      />
    </div>
  );
};

export default AddProduct;
