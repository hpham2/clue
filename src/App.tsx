import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./App.css";
import { CardDisplay } from "./component/cardDisplay";
import { MainDisplay } from "./component/mainDisplay";

function App() {
  const [deckInfo, setDeckInfo] = useState({
    deckId: "",
    remainingCards: 0,
    shuffled: false,
  });

  const [cardDrawn, setCardDrawn] = useState({
    image: "",
    value: "",
    suit: "",
    code: "",
  });

  const [pileImageLink, setPileImageLink] = useState([]);

  const createNewDeck = () =>
    fetch("http://deckofcardsapi.com/api/deck/new/shuffle/")
      .then((res) => res.json())
      .then((result) => {
        setDeckInfo({
          deckId: result.deck_id,
          remainingCards: result.remaining,
          shuffled: result.shuffled,
        });
      });

  const drawCards = () => {
    const drawLink =
      "http://deckofcardsapi.com/api/deck/" +
      deckInfo.deckId +
      "/draw/?count=1";
    fetch(drawLink)
      .then((res) => res.json())
      .then((result) => {
        setDeckInfo({
          deckId: result.deck_id,
          remainingCards: result.remaining,
          shuffled: result.shuffled,
        });
        setCardDrawn(result.cards[0]);
      });
  };

  const addToPile = () => {
    const addToPileLink =
      "http://deckofcardsapi.com/api/deck/" +
      deckInfo.deckId +
      "/pile/your_piles/add/?cards=" +
      cardDrawn.code;
    fetch(addToPileLink);
  };

  const showPile = () => {
    const showPileLink =
      "http://deckofcardsapi.com/api/deck/" +
      deckInfo.deckId +
      "/pile/your_piles/list/";

    fetch(showPileLink)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.piles.your_piles.cards);
        setPileImageLink(result.piles.your_piles.cards);
      });
  };

  return (
    <div className="App">
      <MainDisplay
        deckId={deckInfo.deckId}
        remainingCards={deckInfo.remainingCards}
        shuffled={deckInfo.shuffled}
      ></MainDisplay>

      <Button id="create-new-deck" onClick={createNewDeck}>
        Create New Deck
      </Button>

      <br />

      <Button id="draw-card" style={{ margin: "5px" }} onClick={drawCards}>
        Draw Card
      </Button>

      <CardDisplay cards={[cardDrawn]}></CardDisplay>

      <br />

      <Button id="add-to-pile" style={{ margin: "5px" }} onClick={addToPile}>
        Add to pile
      </Button>

      <br />

      <Button id="add-to-pile" style={{ margin: "5px" }} onClick={showPile}>
        Show pile
      </Button>

      <CardDisplay cards={pileImageLink}></CardDisplay>
    </div>
  );
}

export default App;
