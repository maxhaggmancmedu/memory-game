import { v4 as uuidv4 } from 'uuid'
import styles from './styles/MemoryBoard.module.css'
import Controlls from './Controlls'
import { useEffect, useState } from 'react'

const MemoryBoard = () => {

    const numbersOnBoard = []

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
        console.log(board)
        setBoard(shuffledBoard)
      }

    
    return (
        <>
            <div className={styles.board}>
            {board.map((number) => {
                return (
                    <div key={number.id}>{number.value}</div>
                )
            })}
            </div>
            <Controlls allNumbersOnBoardWithId={allNumbersOnBoardWithId} shuffleArray={shuffleArray}/>
        </>
        
    )
}

export default MemoryBoard