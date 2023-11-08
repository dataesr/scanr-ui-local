from pydantic import BaseModel, Field
from .commons import Lang


class Authorship(BaseModel):
    fullName: str | None = None
    firstName: str | None = None
    lastName: str | None = None


class Publication(BaseModel):
    title: Lang | None = {}
    summary: Lang | None = Field(default_factory=Lang)
    authors: list[Authorship] = []


class PublicationsSearchResponse(BaseModel):
    count: int = 0
    data: list[Publication] = []
