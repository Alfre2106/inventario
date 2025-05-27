from pydantic import BaseModel
from typing import Optional

class CategoriaBase(BaseModel):
    id: int
    nombre: str

    class Config:
        orm_mode = True

class ProductoBase(BaseModel):
    nombre: str
    precio: int
    cantidad: int
    categoria_id: Optional[int] = None

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(ProductoBase):
    pass

class Producto(ProductoBase):
    id: int
    categoria: Optional[CategoriaBase] = None  # permite devolver la categoría anidada

    class Config:
        orm_mode = True
