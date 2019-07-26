// Author: Satrajit Chatterjee
// satrajit.tk

let board = [
  ['','',''],
  ['','',''],
  ['','','']
]

let player = ["X", "O"];
let currentPlayer = null;

let lastStarterPlayer = null;

let available = [];

let maxWidth;
let maxHeight;
let s; // smaller dimension

let finished = false;

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

  console.log(player.length);

  available = [];

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
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
  
}

function nextTurn() {

  if (available.length == 8)
    robotDriven();

  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = player[currentPlayer];
  currentPlayer = (currentPlayer + 1) % player.length;

}

function threeEqual(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWin() {

  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (threeEqual(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (threeEqual(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // diagonal
  if (threeEqual(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (threeEqual(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  if (winner == null && available.length == 0) {
    return "tie";
  } else {
    return winner;
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

function draw() {

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

  let result = checkWin();

  if (result != null) {
    
    noLoop();
    console.log(result);
    
    if (result == "X")
      x_wins += 1;
    else if (result == "O") 
      y_wins +=1 ;
    else 
      draws += 1;
    
    finished = true;

  }

  if (available.length > 0) 
    nextTurn();

}
