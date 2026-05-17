from fastapi import Header, HTTPException
from jose import jwt, JWTError

from app.config import (
    JWT_SECRET,
    JWT_ALGORITHM
)


def verify_token(authorization: str = Header(None)):

    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Authorization token missing"
        )

    try:
        token = authorization.split(" ")[1]

        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM]
        )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )