const GameFinished = ({ gameIsActive } ) => {
    return (
        
        <div>
            {!gameIsActive && <div>game is finished</div>}
        </div>
    )
}

export default GameFinished