from app.database import SessionLocal
from app.models.categoria import Categoria

db = SessionLocal()

categorias = [
    "Electrónica",
    "Accesorios",
    "Hogar",
    "Oficina",
    "Ropa",
    "Alimentos",
    "Limpieza",
    "Juguetería",
    "Salud",
    "Ferretería"
]

for nombre in categorias:
    existe = db.query(Categoria).filter(Categoria.nombre == nombre).first()
    if not existe:
        nueva_categoria = Categoria(nombre=nombre)
        db.add(nueva_categoria)

db.commit()
db.close()

print("✅ Categorías insertadas correctamente.")
