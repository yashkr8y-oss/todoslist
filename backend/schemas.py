from pydantic import BaseModel

class TodoBase(BaseModel):
    text: str
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    text: str | None = None
    completed: bool | None = None

class TodoInDB(TodoBase):
    id: int

    class Config:
        orm_mode = True
