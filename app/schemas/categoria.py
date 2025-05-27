from pydantic import BaseModel

class CategoriaBase(BaseModel):
    nombre: str

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaUpdate(CategoriaBase):
    pass

class CategoriaSchema(CategoriaBase):
    id: int

    class Config:
        orm_mode = True
