import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

type CardDisplayProps = {
  cards: any[];
};

export const CardDisplay = ({ cards }: CardDisplayProps) => {
  return (
    <Container>
      <Row>
        {cards.map((card) => (
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={card.image} />
              <Card.Body>
                <Card.Title>{card.value + " " + card.suit}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
