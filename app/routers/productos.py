from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List
from app.database import get_db
from app.models.producto import Producto as ProductoModel
from app.schemas.producto import Producto as ProductoSchema, ProductoCreate, ProductoUpdate
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

router = APIRouter(prefix="/productos", tags=["productos"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

SECRET_KEY = "supersecreto123"
ALGORITHM = "HS256"

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        correo: str = payload.get("sub")
        if correo is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")
        return correo
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

@router.post("/", response_model=ProductoSchema, status_code=status.HTTP_201_CREATED)
def crear_producto(producto: ProductoCreate, db: Session = Depends(get_db), usuario: str = Depends(get_current_user)):
    nuevo_producto = ProductoModel(**producto.dict())
    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)
    return nuevo_producto

@router.get("/", response_model=List[ProductoSchema])
def listar_productos(db: Session = Depends(get_db), usuario: str = Depends(get_current_user)):
    productos = db.query(ProductoModel).options(joinedload(ProductoModel.categoria)).all()
    return productos

@router.get("/{producto_id}", response_model=ProductoSchema)
def obtener_producto(producto_id: int, db: Session = Depends(get_db), usuario: str = Depends(get_current_user)):
    producto = db.query(ProductoModel).options(joinedload(ProductoModel.categoria)).filter(ProductoModel.id == producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.put("/{producto_id}", response_model=ProductoSchema)
def actualizar_producto(producto_id: int, producto_update: ProductoUpdate, db: Session = Depends(get_db), usuario: str = Depends(get_current_user)):
    producto = db.query(ProductoModel).filter(ProductoModel.id == producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    for key, value in producto_update.dict().items():
        setattr(producto, key, value)
    db.commit()
    db.refresh(producto)
    return producto

@router.delete("/{producto_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_producto(producto_id: int, db: Session = Depends(get_db), usuario: str = Depends(get_current_user)):
    producto = db.query(ProductoModel).filter(ProductoModel.id == producto_id).first()
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db.delete(producto)
    db.commit()
    return
