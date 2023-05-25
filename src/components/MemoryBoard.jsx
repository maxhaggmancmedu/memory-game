import { v4 as uuidv4 } from 'uuid'
import styles from './styles/MemoryBoard.module.css'
import Controlls from './Controlls'
import { useEffect, useState } from 'react'
import Scoreboard from './Scoreboard';
import GameFinished from './GameFinished';

const MemoryBoard = () => {

    const numbersOnBoard = []
    const [gameIsActive, setGameIsActive] = useState(true)
    const [clickedCells, setClickedCells] = useState([]);
    const [flippedCells, setFlippedCells] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [allOpenedCards, setAllOpenedCards] = useState([]);
    const [playerTurn, setPlayerTurn] = useState('X')
    const [playerXScore, setPlayerXScore] = useState(0)
    const [playerOScore, setPlayerOScore] = useState(0)
    const [playerXCorrectGuesses, setplayerXCorrectGuesses] = useState([])
    const [playerOCorrectGuesses, setplayerOCorrectGuesses] = useState([])
    const [gameWinner, setGameWinner] = useState('')
    

    for (let i = 1; i < 19; i++) {
        numbersOnBoard.push({value: i})
    }

    const numbersOnBoardCopy = numbersOnBoard.map(x => x)
    const allNumbersOnBoard = numbersOnBoard.concat(numbersOnBoardCopy)
    
    let uuid;
    
    const allNumbersOnBoardWithId = allNumbersOnBoard.map(val => (
        uuid = uuidv4(),
        val = {...val, id: uuid}
    ))

    const [board, setBoard] = useState(allNumbersOnBoardWithId)

    useEffect(() => {
        shuffleArray()
    }, [])

    const shuffleArray = () => {
        
        const shuffledBoard = [...board]
        for (let i = shuffledBoard.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = shuffledBoard[i];
          shuffledBoard[i] = shuffledBoard[j];
          shuffledBoard[j] = temp;
        }
        
        setBoard(shuffledBoard)
        setFlippedCells([])
        setPlayerXScore(0)
        setPlayerOScore(0)
        setMatchedCards([])
        setAllOpenedCards([])
        setplayerOCorrectGuesses([])
        setplayerXCorrectGuesses([])
        setGameIsActive(true)
    }

    const handleClickedCell = (value, id) => {
      
      if (flippedCells.includes(id) || clickedCells.length === 2) {
        return
      }

      setClickedCells([...clickedCells, { value, id }]);
      setFlippedCells([...flippedCells, id]);
    };

    useEffect(() => {

      if (clickedCells.length === 2) {
        if (clickedCells[0].value === clickedCells[1].value) {
          
          setMatchedCards([...matchedCards, clickedCells[0].id, clickedCells[1].id]);
          setAllOpenedCards([...allOpenedCards, clickedCells[0].value, clickedCells[1].value])
          
          if (playerTurn === 'X') {
            setPlayerXScore(prev => prev + 1)
            setplayerXCorrectGuesses([...playerXCorrectGuesses, clickedCells[0].id, clickedCells[1].id])
          }

          if (playerTurn === 'O') {
            setPlayerOScore(prev => prev + 1)
            setplayerOCorrectGuesses([...playerOCorrectGuesses, clickedCells[0].id, clickedCells[1].id])
          }
          setPlayerTurn(playerTurn === 'X' ? 'X' : 'O')
        } 

        setTimeout(() => {
          setClickedCells([])
          setFlippedCells([])

        }, 1000)

        setTimeout(() => {
          if (clickedCells[0].value !== clickedCells[1].value) {
            setPlayerTurn(playerTurn === 'X' ? 'O' : 'X')
          }
        }, 1500)
      }

      if (allOpenedCards.length === 36) {
        setGameIsActive(false)
        if (playerOScore > playerXScore) {
          setGameWinner('O')
        } else {
          setGameWinner('X')
        }
      }

    }, [clickedCells]);
    console.log(flippedCells)
  return (
    
    <>
      <Scoreboard playerTurn={playerTurn} playerOScore={playerOScore} playerXScore={playerXScore} />
      <div className={styles.board}>
        {board.map((cell) => {
          const isFlipped = flippedCells.includes(cell.id);
          const isMatched = matchedCards.includes(cell.id);
          const isCorrectX = playerXCorrectGuesses.includes(cell.id);
          const isCorrectO = playerOCorrectGuesses.includes(cell.id);
          
          return (
            <div
              className={
                `${styles.card} ${isFlipped ? styles.flipped : ""} 
                ${isMatched && isCorrectX ? styles.matchedX : ""} 
                ${isMatched && isCorrectO ? styles.matchedO : ""}`}
              onClick={() => handleClickedCell(cell.value, cell.id)}
              key={cell.id}
            >
              
              <div className={styles.cardFront}></div>
              <div className={styles.cardBack}>{cell.value}</div>
            </div>
          );
        })}
      </div>
      <GameFinished gameIsActive={gameIsActive} gameWinner={gameWinner} playerOScore={playerOScore} playerXScore={playerXScore} shuffleArray={shuffleArray}/>
    </>
  );
};

export default MemoryBoard;