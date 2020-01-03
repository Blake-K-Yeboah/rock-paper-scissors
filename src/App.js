import React, { useState } from 'react';
import './App.scss';

function Home({ setGameStatus }) {
  return (
    <div className="main-content">

      <h1 className="title">Rock paper Scissors</h1>

      <p className="sub-text">Welcome To Rock Paper Scissors! To Play a game hit the button below!</p>

      <button className="game-btn" onClick={setGameStatus.bind(this, true)}>Start Game</button>

    </div>
  )
}

function Game(props) {

  const [status, setStatus] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [complete, setComplete] = useState(false);

  const clickHandler = (choice) => {

    props.setUserChoice(choice);

    let choices = ['rock', 'paper', 'scissors'];

    if (choices[Math.floor(Math.random() * 3)] === computerChoice) {
      setComputerChoice(choices[Math.floor(Math.random() * 3 - 1)]);
    } else {
      setComputerChoice(choices[Math.floor(Math.random() * 3)]);
    }
  }

  const playGame = () => {
    let choice = props.userChoice;

    if (choice === null) {

      alert('You Must Pick An Option To Play');

    } else {

      let span = document.querySelector('#computerChoice');

      switch (choice) {

        case 'rock':

          computerChoice === 'paper' ? setStatus('Lost') : computerChoice === 'scissors' ? setStatus('Won') : setStatus('Tied');

          span.textContent = computerChoice;

          break;

        case 'scissors':

          computerChoice === 'paper' ? setStatus('Won') : computerChoice === 'scissors' ? setStatus('Tied') : setStatus('Lost');

          span.textContent = computerChoice;

          break;

        case 'paper':

          computerChoice === 'paper' ? setStatus('Tied') : computerChoice === 'scissors' ? setStatus('Lost') : setStatus('Won');

          span.textContent = computerChoice;

          break;

        default:
          console.log("This shouldnt Happen");
      }

      setComplete(true);
    }
  }
  return (
    <div className="game">
      <div className="user-section">
        <h2 className="title">Your Choice: </h2>
        <ul className="options">
          <button className={`option-btn ${props.userChoice === "rock" ? 'active' : ''}`} key="rock" id="rock" onClick={clickHandler.bind(this, 'rock')}>
            <img src="rock.png" alt="rock-icon" />
          </button>
          <button className={`option-btn ${props.userChoice === "scissors" ? 'active' : ''}`} key="scissors" id="scissors" onClick={clickHandler.bind(this, 'scissors')}>
            <img src="scissors.png" alt="scissors-icon" />
          </button>
          <button className={`option-btn ${props.userChoice === "paper" ? 'active' : ''}`} key="paper" id="paper" onClick={clickHandler.bind(this, 'paper')}>
            <img src="paper.png" alt="paper-icon" />
          </button>
        </ul>
        <button className="play-btn" onClick={playGame}>Play</button>
      </div>
      <div className={`computer-section ${complete ? 'shown' : ''}`}>
        <p>The Computer Chose <span id="computerChoice"></span>. You {status}!</p>
      </div>
    </div>
  )
}

function App() {

  const [gameStatus, setGameStatus] = useState(false);
  const [userChoice, setUserChoice] = useState(null);

  return (
    <div className="App">
      {gameStatus ? <Game userChoice={userChoice} setUserChoice={setUserChoice} /> : <Home setGameStatus={setGameStatus} />}
    </div>
  );
}

export default App;
