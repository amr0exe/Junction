import { createContext, SetStateAction, Dispatch, useState } from "react";

interface LobbyContextType {
    name: string
    room: string
    roomMembers: RoomMembersType
    setName: Dispatch<SetStateAction<string>>
    setRoom: Dispatch<SetStateAction<string>>
    setRoomMembers: Dispatch<SetStateAction<RoomMembersType>>
}

interface LobbyContextProviderProps {
    children: React.ReactNode
}

type RoomMembersType = Set<string>

const LobbyContext = createContext<LobbyContextType | undefined>(undefined)

export const LobbyContextProvider = ({ children }: LobbyContextProviderProps) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [roomMembers, setRoomMembers] = useState<RoomMembersType>(new Set())

    const value: LobbyContextType = { name, room, setName, setRoom, roomMembers, setRoomMembers }

    return (
        <LobbyContext.Provider value ={value}>
            {children}
        </LobbyContext.Provider>
    )
}

export default LobbyContext


