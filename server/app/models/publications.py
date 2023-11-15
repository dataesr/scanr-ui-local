from typing import Union
from pydantic import BaseModel, Field
from .commons import Lang


class Authorship(BaseModel):
    fullName: Union[str, None] = None
    firstName: Union[str, None] = None
    lastName: Union[str, None] = None


class Publication(BaseModel):
    title: Union[Lang, None] = {}
    summary: Union[Lang, None] = Field(default_factory=Lang)
    authors: list[Authorship] = []


class PublicationsSearchResponse(BaseModel):
    count: int = 0
    data: list[Publication] = []
