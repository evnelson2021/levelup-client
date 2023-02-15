import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import "./game.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([
        {id: 0,
        name: "",
        description: "",
        type: {},
        min_player: 0,
        max_player: 0,
        gamer: {}
        }
    ])
    const navigate = useNavigate()
    
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])


    const deleteButton = (id) => {
        return <button onClick={() => {
            deleteGame(id)
            .then(() => {
                    getGames().then(data => setGames(data))
                })
            
        }} className="btn btn-2 btn-sep icon-create">Delete</button>
}

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "new" })
                }}>Register New Game</button>
        
        <article className="games">
            
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        
                        <div className="game__name">{game.name}</div>
                        <div className="game__type">Type: {game.type.label}</div>
                        <div className="game__players">{game.min_players}-{game.max_players} players needed</div>
                        <div className="game__min_age">Minimum age is {game.min_age}</div>
                        <div className="game__creator">
                        Created by: {game.gamer.full_name}</div>
                        <div className="game__footer">
                            <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    navigate({ pathname: `edit/${game.id}` })
                                    }}>Edit</button>
                            {deleteButton(game.id)}                        
                        </div>
                    </section>
                })
            }
        </article>
        </>
    )
}