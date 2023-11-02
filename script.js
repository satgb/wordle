import {WORDS} from "./words.js";

let guessNumber = 0;
let tileNumber = 0;
let guess = [];
let word = WORDS[Math.floor(Math.random() * WORDS.length)].split("");
let alert = document.getElementById("alert").children[0];

//let modeBox = document.getElementById("mode");

console.log(word.join(""));

document.addEventListener('keyup', (event) => 
{
  if(guessNumber === 6)
    return;
  
  alert.innerText = "";
  let key = String(event.key);

  if(key === "Enter")
    checkGuess();
  	
  if(key === "Backspace")
    removeLetter();

  //g: group - return all matches 
  //i: ignore case
  if(key.match(/[a-z]/gi) !== null && key.length === 1)
    addLetter(key.toLowerCase());
  
});

function setupBoard()
{
  let board = document.getElementById("board");

  for(let i = 0; i < 6; i++)
  {
    let row = document.createElement("div");
    row.className = "row";
    
    for(let j = 0; j < 5; j++)
    {
      let tile = document.createElement("div");
		  tile.className = "tile";
      row.appendChild(tile);
    }
    
    board.appendChild(row);
  }
}

function addLetter(letter)
{
  if(tileNumber === 5)
    return;
    
  let tile = document.getElementsByClassName("row")[guessNumber].children[tileNumber];
  tile.textContent = letter;
  tileNumber++;
  guess.push(letter);
}

function removeLetter()
{
  if(tileNumber === 0)
    return;
  
  let tile = document.getElementsByClassName("row")[guessNumber].children[--tileNumber];
  tile.textContent = "";
  guess.pop();
}

function checkGuess()
{
  if(guess.length !== 5)
  {
    alert.innerText = "Not enough letters";
    return;
  }	
    
  //check if guess is an actual word
  if(!WORDS.includes(guess.join("")))
  {
    alert.innerText = "Not in word list";
    return;
  }

  /*if(guessNumber > 0 && modeBox.checked)
  {
    console.log(guessNumber);
  }
  */

  //clone arrays for editing 
  let w = [...word];	
  let g = [...guess];	
  let row = document.getElementsByClassName("row")[guessNumber];
  let tile = row.children;
  let letterPosition;

  //look for correct letters
  for(let i = 0; i < 5; i++)
  {
    if(w[i] === g[i])
    {
      w[i] = g[i] = "#";
      tile[i].style.backgroundColor = "green";
    }
  }
  
  //look for incorrect letters
  for(let i = 0; i < 5; i++)
  {
    if(g[i] !== "#")	//skip checked/correct letters
    {
      letterPosition = w.indexOf(g[i]);
      if(letterPosition === -1)
      {
        tile[i].style.backgroundColor = "lightgray";
      }
      else
      {
        w[letterPosition] = g[i] = "#";
        tile[i].style.backgroundColor = "yellow";
      }
    }
  }

  if(guess.join("") === word.join(""))
  {
    alert.innerText = "Nice";
    guessNumber = 5;
  }
  else
  {
  	if(guessNumber === 5)	//no guesses left
    {
      alert.innerText = "The word was: " + word.join("");
    }
    else
    {
      guess = [];
      tileNumber = 0;
    }
  }
  
  guessNumber++;
  //modeBox.disabled = true;
}

setupBoard();