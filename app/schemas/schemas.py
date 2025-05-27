from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class DetalleVentaCreate(BaseModel):
    producto_id: int
    cantidad: int
    precio: float

class VentaCreate(BaseModel):
    cliente_id: Optional[int] = None
    detalle: List[DetalleVentaCreate]

class DetalleVenta(BaseModel):
    id: int
    producto_id: int
    cantidad: int
    precio: float
    subtotal: float

    class Config:
        orm_mode = True

class Venta(BaseModel):
    id: int
    cliente_id: Optional[int] = None
    fecha: datetime
    total: float
    detalle: List[DetalleVenta]

    class Config:
        orm_mode = True
