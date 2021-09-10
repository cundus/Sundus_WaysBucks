import { Col, Row } from "react-bootstrap";
// import { data } from "../../data/fakedata";

import JumbotronPic from "../../assets/Jumbotron.svg";
import "./Home.css";
import CardList from "../../components/card/CardList";

import { useEffect, useState } from "react";
import { API } from "../../config/api";
import Loader from "../../components/loading/Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(data);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/products");
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("Error, Cannnot get Data!");
      }
    };
    getProduct();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home-container">
      <img src={JumbotronPic} alt="" className="d-flex mx-auto mb-5" />
      <div className="cardlist">
        <h2 className="color-dominant mb-5">
          <strong>Let's Order</strong>
        </h2>
        <Row>
          {data.map((item) => (
            <Col md={3} key={item.id}>
              <CardList item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
