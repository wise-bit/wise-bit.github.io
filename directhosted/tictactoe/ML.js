var optimalMoveX = -2;
var optimalMoveY = -2;
var optimalMove = -2;

var optimalScoreY = -1;

function minimax(gameState, currPlayer, rec) {

    if (getWinner(gameState) == AI) 
        return 1;
    if (getWinner(gameState) == player[1]) 
        return -1;

    var move = -1;
    var score = -2;

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {

            if (gameState[i][j] == '') { // Do any of this only if the move is valid

                var updatedBoard = copy2Darray(gameState);
                updatedBoard[i][j] = currPlayer;

                var moveScore = minimax(updatedBoard, switchPlayers(currPlayer), rec+1)*10 - rec;

                if (moveScore > optimalScore) {
                    // console.log(moveScore);
                    optimalScore = moveScore;
                    optimalMove = i*3 + j;
                    optimalMoveX = i;
                    optimalMoveY = j;
                }

            }

        }
    }

    if (optimalMove == -1) 
        return 0;
    
    // console.log(rec, score, move);
    return score;

}

function switchPlayers(currPlayer) {
    if (currPlayer == "X") 
        return "O";
    return "X";
}

function copy2Darray(original) {
    var newArr = [];

    for (let i = 0; i < original.length; i++) {
        newArr.push(original[i].slice());
    }

    return newArr;
}
