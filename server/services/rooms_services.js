import { state } from "../state.js"
import { delete_names, get_name_socket } from "./clientNames.js"

const join_room = (ws, room_name) => {
    // if no room -> create new
    if (!state.rooms.has(room_name)) {
        state.rooms.set(room_name, new Set())
    }

    // if room exists -> add client to it
    state.rooms.get(room_name).add(ws)

	// find room_members ->  send it to client
	const room_clients = state.rooms.get(room_name)
	const room_members = []
	for (const socket of room_clients) {
		const name = get_name_socket(socket)
		if (name) {
			// add to an object
			room_members.push(name)
		}
	}
	// send-to-client
	room_clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({
				type: "room_members",
				room_members: room_members
			}))
		}
		console.log(`room_members sent to client ${room_members}`)
	})

    // if clients hasn't joined any room
    // check if clients has created any records in (client_rooms Map())
    if (!state.client_rooms.has(ws)) { 
        // creates an empty Map structure with ws as client
        state.client_rooms.set(ws, new Set()) 
    }

    // if clients has joined any room
    state.client_rooms.get(ws).add(room_name)

    console.log(` client joined ${room_name} `, room_name)
    
    // TODO: add ws_client to client_rooms
    /*
    console.log("rooms in here ", state.rooms.get(room_name))
    console.log("client-rooms in here ", state.client_rooms)
    */
}

const broadcast_to_room = (ws, room_name, msg) => {
    // if no-room return
    if (!state.rooms.has(room_name)) {
        return
    }

	// get socket name
	const name = get_name_socket(ws)
	if (!name) {
		console.log("Player doesn't exists")
		return
	}

    // get every member of room
    const room_members = state.rooms.get(room_name)

    // ws.send to all the room-members
    room_members.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
				type: "room_msg",
				from: name,
				message: msg,
				timeStamp: new Date(Date.now())
			}))
        }
    })
	console.log(`${msg} has been circulated in RoomNetwork!`)
}

const leave_room = (ws, room_name) => {
    // check if ws (clients) in the room
    // if there is that room
    if (!state.rooms.has(room_name)) { return }

    // if there is client in that room
    if (!state.rooms.get(room_name).has(ws)) { return }

    // remove client from that room
    state.rooms.get(room_name).delete(ws)
    
    // remove client from client_rooms
    state.client_rooms.delete(ws)

    // delete client_records from socket => name(string)
    delete_names(ws)
}

export { join_room, broadcast_to_room, leave_room }
