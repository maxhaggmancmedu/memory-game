import { v4 as uuidv4 } from 'uuid'
import styles from './styles/MemoryBoard.module.css'
import Controlls from './controlls'
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

    console.log(allNumbersOnBoardWithId)

    const [board, setBoard] = useState(allNumbersOnBoardWithId)

    

    useEffect(() => {
        console.log('changed')
    }, [allNumbersOnBoardWithId]) 


    return (
        <>
            <div className={styles.board}>
            {board.map((number) => {
                return (
                    <div key={number.id}>{number.value}</div>
                )
            })}
            </div>
            <Controlls allNumbersOnBoardWithId={allNumbersOnBoardWithId} />
        </>
        
    )
}

export default MemoryBoard