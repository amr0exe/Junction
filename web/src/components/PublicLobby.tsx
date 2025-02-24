import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import LobbyContext from "../context/Context"

function PublicLobby() {
    const lobbyContext = useContext(LobbyContext)
    if (!lobbyContext) {
        throw new Error("Some error on Context")
    }

    const navigate = useNavigate()

    const {name, setName} = lobbyContext

    const handleJoin = () => {
        if (name === "") return
        navigate("/public")
    }

    return (
        <div className="flex flex-col items-end">
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-3 py-2 bg-slate-100 rounded-lg"
                placeholder="enter your name..."
                required
            />

            <button
                onClick={handleJoin}
                className="bg-black text-white py-2 px-5 mt-5 rounded-lg cursor-pointer"
            >Join</button>
        </div>
    )
}

export default PublicLobby 