import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.title} by {event.maker}</div>
                        <div className="event__players">{event.number_of_players} players needed</div>
                        <div className="event__skillLevel">Skill level is {event.skill_level}</div>
                    </section>
                })
            }
        </article>
    )
}