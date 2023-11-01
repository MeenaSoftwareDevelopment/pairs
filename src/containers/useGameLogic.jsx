import { useState } from "react";
import shuffleArray from "./utility";
import { TimerBanner } from "./TimerBanner";

/**
 * Generates the game logic for the Pairs game.
 *
 * @param {Array} initialCards - The initial set of cards for the game.
 * @return {Object} - An object containing the current state of the game, including the cards, points, moves, and a function to handle card clicks.
 */
export const useGameLogic = (initialCards) => {
  const shuffledCards = shuffleArray([...initialCards]);
  const [cards, setCards] = useState(shuffledCards);
  const [points, setPoints] = useState(0);
  const [moves, setMoves] = useState(0);

  // Handles what happens when a card is clicked.
  const handleCardClick = (cardId) => {
    const clickedCard = cards.find((card) => card.id === cardId);

    if (clickedCard.isMatched) {
      // If the card's already been clicked, ignore it.
      return; 
    }
    
    // If the cards match, keep them permanently flipped.
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
    );
 
    // If the card's been flipped, but doesn't match the other card, flip them 
    // back down.
    // I think so anyway. God this is confusing.
    const flippedCards = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched && card.id !== cardId
    );

    if (flippedCards.length === 1) {
      // If the two cards match then set isMatched to true and increase the
      // points to 1.
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
    
    // Update the state of the cards and number of moves.
    setCards(updatedCards);
    setMoves(moves + 1);
  };

  // Return the current state of the game to be handled elsewhere.
  return { cards, points, moves, handleCardClick };
};
