import styles from './styles/Scoreboard.module.css'

const Scoreboard = ({ playerTurn, playerOScore, playerXScore } ) => {
    return (
        <div className={styles.scoreBoard}>
            <div className={styles.playerTurn}>
                <h3 >CURRENT PLAYER TURN </h3>
                <p className={`${playerTurn ==='X' ? styles.xTurn : styles.oTurn}` }>{playerTurn}</p>
            </div>
            <div className={styles.scoreContainer} >
                <h3 className={styles.h3}>SCORE</h3>
                <div className={styles.scores}>
                    <p className={styles.playerXScore}>X {playerXScore}</p>
                    <p className={styles.hyphen}> - </p>
                    <p className={styles.playerOScore}>{playerOScore} O </p>
                </div>
            </div>
        </div>
    )
}

export default Scoreboard