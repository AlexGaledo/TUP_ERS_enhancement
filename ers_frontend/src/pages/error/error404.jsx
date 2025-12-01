import { useNavigate } from 'react-router-dom';

export default function Error404() {
	const navigate = useNavigate();

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div style={{
				width: '100%',
				maxWidth: 900,
				borderRadius: 12,
				padding: '2rem',
			}}>
				<div style={{ textAlign: 'center', padding: '1rem 0 1.25rem' }}>
					<div style={{
						fontSize: '3.5rem',
						fontWeight: 800,
						color: '#8A1C23',
						letterSpacing: 2,
					}}>404</div>
					<h2 style={{ margin: '0.25rem 0 0.5rem', fontWeight: 700 }}>Page Not Found</h2>
					<p style={{ margin: 0, color: '#6B7280' }}>
						The page you’re looking for doesn’t exist or may have moved.
					</p>
				</div>

				<div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
					<button
						onClick={() => navigate('/home/welcome')}
						className="auth-btn"
						style={{ minWidth: 160 }}
					>
						Go to Home
					</button>
					<button
						onClick={() => navigate(-1)}
						className="btn-secondary"
						style={{ minWidth: 140 }}
					>
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
}
