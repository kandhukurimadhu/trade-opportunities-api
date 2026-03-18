from collections import defaultdict
import time
from fastapi import HTTPException

requests_log = defaultdict(list)

def limiter(token: str):
    now = time.time()

    requests_log[token] = [
        t for t in requests_log[token]
        if now - t < 60
    ]

    if len(requests_log[token]) >= 5:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded (5 req/min)"
        )

    requests_log[token].append(now)