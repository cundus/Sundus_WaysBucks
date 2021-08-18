import { Card } from "react-bootstrap";

const CardList = ({ item }) => {
  console.log(item.name);
  return (
    <div>
      <Card
        style={{
          width: "16rem",
          borderRadius: "10px",
          background: "#F6DADA",
        }}
        key={item.id}
      >
        <Card.Img
          variant="top"
          src={item.picture}
          style={{
            objectFit: "cover",
            width: "16rem",
            height: "20rem",
            borderRadius: "10px",
          }}
        />
        <Card.Body>
          <p className="color-dominant m-0">
            <strong>{item.name}</strong>
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
