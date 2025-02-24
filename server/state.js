/*
 room_name: 
    either -> alphanumeric_code | string
 
 example data_set:
    rooms: { "room_name", new Set["ws1", "ws2"] }

    client_rooms: { "ws1", new Set["room1", "room2"] }

    client_names: { ["ws1", "alice"], ["ws2", "elon"] }
*/


const state = {
    rooms: new Map,
    client_rooms: new Map,
    client_names: new Map
}

export { state }
