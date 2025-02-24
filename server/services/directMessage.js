import { state } from "../state.js"

const send_to_one = (ws, To, msg) => {
    // check if receiver exists, To is name: string
    if (!does_socket_exists(To)) {
        console.log(`receiver ${To} doesn't exists`) 
        return 
    }

    // get ws | client of receiver | with the name | associated with it
    const client = get_the_clients_instance(To)
    client.send(msg)
    console.log("message sent i guess!")
}

const get_the_clients_instance = (To) => {
    const client_map = state.client_names
    for (const [key, value] of client_map) {
        if (value === To) {
            return key
        }
    }
    return null
}

const does_socket_exists = (To) => {
    const client_map = state.client_names.values()
    for (const value of client_map) {
        if (value === To) {
            return true
        }
    }
    return false
}

export { send_to_one, does_socket_exists }
