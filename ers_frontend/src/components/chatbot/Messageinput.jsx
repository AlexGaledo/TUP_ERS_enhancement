import { useState } from "react";

export default function MessageInput({ onSendMessage, disabled }) {
	const [input, setInput] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || disabled) return;

		onSendMessage(trimmed);
		setInput("");
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSubmit(event);
		}
	};

	return (
		<form className="chatbot-input" onSubmit={handleSubmit}>
			<input
				type="text"
				value={input}
				onChange={(event) => setInput(event.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Type your message..."
				disabled={disabled}
				className="chatbot-input-field"
			/>
			<button type="submit" className="chatbot-send-btn" disabled={!input.trim() || disabled}>
				Send
			</button>
		</form>
	);
}
