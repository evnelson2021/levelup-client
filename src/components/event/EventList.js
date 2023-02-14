import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager"
import "./event.css"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
                }}>Host New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        
                        <div className="event__details">Details:  {event.details}</div>
                        {/* <div className="event__game"> {event.game} Event</div> */}
                        {/* <div className="event__organizer">{event.title} organized by {event.organizing_gamer}</div> */}
                        <div className="event__location"> Location: {event.location} </div>
                        <div className="event__date"> Date: {event.date} </div>
                        <div className="event__time"> Time: {event.start_time} - {event.end_time}</div>
                        
                        
                    </section>
                })
            }
        </article>
        </>
    )
}