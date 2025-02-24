import { ChatBoxProps } from "../types/MessageType"

function ChatBox({ content }: ChatBoxProps) {

	// gives pretty-time with hr.min
	const formatTime = (data: Date) => {
		return data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
	}

	return (
		<div className="flex min-w-lg mb-4 bg-white">
				{/* Avatar */}
				<div className="w-12 h-12 bg-gradient-to-bl from-slate-900 via-slate-700 to-slate-300 text-slate-200 font-semibold text-xl rounded-full flex items-center justify-center">
					{content.sender[0]}
				</div>

				{/* name & date */}
				<div className="flex flex-col">
					<div className="flex justify-between w-md text-md text-slate-700 ml-3">
						<p className="font-mono">{content.sender}</p>
						<span className="text-xs text-gray-500">{formatTime(content.timestamp)}</span>
					</div>

					{/* message-content */}
					<p className="w-lg ml-3 font-mono text-sm break-all">{(content.content.trim())}</p>
				</div>
		</div>
	)
}


export default ChatBox