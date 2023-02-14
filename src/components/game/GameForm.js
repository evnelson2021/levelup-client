import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        name: "",
        min_players: 0,
        max_players: 0,
        min_age: 0,
        length: "",
        type: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGame }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                    <label htmlFor="min_players">Minimum Players: </label>
                    <input type="text" name="min_players" required autoFocus className="form-control"
                        value={currentGame.min_players}
                        onChange={changeGameState}
                    />
                    <label htmlFor="max_players">Maximum Players: </label>
                    <input type="text" name="max_players" required autoFocus className="form-control"
                        value={currentGame.max_players}
                        onChange={changeGameState}
                    />
                    <label htmlFor="min_age">Minimum Age: </label>
                    <input type="text" name="min_age" required autoFocus className="form-control"
                        value={currentGame.min_age}
                        onChange={changeGameState}
                    />
                    <label htmlFor="length">Length to Play (hours): </label>
                    <input type="text" name="length" required autoFocus className="form-control"
                        value={currentGame.length}
                        onChange={changeGameState}
                    />
                    <label className="label">Game Type: </label>
                    <select
                            name="type"
                            className="form-control"
                            value={currentGame.type}
                            onChange={(event) => {
                                const copy = { ...currentGame }
                                copy.type = parseInt(event.target.value)
                                setCurrentGame(copy)
                            }}>
                            <option value="0">Please Choose Type</option>
                            {gameTypes.map(type => ( 
                                        <option key={`type--${type.id}`} value={type.id} name={type.label}>{type.label}</option>                         
                                ))}
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        organizing_gamer: currentGame.organizing_gamer,
                        name: currentGame.name,
                        min_players: parseInt(currentGame.min_players),
                        max_players: parseInt(currentGame.max_players),
                        min_age: parseInt(currentGame.min_age),
                        type: parseInt(currentGame.type),
                        length: currentGame.length
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}