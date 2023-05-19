const Controlls = (allNumbersOnBoardWithId) => {

    const array = allNumbersOnBoardWithId.allNumbersOnBoardWithId

    const shuffleArray = () => {
        
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        console.log(array)
        return array
      }
      

    return (
        <div>
            <button onClick={() => shuffleArray()}>RESET</button>
        </div>
    )
}

export default Controlls