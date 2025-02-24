import { useNavigate } from "react-router-dom"
import LobbyContext from "../context/Context"
import { useContext } from "react"

function PrivateLobby() {
    const lobbyContext = useContext(LobbyContext)
    if (!lobbyContext) {
        throw new Error("Some error with context! on PrivatePage")
    }

    const navigate = useNavigate()
    const {setName, setRoom, name, room} = lobbyContext

    const handleJoin = () => {
        if (name === "" || room === "") return
        navigate("/room")
    }

    return (
        <div className="flex flex-col items-end">
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-3 py-2 bg-slate-100 rounded-lg mb-5"
                placeholder="enter your name..."
            />

            <input 
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full pl-3 py-2 bg-slate-100 rounded-lg"
                placeholder="enter your room-name..."
            />

            <button
                className="bg-black text-white py-2 px-5 mt-5 rounded-lg cursor-pointer"
                onClick={handleJoin}
            >Join</button>
        </div>
    )
}

export default PrivateLobby