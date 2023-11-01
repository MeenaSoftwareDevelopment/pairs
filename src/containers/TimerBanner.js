import React, { useState } from "react";
import Card from "./Card";
import { useGameLogic } from "./useGameLogic";
import "./TimerBanner.css";

const TimerBanner = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userClicked, setUserClicked] = useState(false);

  const toggleTimer = () => {
    if (!isActive && userClicked) {
      setIsActive(true);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    setUserClicked(false);
  };

  const handleRightClick = () => {
    if (!isActive) {
      setIsActive(true);
      setUserClicked(true);
    }
  };

  const initialCards = [
    // set of cards in an array with 2 of each colour but with unique ID.
    // isMatched is also set up to keep track of points
    { id: 2, color: "#ff0000", isFlipped: false, isMatched: false },
    { id: 1, color: "#ff0000", isFlipped: false, isMatched: false },

    { id: 3, color: "#00ffff", isFlipped: false, isMatched: false },
    { id: 4, color: "#00ffff", isFlipped: false, isMatched: false },

    { id: 5, color: "#ff00ff", isFlipped: false, isMatched: false },
    { id: 6, color: "#ff00ff", isFlipped: false, isMatched: false },

    { id: 7, color: "#ffff00", isFlipped: false, isMatched: false },
    { id: 8, color: "#ffff00", isFlipped: false, isMatched: false },

    { id: 9, color: "#00ff00", isFlipped: false, isMatched: false },
    { id: 10, color: "#00ff00", isFlipped: false, isMatched: false },

    { id: 11, color: "#0000ff", isFlipped: false, isMatched: false },
    { id: 12, color: "#0000ff", isFlipped: false, isMatched: false },

    { id: 13, color: "#ff7f00", isFlipped: false, isMatched: false },
    { id: 14, color: "#ff7f00", isFlipped: false, isMatched: false },

    { id: 15, color: "#7f7f7f", isFlipped: false, isMatched: false },
    { id: 16, color: "#7f7f7f", isFlipped: false, isMatched: false },

    { id: 17, color: "#ff007f", isFlipped: false, isMatched: false },
    { id: 18, color: "#ff007f", isFlipped: false, isMatched: false },

    { id: 19, color: "#007f7f", isFlipped: false, isMatched: false },
    { id: 20, color: "#007f7f", isFlipped: false, isMatched: false },
  ];

  // uses the useGameLogic that was set up to keep track of the points and check if cards are matching/
  const { cards, points, moves, handleCardClick } = useGameLogic(initialCards);
  // Shows the game board and current points and the cards in a grid as mentioned previousliy

  React.useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="start">
      <div onContextMenu={(e) => e.preventDefault()} onClick={handleRightClick}>
        <h1>Start Game</h1>
        <p>Time: {seconds}s</p>
      </div>
    <div className="timer-banner">
      <div className="moves">
        <p>Moves: {moves}</p>
      </div>
      <div className="points">
        <p>Points: {points}</p>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            color={card.color}
            isFlipped={card.isFlipped}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default TimerBanner;
