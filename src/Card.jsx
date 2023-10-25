import React from 'react';

// This is your Card component. It represents one individual card on the game board.
function Card(props) {
    // We're pulling out the properties we passed to the Card when we created it in GameBoard.
    const { id, color, isFlipped, handleCardClick } = props;

    // This is a simple style for the card. If the card is flipped, it shows the color. 
    // Otherwise, it shows a default color.
    const cardStyle = {
        backgroundColor: isFlipped ? color : "#7200cd",
        width: '100px',
        height: '150px',
        border: '1px solid #000',
        display: 'inline-block',
        margin: '5px',
        cursor: 'pointer'  // Makes it look clickable.
    };

    // This is what the component will render - a div styled like a card.
    // When this div is clicked, it will run the handleCardClick function passed from GameBoard.
    return (
        <div style={cardStyle} onClick={() => handleCardClick(id)}></div>
    );
}

// This makes the Card component available to other parts of our app.
export default Card;
