import styles from './styles/Scoreboard.module.css'

const Scoreboard = ({ playerTurn, playerOScore, playerXScore } ) => {
    return (
        <div className={styles.scoreBoard}>
            <div className={styles.playerTurn}>
                <h3 >CURRENT PLAYER TURN </h3>
                <p>{playerTurn}</p>
            </div>
            <div >
                <h3 className={styles.h3}>SCORE</h3>
                <p className={styles.scores}>
                    <p className={styles.playerXScore}>X {playerXScore}</p>
                    <p className={styles.hyphen}> - </p>
                    <p className={styles.playerOScore}>{playerOScore} O </p>
                </p>
                
            </div>
        </div>
    )
}

export default Scoreboard