import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getEventById, updateEvent } from "../../managers/EventManager.js"
import { getGames } from '../../managers/GameManager.js'

export const UpdateEvent = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([
        {
         id: 0
        } 
     ])
    const { eventId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: [],
        location: "",
        date: "",
        start_time: "",
        end_time: "",
        details: ""
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getEventById(eventId).then((data) => {
            setCurrentEvent(data)
        })
        getGames().then(res => setGames(res))
    }, [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentEvent }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label className="label">Game: </label>
                        <select
                                name="game"
                                className="form-control"
                                value={currentEvent.game.id}
                                onChange={(event) => {
                                    const copy = { ...currentEvent }
                                    copy.game = parseInt(event.target.value)
                                    setCurrentEvent(copy)
                                }}>
                                {games.map(game => ( 
                                            <option key={`game--${game.id}`} value={game.id} name={game.name}>{game.name}</option>                         
                                    ))}
                        </select>
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                    <label htmlFor="start_time">Start: </label>
                    <input type="time" name="start_time" required autoFocus className="form-control"
                        value={currentEvent.start_time}
                        onChange={changeEventState}
                    />
                    <label htmlFor="end_time">End: </label>
                    <input type="time" name="end_time" required autoFocus className="form-control"
                        value={currentEvent.end_time}
                        onChange={changeEventState}
                    />
                    <label htmlFor="details">Details: </label>
                    <input type="text" name="details" required autoFocus className="form-control"
                        value={currentEvent.details}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizing_gamer: currentEvent.organizing_gamer,
                        game: (currentEvent.game),
                        location: (currentEvent.location),
                        date: (currentEvent.date),
                        start_time: (currentEvent.start_time),
                        end_time: (currentEvent.end_time),
                        details: (currentEvent.details)
                    }

                    // Send POST request to your API
                    updateEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}