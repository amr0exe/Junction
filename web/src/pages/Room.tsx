import { useContext, useEffect, useRef, useState } from "react"
import LobbyContext from "../context/Context"
import { useNavigate } from "react-router-dom"
import { useWebSocket } from "../hooks/socket"
import ChatBox from "../components/ChatBox"

// TODO: make separate messages state-variable for public | private room
function Room() {
    const { status, messages, roomMembers, setClientName, sendMessage, join_room } = useWebSocket("ws://localhost:8080")
    const nameSent = useRef(false)
    const roomJoined = useRef(false)
	const messageEndRef = useRef<HTMLDivElement>(null)
	const [currentMessage, setCurrentMessage] = useState("")

    const lobbyContext = useContext(LobbyContext)
    if (!lobbyContext) {
        throw new Error("Some context error! Room!")
    }
    const navigate = useNavigate()

    const {name, room} = lobbyContext

    useEffect(() => {
        if(name === "" || room === "") {
            navigate("/")
            return
        }

		if (!nameSent.current && status === "OPEN") {
			setClientName(name)
			nameSent.current = true
		}

        if (nameSent.current && !roomJoined.current) {
            join_room(room)
            roomJoined.current = true
        }
    }, [navigate, name, status, setClientName, join_room])

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth"})
	}, [messages])

	const handleSend = ()  => {
		sendMessage("room_msg", currentMessage, room)
		setCurrentMessage("")
	}

    return (
        <div className="grid grid-cols-4">
			<div className="col-span-1 h-screen flex flex-col items-center pt-30 font-mono">
				{/* Avatar */}
				<div className="w-20 h-20 bg-gradient-to-bl from-slate-900 via-slate-700 to-slate-300 text-slate-200 font-semibold text-xl rounded-full flex items-center justify-center">
					{"df"[0]}
				</div>

				{/* name & bio */}
				<div className="flex flex-col items-center font-semibold">
					<p className="text-2xl pt-5">{name}</p>
					<p className="text-lg italic text-slate-500">"bio currently in progress"</p>
				</div>

				{/* Separator */}
				<div className="w-md border-b border-black border mt-5"/>

				<div className="w-full">
					<p className="text-xl pt-4 text-center"><span className="font-semibold">Room Name</span> | {room}</p>

					{/* Room members */}
					<div className="mt-5 ml-20">
						{roomMembers.map((members) => (
							<div className="flex items-center mt-5">
								<div className="w-12 h-12 bg-gradient-to-bl from-slate-900 via-slate-700 to-slate-300 text-slate-200 font-semibold text-xl rounded-full flex items-center justify-center">
									{"df"[0]}
								</div>
								<p className="pl-3 text-lg">{members}</p>
							</div>
						))}

					</div>
				</div>
			</div>

   			<div className="col-span-3 flex flex-col items-center">
				<div className="border-b border-black max-h-[80vh] h-[80vh] w-full mt-5 flex flex-col items-center overflow-scroll">
					<div className="w-full text-center  mb-5 border-b border-black font-mono text-3xl">
						<p>Chat Messages |  <span className="text-lg text-blue-500">status: {status}</span></p>
					</div>
					{messages.map((message, index) => (
						<ChatBox key={index} content={message}/>
					))}

					<div ref={messageEndRef}/>
				</div>

				<div className="mt-5 flex items-center">
					<textarea
						value={currentMessage}
						placeholder="enter your message..."
						onChange={(e) => setCurrentMessage(e.target.value)}
						className="p-2 pl-3 bg-slate-100 rounded-md w-sm font-mono"
					/>
					<button onClick={handleSend} className="ml-2 px-6 py-3 rounded-sm bg-black text-white">
						Send
					</button>
				</div>
			</div>

        </div>
    )
}

export default Room