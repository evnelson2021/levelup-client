import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__name">{game.name} created by {game.gamer}</div>
                        <div className="game__players">{game.min_players}-{game.max_players} players needed</div>
                        <div className="game__min_age">Minimum age is {game.min_age}</div>
                    </section>
                })
            }
        </article>
    )
}