import { state } from "../state.js"
import { does_socket_exists } from "./directMessage.js"

const set_names = (ws, name) => {
    // check if that name already exists
    if (does_socket_exists(name)) {
        console.log("duplicate name! it already exists!")
        return 
    }
    
    // add client-name to ws 
    state.client_names.set(ws, name)
    console.log("current set client: ", state.client_names.get(ws))
    console.log("all_in_all ", state.client_names.values())
}

const get_name_socket = (ws) => {
    const client_map = state.client_names
    for (const [key, value] of client_map) {
        if (key === ws) {
			return value
        }
    }
	
	return null
}

const delete_names = (ws) => {
    state.client_names.delete(ws)
    console.log("deleted the client")
}

export { set_names, delete_names, get_name_socket }
