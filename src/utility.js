// utility.js

// This function implements the Fisher-Yates shuffle algorithm to randomly shuffle an array
// in this case, this will be used to shuffle the cards and no marks are expected as this code has been 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
}

export default shuffleArray;
