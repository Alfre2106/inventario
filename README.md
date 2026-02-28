# Sistema de Inventario - Backend API

API REST para la gestión de inventarios desarrollada con FastAPI.  
Permite administrar productos, categorías y autenticación de usuarios mediante JWT, con integración a base de datos MySQL.

Este proyecto fue desarrollado como práctica de desarrollo backend aplicando arquitectura de APIs, manejo de base de datos y buenas prácticas de desarrollo.

---

# Autor 
- Alfredo Mercado


---

# Arquitectura del Sistema

El sistema sigue una arquitectura basada en API REST.

Cliente (Frontend / Postman)  
↓  
FastAPI (Controladores / Routers)  
↓  
Lógica de negocio  
↓  
SQLAlchemy ORM  
↓  
Base de datos MySQL

---

# Tecnologías Utilizadas

Backend
- Python 3.13
- FastAPI
- SQLAlchemy

Base de datos
- MySQL
- PyMySQL

Autenticación
- JWT (JSON Web Tokens)
- python-jose

Servidor
- Uvicorn

Validación de datos
- Pydantic

Pruebas y documentación
- Swagger UI
- Postman

---

# Características del Sistema

- API REST estructurada
- Autenticación segura con JWT
- CRUD de productos
- CRUD de categorías
- Documentación automática con Swagger
- Arquitectura modular
- Validación de datos
- Integración con MySQL
- Pruebas de endpoints con Postman

---

# Requisitos

- Python 3.13 o superior
- MySQL 8+
- pip
- Git

Herramientas recomendadas
- Visual Studio Code
- XAMPP
- Postman

---

# Instalación

## Clonar repositorio
```bash
git clone https://github.com/Alfre2106/inventario-backend.git
cd inventario-backend
```

## Crear entorno virtual

Windows
```bash
python -m venv venv
venv\Scripts\activate
```

Linux / Mac
```bash
python3 -m venv venv
source venv/bin/activate
```

## Instalar dependencias
```bash
pip install -r requirements.txt
```

---

# Configuración de Base de Datos

Crear base de datos:

```sql
CREATE DATABASE inventario;
USE inventario;
```

Inicializar tablas del sistema:

```bash
python create_tables.py
python init_categorias.py
```

---

# Variables de entorno

Crear archivo `.env`:

```
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=inventario
SECRET_KEY=clave_super_secreta
```

---

# Ejecutar la Aplicación

Modo desarrollo

```bash
uvicorn app.main:app --reload
```

Documentación interactiva

```
http://localhost:8000/docs
```

---

# Flujo de Autenticación

1. El usuario se registra en el sistema
2. Inicia sesión
3. El servidor genera un token JWT
4. El cliente usa el token para acceder a rutas protegidas

---

# Endpoints principales

Autenticación
- POST /auth/register
- POST /auth/login
- GET /auth/me

Productos
- GET /productos
- POST /productos
- PUT /productos/{id}
- DELETE /productos/{id}

Categorías
- GET /categoria
- POST /categoria
- PUT /categoria/{id}

---

# Ejemplo de Request

Crear producto

```json
POST /productos
{
  "nombre": "Laptop Gaming",
  "descripcion": "Laptop de alto rendimiento",
  "precio": 1500,
  "categoria_id": 1,
  "stock": 10
}
```

---

# Estructura del Proyecto

```
inventario-backend
│
├── app
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── routers
│       ├── auth.py
│       ├── productos.py
│       └── categoria.py
│
├── requirements.txt
├── create_tables.py
└── init_categorias.py
```

---

# Objetivo del Proyecto

Este proyecto fue desarrollado para demostrar conocimientos en:

- Desarrollo de APIs REST
- Arquitectura backend
- Autenticación con JWT
- Manejo de bases de datos
- Documentación de APIs
- Pruebas de endpoints
- Organización de proyectos backend

---

# Posibles mejoras futuras

- Sistema de roles de usuario
- Paginación en endpoints
- Dashboard frontend conectado a la API
- Deploy en servidor o cloud
- Tests automatizados
