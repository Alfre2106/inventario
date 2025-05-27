from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base  # asumiendo que tienes Base configurado

class Cliente(Base):
    __tablename__ = "clientes"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100))
    telefono = Column(String(50))
    direccion = Column(String(200))

class Venta(Base):
    __tablename__ = "ventas"
    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=True)
    fecha = Column(DateTime, default=datetime.utcnow)
    total = Column(Float)

    cliente = relationship("Cliente")
    detalle = relationship("DetalleVenta", back_populates="venta", cascade="all, delete-orphan")

class DetalleVenta(Base):
    __tablename__ = "detalle_ventas"
    id = Column(Integer, primary_key=True, index=True)
    venta_id = Column(Integer, ForeignKey("ventas.id"))
    producto_id = Column(Integer, ForeignKey("productos.id"))
    cantidad = Column(Integer)
    precio = Column(Float)
    subtotal = Column(Float)

    venta = relationship("Venta", back_populates="detalle")
    producto = relationship("Producto")  # asumiendo tienes modelo Producto
