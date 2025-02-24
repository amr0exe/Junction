import { useEffect, useState, useRef } from "react";
import { Message, Messages } from "../types/MessageType";

export function useWebSocket(url: string) {
    const socket = useRef<WebSocket | null>(null)
    const [status, setStatus] = useState("CONNECTING")
    const [messages, setMessages] = useState<Messages>([])
    const [roomMembers, setRoomMembers] = useState<string[]>([])

    // first ws client needs to set-name before send messages
    const setClientName = (name: string) => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                type: "set_name",
                name
            })
            socket.current.send(payload)
            return
        }
		console.log("Socket not open. Not Available! Client Name not Set!")
    }

	// message type is defaulted to public_msg(broadcast)
	const sendMessage = (type: string, message: string, room_name?: string) => {
		if (socket.current && socket.current.readyState === WebSocket.OPEN) {
			const payload = JSON.stringify({
				type,
                room_name,
				message
			})
			socket.current.send(payload)
			return
		}
		console.log("Socket not open. Not Available! Messages failed to Sent!")
	}

    // join-room after set_name
    const join_room = (room_name: string) => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                type: "join_room",
                room_name
            })

            socket.current.send(payload)
            return
        }
        console.log("Socket error! Join Room Failed")
    }

    useEffect(() => {
        function connect() {
			if (!socket.current) {
				socket.current = new WebSocket(url)
			}

            socket.current.onopen = () => {
                setStatus("OPEN")
                // console.log("Websocket connection Initiated!")
            }

            socket.current.onmessage = (event) => {
                console.log("Message Received: ", event.data)
                const data = JSON.parse(event.data)

                switch (data.type) {
                    case "broadcast":
                        console.log("Public Message Received!", data.message)
                        const publicMessage: Message = {
                            content: data.message,
                            sender: data.from,
							timestamp: new Date(data.timeStamp)	// date need to converted from string -> date format
                        }
                        setMessages((prev) => [...prev, publicMessage])
                        break

                    case "room_msg":
                        console.log("Room Message Received!", data.message)
                        const roomMessage: Message = {
                            content: data.message,
                            sender: data.from,
                            timestamp: new Date(data.timeStamp)
                        }
                        setMessages((prev) => [...prev, roomMessage])
                        break

                    case "room_members":
                        console.log("RoomMembers received!", data.room_members)
                        setRoomMembers(data.room_members)
                        break

                    default:
                        console.log("Unknown Message Received: ", event.data)
                }
            }

            socket.current.onerror = (err) => {
                setStatus("ERROR")
                console.log("Websocket Error!", err)
            }
            socket.current.onclose = () => {
                setStatus("CLOSED")
                // console.log("WebSocket Disconnected!")
            }
        }
        connect()

    }, [url])

    return { socket, status, messages, roomMembers, sendMessage, setClientName, join_room }
}
