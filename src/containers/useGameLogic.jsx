import { useState } from "react";
import shuffleArray from "./utility";
import { TimerBanner } from "./TimerBanner";

//This manages the logic for the game. It shuffles the
export const useGameLogic = (initialCards) => {
  const shuffledCards = shuffleArray([...initialCards]);
  const [cards, setCards] = useState(shuffledCards);
  const [points, setPoints] = useState(0);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (cardId) => {
    const clickedCard = cards.find((card) => card.id === cardId);

    if (clickedCard.isMatched) {
      return; // Don't flip cards that are already matched.
    }
    //creates the array and state of the card when flipped/
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
    );

    const flippedCards = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched && card.id !== cardId
    );

    if (flippedCards.length === 1) {
      //If the two cards match then set isMatched to true and increase the points to 1.
      if (flippedCards[0].color === clickedCard.color) {
        setPoints(points + 1);
        updatedCards.find((card) => card.id === cardId).isMatched = true;
        updatedCards.find(
          (card) => card.id === flippedCards[0].id
        ).isMatched = true;
      } else {
        // if the colours are not matching, after a delay this will flip them back down.
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              !card.isMatched &&
              (card.id === cardId || card.id === flippedCards[0].id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
    }
    //update the state of the cards, like if any have been matched and etc.
    setCards(updatedCards);
    setMoves(moves + 1);
  };
  return { cards, points, moves, handleCardClick };
};
