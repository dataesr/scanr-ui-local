from typing import Union
from pydantic import BaseModel


class Lang(BaseModel):
    fr: Union[str, None] = None
    en: Union[str, None] = None
    default: Union[str, None] = None
