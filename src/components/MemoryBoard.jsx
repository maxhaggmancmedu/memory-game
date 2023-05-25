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
    }

    
    

    const handleClickedCell = (value, id) => {
      
      
      setClickedCells([...clickedCells, { value, id }]);
      setFlippedCells([...flippedCells, id]);
      
      console.log(allOpenedCards)
    };

    useEffect(() => {
      
      
      
      

      if (clickedCells.length === 3) {
        
        setPlayerTurn(playerTurn === 'X' ? 'O' : 'X')

        if (clickedCells[0].value === clickedCells[1].value) {
          setPlayerTurn(playerTurn === 'X' ? 'X' : 'O')
        }

        
        setClickedCells(clickedCells.slice(-1));
        setFlippedCells([clickedCells.slice(-1)[0].id]);
      }
      
      if (clickedCells.length === 2) {
        
        if (clickedCells[0].value === clickedCells[1].value) {
          
          setMatchedCards([...matchedCards, clickedCells[0].id, clickedCells[1].id]);
          setAllOpenedCards([...allOpenedCards, clickedCells[0].value, clickedCells[1].value])
          if (playerTurn === 'X') {
            setPlayerXScore(prev => prev + 1)
          }

          if (playerTurn === 'O') {
            setPlayerOScore(prev => prev + 1)
          }
        } 
      }

      if (allOpenedCards.length === 36) {
        setGameIsActive(false)
      }
      
      
      
    }, [clickedCells]);
  
  // console.log(board)
  
  return (
    <>
      <div className={styles.board}>
        {board.map((cell) => {
          const isFlipped = flippedCells.includes(cell.id);
          const isMatched = matchedCards.includes(cell.id);
          return (
            <div
              className={
                `${styles.card} ${isFlipped ? styles.flipped : ""} 
                ${isMatched && playerTurn === 'X' ? styles.matchedX : ""} 
                ${isMatched && playerTurn === 'O' ? styles.matchedO : ""}`}
              onClick={() => handleClickedCell(cell.value, cell.id)}
              key={cell.id}
            >
              {cell.value}
            </div>
          );
        })}
      </div>
      <Controlls allNumbersOnBoardWithId={allNumbersOnBoardWithId} shuffleArray={shuffleArray} />
      <Scoreboard playerTurn={playerTurn} playerOScore={playerOScore} playerXScore={playerXScore} />
      <GameFinished gameIsActive={gameIsActive} />
    </>
  );
};

export default MemoryBoard;