const Scoreboard = ({ playerTurn, playerOScore, playerXScore } ) => {
    return (
        <nav>
            <h1>Current player turn: {playerTurn}</h1>
            <div>
                <h3>Score:</h3>
                <p> Player X score {playerXScore}</p>
                <p> Player O score {playerOScore}</p>
            </div>
        </nav>
    )
}

export default Scoreboard