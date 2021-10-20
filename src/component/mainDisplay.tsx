type MainDisplayProps = {
  deckId: string;
  remainingCards: number;
  shuffled: boolean;
};

export const MainDisplay = ({
  deckId,
  remainingCards,
  shuffled,
}: MainDisplayProps) => {
  return (
    <div>
      <h1>Your Deck ID is: {deckId}</h1>
      <p>The number of remaining cards: {remainingCards.toString()}</p>
      {shuffled ? <p>Shuffled: Already</p> : <p>Shuffled: Not yet</p>}
    </div>
  );
};
