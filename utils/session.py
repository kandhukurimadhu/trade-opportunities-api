sessions = {}

def track_session(token: str):
    sessions[token] = sessions.get(token, 0) + 1