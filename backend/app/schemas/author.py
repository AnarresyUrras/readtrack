from pydantic import BaseModel, ConfigDict
from app.models.enums import AuthorGender


class AuthorBase(BaseModel):
    name: str
    author_gender: AuthorGender | None = None
    country: str | None = None


class AuthorCreate(AuthorBase):
    pass


class AuthorResponse(AuthorBase):
    id: int

    model_config = ConfigDict(from_attributes=True)