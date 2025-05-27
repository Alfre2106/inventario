from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas.categoria import CategoriaSchema, CategoriaCreate, CategoriaUpdate
from app.models.categoria import Categoria
from app.database import get_db

router = APIRouter(prefix="/categorias", tags=["categorias"])

@router.get("/", response_model=List[CategoriaSchema])
def listar_categorias(db: Session = Depends(get_db)):
    return db.query(Categoria).order_by(Categoria.id.asc()).all()


@router.post("/", response_model=CategoriaSchema, status_code=status.HTTP_201_CREATED)
def crear_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    # Validar nombre único
    if db.query(Categoria).filter(Categoria.nombre == categoria.nombre).first():
        raise HTTPException(status_code=400, detail="La categoría ya existe")
    nueva_categoria = Categoria(nombre=categoria.nombre)
    db.add(nueva_categoria)
    db.commit()
    db.refresh(nueva_categoria)
    return nueva_categoria

@router.put("/{categoria_id}", response_model=CategoriaSchema)
def actualizar_categoria(categoria_id: int, categoria: CategoriaUpdate, db: Session = Depends(get_db)):
    categoria_db = db.query(Categoria).filter(Categoria.id == categoria_id).first()
    if not categoria_db:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    # Validar que el nuevo nombre no esté en uso por otra categoría
    if db.query(Categoria).filter(Categoria.nombre == categoria.nombre, Categoria.id != categoria_id).first():
        raise HTTPException(status_code=400, detail="El nombre ya está en uso")
    categoria_db.nombre = categoria.nombre
    db.commit()
    db.refresh(categoria_db)
    return categoria_db

@router.delete("/{categoria_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria_db = db.query(Categoria).filter(Categoria.id == categoria_id).first()
    if not categoria_db:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    db.delete(categoria_db)
    db.commit()
    return
