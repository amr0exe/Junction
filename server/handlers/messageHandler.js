//import { wss } from "../../app.js"
import { set_names } from "../services/clientNames.js"
import { broadcast_to_room, join_room, leave_room } from "../services/rooms_services.js"
import { broadcast_to_all } from "../services/broadcast_service.js"
import { send_to_one } from "../services/directMessage.js"

const messageHandler = (ws, msg) => {
    console.log("message received", msg.toString())
    
    try {
        // converting binary into json
        const data = JSON.parse(msg)

        switch (data.type) {
            case "set_name":
                set_names(ws, data.name)
				break

            case "join_room":
                //const room_name = generateRoom()
                join_room(ws, data.room_name)
                break

            case "room_msg":
                broadcast_to_room(ws, data.room_name, data.message)
                break

            case "public_msg":
                broadcast_to_all(ws, data.message)
                break

            case "leave_room":
                leave_room(ws, data.room_name)
                break
             
            case "direct_msg":
                send_to_one(ws, data.To, data.message)
                break
        }
    } catch(err) {
        console.log("Error processing message!", err)
    }
}

export { messageHandler }

/*
  For now:
    before initiating other messages
    go for set_name

    TODO: find a way to get client_name
    // integrated in the process where to put it
 */


// FIX: find which side to put this function, server | client 
const generateRoom = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let room = ""

    for (let i=0; i<6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        room += characters[randomIndex]
    }

    return room
}

