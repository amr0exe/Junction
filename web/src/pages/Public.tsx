import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ChatBox from "../components/ChatBox";
import { useWebSocket } from "../hooks/socket";
// import Navbar from "../components/Navbar";
import LobbyContext from "../context/Context";


// TODO: make a message type for broadcast, room, dm
function Public() {
	const { status, messages, sendMessage, setClientName } = useWebSocket("ws://localhost:8080") 
	const [currentMessage, setCurrentMessage] = useState("")
	const navigate = useNavigate()
	const nameSent = useRef(false)
	const messageEndRef = useRef<HTMLDivElement>(null)

	const lobbyContext = useContext(LobbyContext)
	if (!lobbyContext) {
		throw new Error("Some error on Context")
	}

	const {name} = lobbyContext

	useEffect(() => {
		if (name === "") {
			navigate("/")
			return
		}

		if (!nameSent.current && status === "OPEN") {
			setClientName(name)
			nameSent.current = true
		}
	}, [navigate, name, status, setClientName])

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth"})
	}, [messages])
	
	const handleSend = ()  => {
		sendMessage("public_msg", currentMessage)
		setCurrentMessage("")
	}

	return (
		<div className="h-screen grid grid-cols-4">

			{/* NameBar */}
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
				<div className="w-sm border-b border-slate-200 border mt-5"/>
				<div className="w-sm border-b border-slate-200 border mt-5"/>

				<p className="text-3xl font-extralight pt-5">Public Forum</p>

			</div>

   			<div className="col-span-3 flex flex-col items-center mr-10">
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

export default Public
