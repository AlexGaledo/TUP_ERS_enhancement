import { useState } from 'react'
import './Chatbot.css'
import backend from '../../api/axios'
import MessageList from './Messagelist'
import MessageInput from './Messageinput'

export default function ChatbotWindow({ isOpen, onClose }){
	const [messages, setMessages] = useState([
		{
			role: 'assistant',
			content: "Hello! I'm your TUP Assistant. How can I assist you today?",
			timestamp: new Date().toISOString(),
		},
	])
	const [isLoading, setIsLoading] = useState(false)

	const handleSendMessage = async (content) => {
		const trimmed = (content || '').trim()
		if (!trimmed || isLoading) return

		const userMessage = {
			role: 'user',
			content: trimmed,
			timestamp: new Date().toISOString(),
		}

		setMessages(prev => [...prev, userMessage])
		setIsLoading(true)

		try {
			const response = await backend.post('/user/chatbot', { message: trimmed })

			await new Promise(resolve => setTimeout(resolve, 600))

			if (response.status !== 200) {
				throw new Error('Failed to get response from chatbot')
			}

			const botReply = response.data?.response ?? '...' 

			const assistantMessage = {
				role: 'assistant',
				content: botReply,
				timestamp: new Date().toISOString(),
			}
			setMessages(prev => [...prev, assistantMessage])
		} catch (error) {
			const errorMessage = {
				role: 'assistant',
				content: 'Sorry, I encountered an error. Please try again.',
				timestamp: new Date().toISOString(),
			}
			setMessages(prev => [...prev, errorMessage])
		} finally {
			setIsLoading(false)
		}
	}

	if (!isOpen) return null

	return (
		<div className="chatbot-window" role="dialog" aria-label="Chatbot">
			<div className="chatbot-header">
				<div className="chatbot-header-info">
					<div className="chatbot-header-avatar">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="chatbot-header-icon"
						>
							<path
								fillRule="evenodd"
								d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.678 3.348-3.97z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div>
						<h3 className="chatbot-header-title">TUP Assistant</h3>
						<p className="chatbot-header-subtitle">Your assistant chatbot</p>
					</div>
				</div>
				<button type="button" className="chatbot-close" onClick={onClose}>✕</button>
			</div>

			<MessageList messages={messages} />

			{isLoading && (
				<div className="chatbot-typing">
					<div className="chatbot-typing-dots">
						<span />
						<span />
						<span />
					</div>
					<span className="chatbot-typing-text">Typing…</span>
				</div>
			)}

			<MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
		</div>
	)
}
