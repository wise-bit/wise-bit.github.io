// Author: Satrajit Chatterjee
// satrajit.tk

let board = [
  ['','',''],
  ['','',''],
  ['','','']
]

let blank = "";

let player = ["X", "O"];
let currentPlayer = null;

let lastStarterPlayer = null;

let available = [];

let maxWidth; // highest width while still fitting game on screen
let maxHeight; // highest height while still fitting game on screen
let s; //smaller dimension recorded for scaling purposes

let button;

let finished = false;

// AI variables
let AI = player[0];
let AI_score = 0;

let activateAI = false;

let x_wins = 0;
let y_wins = 0;
let draws = 0;

function dimensions() {

  if (windowHeight > 3*windowWidth/2) {
    maxWidth = windowWidth - 50;
    maxHeight = floor(windowWidth * 3/2);
  } else {
    maxWidth = floor(windowHeight * 2/3);
    maxHeight = windowHeight - 50;
  }
  s = maxWidth>maxHeight?maxHeight:maxWidth;

}

function resetBoard() {

  board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

  finished = false;

  if (lastStarterPlayer == null) 
    currentPlayer = floor(random(player.length));
  else
    currentPlayer = (lastStarterPlayer + 1) % player.length;
  
  lastStarterPlayer = currentPlayer;

  available = [];

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push(i*3+j);
    }
  }
  
}

function robotDriven() {
  frameRate(1);
}

function setup() {

  dimensions();
  console.log(maxWidth, maxHeight, windowWidth, windowHeight);
  createCanvas(maxWidth, maxHeight);
  resetBoard();

}

function mousePressed() {

  if (finished) {
    resetBoard();
    loop();
  } else {
    frameRate(100);
  }

  return false;
  
}

function touchStarted() {
  mousePressed();
  return false;
}

function randomMove() {

  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = floor(spot / 3);
  let j = spot % 3;
  board[i][j] = player[currentPlayer];
  
}

function switchPlayer() {
  currentPlayer = (currentPlayer + 1) % player.length;
}

function nextTurn() {

  if (available.length == 8)
    robotDriven();

  if (player[currentPlayer] == AI && activateAI) {
    
    optimalMoveX = -2;
    optimalMoveY = -2;
    optimalScore = -1;

    minimax(copy2Darray(board), AI, 0);
    
    // let predictedMove = optimalMove;
    // console.log(predictedMove);

    // let i = floor(predictedMove / 3);
    // let j = predictedMove % 3;

    let i = optimalMoveX;
    let j = optimalMoveY;

    console.log(optimalMoveX, optimalMoveY);

    if (optimalMoveX > -1 && board[i][j] == '') {

      // This removes predicted move from playable moves
      available = available.filter(function(value, index, arr){
        return value != i*3+j;
      });

      console.log(i,j, "available moves: ", available);

      board[i][j] = player[currentPlayer];
      
    } else {
      randomMove();
    }

    switchPlayer();

  } else {

    randomMove();
    switchPlayer();

  }

}

function threeEqual(a, b, c) {
  return a == b && b == c && a != '';
}

function getWinner(gameState) {

  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (threeEqual(gameState[i][0], gameState[i][1], gameState[i][2])) {
      winner = gameState[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (threeEqual(gameState[0][i], gameState[1][i], gameState[2][i])) {
      winner = gameState[0][i];
    }
  }

  // diagonal
  if (threeEqual(gameState[0][0], gameState[1][1], gameState[2][2])) {
    winner = gameState[0][0];
  }
  if (threeEqual(gameState[2][0], gameState[1][1], gameState[0][2])) {
    winner = gameState[2][0];
  }

  if (available.length == 0 && winner == null) {
    winner = "n"; // n means no winner = tie
  }

  if (winner != null || available.length == 0) {
    return winner;
  } else {
    return "";
  }

}

function drawScoreboard() {
  textSize(maxWidth / 20); 
  fill('black');
  textFont('Helvetica');
  stroke(255);
  // textStyle(ITALIC);
  textAlign(CENTER);
  text(`X wins: ${x_wins}`, maxWidth/5, maxHeight * 7.6/8);
  text(`O wins: ${y_wins}`, maxWidth/2, maxHeight * 7.6/8);
  text(`Draws: ${draws}`, maxWidth*4.1/5, maxHeight * 7.6/8);
}

function toggleAI() {
  activateAI = !activateAI;
}

function draw() {

  // button = createButton('Toggle AI');
  // button.position(0, 65);
  // button.mousePressed(toggleAI);

  background(255);

  drawScoreboard();

  let d = s / 3;

  // let w = maxWidth / 3;
  // let h = maxHeight * 0.8 / 3;

  let w = d;
  let h = d;

  let space = maxHeight / 6;
   
  fill('black');
  textFont('Helvetica');
  stroke(255);
  textAlign(CENTER);

  textStyle(ITALIC);
  textSize(maxWidth / 25);
  text("Auto", maxWidth/2, maxHeight*1/20);

  textStyle(NORMAL);
  textSize(maxWidth / 10);
  text("TIC-TAC-TOE", maxWidth/2, maxHeight*1/8);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {

      let x = d * (i);
      let y = d * (j);

      stroke(150);

      line(d, space, d, space + d*3);
      line(d*2, space, d*2, space + d*3);
      line(0, d + space, d*3, d + space);
      line(0, d*2 + space, d*3, d*2 + space);

      stroke(0);

      let spot = board[i][j];

      noFill();
      strokeWeight(d / 30);

      if (spot == player[1]) {
        ellipse(x + d/2, y + d/2 + space, d*0.6);
      } else if (spot == player[0]) {
        line(x + w*0.2, y + h*0.2 + space, x + w*0.8, y + h*0.8 + space);
        line(x + w*0.2, y + h*0.8 + space, x + w*0.8, y + h*0.2 + space);
      }

    }

  }

  let result = getWinner(board);

  if (result != "") {
    
    console.log(getWinner(board));

    noLoop();
    
    if (result == "X")
      x_wins += 1;
    else if (result == "O") 
      y_wins +=1 ;
    else if (result == "n")
      draws += 1;
    
    finished = true;

  }

  if (available.length > 0) 
    nextTurn();

}
