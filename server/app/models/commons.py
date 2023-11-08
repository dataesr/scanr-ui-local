from pydantic import BaseModel


class Lang(BaseModel):
    fr: str | None = None
    en: str | None = None
    default: str | None = None
