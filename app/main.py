from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth
from app.routers import auth, productos
from app.routers import categoria




app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API Inventario en línea"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir frontend desde cualquier origen (ajustar en producción)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(productos.router)
app.include_router(categoria.router)
  
