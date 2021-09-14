import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CardList = ({ item }) => {
  // console.log(item.name);
  const history = useHistory();

  // console.log(item);

  const handleDetail = () => {
    history.push(`product/${item.id}`);
  };
  return (
    <div>
      <Card
        className="cursor-pointer mb-5 cardProduct"
        style={{
          width: "16rem",
          borderRadius: "10px",
          background: "#F6DADA",
        }}
        key={item.id}
        onClick={handleDetail}
      >
        <Card.Img
          variant="top"
          src={item.image}
          style={{
            objectFit: "cover",
            width: "16rem",
            height: "20rem",
            borderRadius: "10px",
          }}
        />
        <Card.Body>
          <p className="color-dominant m-0">
            <strong>{item.title}</strong>
          </p>
          <Card.Text style={{ color: "#974A4A" }}>
            {item.price
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
              .slice(0, -3)}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardList;
