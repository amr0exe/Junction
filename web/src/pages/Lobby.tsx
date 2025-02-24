import { useState } from "react"
type RoomOption = "public" | "private"
import PublicLobby from "../components/PublicLobby"
import PrivateLobby from "../components/PrivateLobby"

function Lobby() {
    const [currentRoomOption, setRoomOption] = useState<RoomOption>("public")

    const handleRoomOption = (option: RoomOption) => {
        setRoomOption(option)
        // console.log(option)
    }

    return (
        <div className="h-screen font-mono flex flex-col items-center">
            <div className="text-center text-xl text-blue-500 pt-3 font-semibold">
                <p>Choose either to join</p>
                <p>Public Room   |   Private Room</p>
            </div>

            {/* room - buttons */}
            <div className="w-md  mt-5 flex border border-black text-2xl justify-self-center font-semibold">
                <div 
                    onClick={() => handleRoomOption("public")}
                    className={`w-1/2 cursor-pointer py-2 text-center ${
                        currentRoomOption === "public" ? "bg-slate-200" : "bg-white"
                    }`}
                >Public</div>
                <div className="border-r border-2"/>
                <div 
                    onClick={() => handleRoomOption("private")}
                    className={`w-1/2 cursor-pointer py-2 text-center ${
                        currentRoomOption === "private" ? "bg-slate-200" : "bg-white"
                    }`}
                >Private</div>
            </div>

            {/* -based-on  -form */}
            <div className="w-md min-h-[30%] mt-20">
                {currentRoomOption === "public" ? <PublicLobby /> : <PrivateLobby /> }
            </div>

        </div>
    )
}

export default Lobby