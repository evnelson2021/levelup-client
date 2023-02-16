import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { UpdateGame } from "../components/game/UpdateGame"
import { UpdateEvent } from "../components/event/UpdateEvent"


export const ApplicationViews = () => {
    return <>
        <Routes>
        <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="games" >
                    <Route index element={<GameList />} />
                    <Route path="new" element={<GameForm />} />
                    <Route path="edit/:gameId" element={<UpdateGame />} />
                </Route>
                <Route path="events" >
                    <Route index element={<EventList />} />
                    <Route path="new" element={<EventForm />} />
                    <Route path="edit/:eventId" element={<UpdateEvent />} />
                </Route>
                
            </Route>
        </Routes>
    </>
}