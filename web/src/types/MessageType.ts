export interface Message {
    content: string
    sender: string
    timestamp: Date 
}

export type Messages = Message[]

export interface ChatBoxProps  {
    content: Message
}

export const dum: Messages = [
{
    content: "Hello from here",
    sender: "amr",
    timestamp: new Date()
},
{
    content: "Second message",
    sender: "user1",
    timestamp: new Date(Date.now() - 1000 * 60)
},
{
    content: "Third message inbound",
    sender: "user2",
    timestamp: new Date(Date.now() - 1000 * 120)
},
{
    content: "Is this working?",
    sender: "user3",
    timestamp: new Date(Date.now() - 1000 * 180)
},
{
    content: "Yes, all good here",
    sender: "amr",
    timestamp: new Date(Date.now() - 1000 * 240)
}
]