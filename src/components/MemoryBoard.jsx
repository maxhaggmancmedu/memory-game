import { v4 as uuidv4 } from 'uuid';

const MemoryBoard = () => {

    const numbersOnBoard = []

    for (let i = 1; i < 19; i++) {
        numbersOnBoard.push({value: i})
    }

    const numbersOnBoardCopy = numbersOnBoard.map(x => x)
    const allNumbersOnBoard = numbersOnBoard.concat(numbersOnBoardCopy)
    console.log(allNumbersOnBoard)
    let uuid;
    
    const allNumbersOnBoardWithId = allNumbersOnBoard.map(val => (
        uuid = uuidv4(),
        val = {...val, id: uuid}
    ))

    console.log(allNumbersOnBoardWithId)

    return (
        <div>
            {allNumbersOnBoardWithId.map((number) => {
                return (
                    <div key={number.id}></div>
                )
                
            })}
        </div>
    )
}

export default MemoryBoard