from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials

    if token != "mysecrettoken":
        raise HTTPException(status_code=401, detail="Invalid token")

    return token