import { WebSocketServer } from "ws"
import { messageHandler } from "./server/handlers/messageHandler.js"

export const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', ws => {
	console.log("---- client connected")

    ws.on('message', (msg) => messageHandler(ws, msg))

    ws.on('error', () => {
        console.log("WebSocket Error! maybe connection isues, server downtime, or unexpected network interruptions.")
    })

    ws.on('close', (msg) => {
        console.log("---- client disconnected", msg.toString())
    })
})

