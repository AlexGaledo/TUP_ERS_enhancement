import { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const formatMessage = (content) => {
		if (!content) return null;

		const paragraphs = content.split("\n\n");

		return paragraphs.map((paragraph, paragraphIdx) => {
			if (paragraph.includes("* **")) {
				const items = paragraph.split("\n").filter((line) => line.trim());
				return (
					<ul key={paragraphIdx} className="chatbot-list">
						{items.map((item, itemIdx) => {
							const match = item.match(/\* \*\*(.*?)\*\*:\s*(.*)/);
							if (!match) return null;

							return (
								<li key={itemIdx} className="chatbot-list-item">
									<span className="chatbot-list-bullet">•</span>
									<div>
										<span className="chatbot-list-strong">{match[1]}:</span>
										<span className="chatbot-list-text"> {match[2]}</span>
									</div>
								</li>
							);
						})}
					</ul>
				);
			}

			const parts = paragraph.split(/(\*\*.*?\*\*)/g);
			return (
				<p key={paragraphIdx} className="chatbot-paragraph">
					{parts.map((part, partIdx) => {
						if (part.startsWith("**") && part.endsWith("**")) {
							return (
								<span key={partIdx} className="chatbot-paragraph-strong">
									{part.slice(2, -2)}
								</span>
							);
						}
						return (
							<span key={partIdx} className="chatbot-paragraph-text">
								{part}
							</span>
						);
					})}
				</p>
			);
		});
	};

	return (
		<div className="chatbot-body">
			{messages.length === 0 ? (
				<div className="chatbot-empty">
					<p>👋 Hello! How can I help you today?</p>
					<p className="chatbot-empty-subtext">I'am group1's assistant chatbot ready to guide you throughout this ers</p>
				</div>
			) : (
				messages.map((message, index) => (
					<div
						key={index}
						className={`chatbot-message-row ${message.role === "user" ? "user" : "assistant"}`}
					>
						<div
							className={`chatbot-message-bubble ${
								message.role === "user" ? "user" : "assistant"
							}`}
						>
							<div className="chatbot-message-text">
								{message.role === "assistant" ? formatMessage(message.content) : message.content}
							</div>
							{message.timestamp && (
								<div className="chatbot-timestamp">
									{new Date(message.timestamp).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</div>
							)}
						</div>
					</div>
				))
			)}
			<div ref={messagesEndRef} />
		</div>
	);
}
