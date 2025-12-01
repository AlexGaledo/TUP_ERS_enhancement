import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Lightweight message modal following existing modal styles
const MessageModalContext = createContext(null);

export function MessageModalProvider({ children }) {
	const [modal, setModal] = useState(null); // { title, message, type, actions, autoCloseMs }

	const hideMessage = useCallback(() => setModal(null), []);

	const showMessage = useCallback((config) => {
		setModal({
			title: config.title || 'Notice',
			message: config.message || '',
			type: config.type || 'info', // info | success | warning | error
			actions: config.actions || [],
			autoCloseMs: config.autoCloseMs || null,
		});
	}, []);

	useEffect(() => {
		if (modal?.autoCloseMs) {
			const t = setTimeout(() => hideMessage(), modal.autoCloseMs);
			return () => clearTimeout(t);
		}
	}, [modal, hideMessage]);

	const value = { showMessage, hideMessage, modal };

	return (
		<MessageModalContext.Provider value={value}>
			{children}
			{createPortal(<MessageModal />, document.body)}
		</MessageModalContext.Provider>
	);
}

export function useMessageModal() {
	const ctx = useContext(MessageModalContext);
	if (!ctx) throw new Error('useMessageModal must be used within MessageModalProvider');
	return ctx;
}

function MessageModal() {
	const { modal, hideMessage } = useMessageModal();
	if (!modal) return null;

	const gradient = {
		info: 'linear-gradient(90deg, rgba(59,130,246,0.8), rgba(147,197,253,0.6))',
		success: 'linear-gradient(90deg, rgba(16,185,129,0.8), rgba(110,231,183,0.6))',
		warning: 'linear-gradient(90deg, rgba(245,158,11,0.85), rgba(253,230,138,0.6))',
		error: 'linear-gradient(90deg, rgba(185,28,28,0.85), rgba(248,113,113,0.6))',
	}[modal.type] || 'linear-gradient(90deg, rgba(59,130,246,0.8), rgba(147,197,253,0.6))';

	return (
		<div className="modal-overlay message-overlay" role="dialog" aria-modal="true">
			<div className="modal-card message-modal-card">
				<div className="message-modal-strip" style={{ background: gradient }} />
				<div className="message-modal-body">
					<div className="message-modal-header">
						<div>
							<h2 className="message-modal-title">{modal.title}</h2>
							<p className="message-modal-text">{modal.message}</p>
						</div>
						<button type="button" className="btn-ghost" onClick={hideMessage}>Close</button>
					</div>

					{modal.actions?.length > 0 && (
						<div className="message-modal-actions">
							{modal.actions.map((a, idx) => (
								<button
									key={idx}
									onClick={() => { a.onClick?.(); if (!a.persist) hideMessage(); }}
									className={a.variant === 'primary' ? 'auth-btn' : 'btn-ghost'}
								>
									{a.label}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

/* Usage Example:
	const { showMessage } = useMessageModal();
	showMessage({
		title: 'Ticket Purchased',
		message: 'Your VIP ticket is confirmed!\nCheck email for details.',
		type: 'success',
		autoCloseMs: 4000,
		actions: [
			{ label: 'View Tickets', variant: 'primary', onClick: () => navigate('/tickets') },
			{ label: 'Close' }
		]
	});
*/
