from app import create_app

# Expose a module-level WSGI app for Gunicorn/Render: `gunicorn run:app`
app = create_app()

if __name__ == "__main__":
    # Local dev run
    app.run(debug=True)