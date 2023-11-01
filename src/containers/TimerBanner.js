/*
 * TimerBanner.js - Display the timer, number of moves and number of points.
 * 
 * Pairs is free software; you can redistribute it and/or modify it under the
 * terms of the MIT license, but with ABSOLUTELY NO WARRANTY.
 */

import React, { useState } from "react";
import Card from "./Card";
import { useGameLogic } from "./useGameLogic";
import "./TimerBanner.css";

export const TimerBanner = () => {

  // Set the `seconds`, `isActive` and `userClicked` states.
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userClicked, setUserClicked] = useState(false);

  /**
   * Toggles the timer based on the current state of isActive and userClicked.
   *
   * @return {void} 
   */
  const toggleTimer = () => {
    if (!isActive && userClicked) {
      setIsActive(true);
    }
  };

  /**
   * Resets the timer by setting the seconds to 0, isActive to false, and userClicked to false.
   *
   * @param {none} none - This function does not take any parameters.
   * @return {none} This function does not return anything.
   */
  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    setUserClicked(false);
  };

  /**
   * Handles the right click event.
   *
   * @return {undefined} No return value.
   */
  const handleRightClick = () => {
    if (!isActive) {
      setIsActive(true);
      setUserClicked(true);
    }
  };

  const initialCards = [
    // The set of cards in an array with 2 of each colour but with a unique ID.
    // The `isMatched` variable is also set up to keep track of points.
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

  // Uses `useGameLogic`, defined in `useGameLogic.jsx`, to keep track of the
  // player's points and to check if the cards match.
  const { cards, points, moves, handleCardClick } = useGameLogic(initialCards);

  // This bit handles the timer.
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

  // This handles the "Start Game" button's styling.
  const buttonStyle = {
    backgroundColor: "blue",
    padding: "10px",
    borderRadius: "5px",
    textDecoration: "underline",
    cursor: "pointer",
  };

  // This defines a win condition.
  // If the player has achieved 10 points (yes I know using magic numbers is
  // not great, but it works) then it sets the contents of the page to the
  // win screen.
  if (points == 10) {
    return (
      <div className="win-screen">
        <h1 style={{ padding: "5px" }}>You Win</h1>
        <p>
          Press Reload or <kbd>F5</kbd> to play again
        </p>
        <p>
          Or press <kbd>Ctrl-W</kbd> to quit
        </p>
      </div>
    );
  }

  // This sets up the start button and the timer, moves and points banner.
  return (
    <div className="start-button">
      <div onContextMenu={(e) => e.preventDefault()} onClick={handleRightClick}>
        <h1 style={buttonStyle} onClick={toggleTimer}>
          Start Game
        </h1>
      </div>
      <div className="timer-banner">
        <p>Time: {seconds}s</p>
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
