import WebSocket from "ws"
import { wss } from "../../app.js"
import { get_name_socket } from "./clientNames.js"

const broadcast_to_all = (ws, msg) => {
	const name = get_name_socket(ws)
	if (!name) {
		console.log("Player doesn't exists")
		return
	}
	console.log("Name: ", name)
	
    const message = msg.toString()
    wss.clients.forEach( client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ 
				type: "broadcast",
				from: name,
				message: message,
				timeStamp: new Date(Date.now())
				//timeStamp: new Date().toLocaleTimeString()
			}))
        }
    })

    console.log(`${message}: message brodcasted in the network.`)
}


export { broadcast_to_all }
