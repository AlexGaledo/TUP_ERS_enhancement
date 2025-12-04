import { useState } from 'react'
import './Chatbot.css'
import ChatbotWindow from './Chatbotwindow'
import tupLogo from '../../assets/tup_logo.png'

export default function ChatbotWidget(){
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<ChatbotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

			<button
				type="button"
				className="chatbot-fab"
				aria-label="Toggle chat"
				onClick={() => setIsOpen(prev => !prev)}
			>
				<img src={tupLogo} alt="TUP Chat" className="chatbot-fab-logo" />
			</button>
		</>
	)
}
