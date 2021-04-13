import TicIcons from "./TicIcons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import "./Tic.css";

const itemArray = new Array(9).fill("empty");

const Tic = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMess, setWinMess] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMess("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMess(`${itemArray[0]} wins`);
    } else if (
      itemArray[3] === itemArray[4] &&
      itemArray[3] === itemArray[5] &&
      itemArray[3] !== "empty"
    ) {
      setWinMess(`${itemArray[3]} wins`);
    } else if (
      itemArray[6] === itemArray[7] &&
      itemArray[6] === itemArray[8] &&
      itemArray[6] !== "empty"
    ) {
      setWinMess(`${itemArray[6]} wins`);
    } else if (
      itemArray[0] === itemArray[3] &&
      itemArray[0] === itemArray[6] &&
      itemArray[0] !== "empty"
    ) {
      setWinMess(`${itemArray[0]} wins`);
    } else if (
      itemArray[1] === itemArray[4] &&
      itemArray[1] === itemArray[7] &&
      itemArray[1] !== "empty"
    ) {
      setWinMess(`${itemArray[1]} wins`);
    } else if (
      itemArray[2] === itemArray[5] &&
      itemArray[2] === itemArray[8] &&
      itemArray[2] !== "empty"
    ) {
      setWinMess(`${itemArray[2]} wins`);
    } else if (
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== "empty"
    ) {
      setWinMess(`${itemArray[0]} wins`);
    } else if (
      itemArray[6] === itemArray[4] &&
      itemArray[6] === itemArray[2] &&
      itemArray[6] !== "empty"
    ) {
      setWinMess(`${itemArray[6]} wins`);
    }
  };

  const changeItem = (itemNumber) => {
    if (winMess) {
      return toast(winMess, { type: "success" });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error" });
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          <h1
            style={{
              fontFamily: "fantasy",
              textAlign: "center",
              color: "#353535",
            }}
          >
            Tic Tac Toe Game
          </h1>
          {winMess ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMess}
              </h1>
              <Button color="success" block onClick={reloadGame}>
                Reload the game
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {isCross ? "Cross's" : "Circle's"} turn
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <TicIcons name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Tic;
