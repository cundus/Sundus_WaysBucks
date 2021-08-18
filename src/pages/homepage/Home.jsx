import { Col, Row } from "react-bootstrap";
import { data } from "../../data/fakedata";

import JumbotronPic from "../../assets/Jumbotron.svg";
import "./Home.css";
import CardList from "../../components/card/CardList";

const Home = () => {
  return (
    <div className="home-container">
      <img src={JumbotronPic} alt="" className="d-flex mx-auto mb-5" />
      <div className="cardlist">
        <h2 className="color-dominant mb-5">
          <strong>Let's Order</strong>
        </h2>
        <Row>
          {data.map((item, index) => (
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
