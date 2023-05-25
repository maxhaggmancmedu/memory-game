import styles from './styles/GameFinished.module.css'

const GameFinished = ({ gameIsActive, gameWinner, playerOScore, playerXScore, shuffleArray } ) => {

    

    
           
    

    
    return (
        
        
        <>
            {!gameIsActive && <div className={styles.gameFinishedComponent}>
                <h3>PLAYER {gameWinner} WINS!!!</h3>
                <div>
                    <p>FINAL SCORE</p>
                    <p>{playerXScore} - {playerOScore}</p>
                </div>
                <button className={styles.button} onClick={shuffleArray}>RESTART GAME</button>
            </div>}
        </>
            
            
        
    )
}

export default GameFinished