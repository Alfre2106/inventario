# Inventario Backend 🏪

## 👥 Integrantes del Proyecto
- Alfredo Mercado
- Edgar Rodelo
- Miguel Ángel de la Hoz

## 📦 Descripción del Proyecto
Inventario Backend es una aplicación web robusta de gestión de inventario desarrollada con FastAPI, diseñada para proporcionar una solución integral de administración de productos y categorías para pequeñas y medianas empresas.

## 🎯 Objetivos del Proyecto
- Gestionar inventario de manera eficiente
- Facilitar el registro y seguimiento de productos
- Proporcionar autenticación segura
- Ofrecer una API REST escalable y mantenible

## 🛠️ Tecnologías Utilizadas
### Lenguajes y Frameworks
- **Backend**: Python 3.13
- **Framework Web**: FastAPI
- **ORM**: SQLAlchemy

### Base de Datos
- **Sistema de Gestión**: MySQL
- **Herramienta**: XAMPP (Recomendado)

### Autenticación
- **Método**: JWT (JSON Web Tokens)
- **Librería**: python-jose

### Dependencias Principales
- Pydantic (Validación de datos)
- PyMySQL (Conector de Base de Datos)
- Uvicorn (Servidor ASGI)

## 📋 Requisitos Previos
### Requisitos de Sistema
- Python 3.13 o superior
- MySQL 8.0+
- pip (Gestor de paquetes de Python)

### Herramientas Recomendadas
- XAMPP
- Visual Studio Code
- Git
- Postman (Para pruebas de API)

## 🔧 Pasos de Instalación

### 1. Clonar Repositorio
```bash
git clone https://github.com/Alfre2106/inventario-backend.git
cd inventario-backend
```

### 2. Crear Entorno Virtual
```bash
# En Windows
python -m venv venv
.\venv\Scripts\activate

# En macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar Dependencias
```bash
pip install -r requirements.txt
```

## 🗄️ Configuración de Base de Datos

### Configurar MySQL
1. Iniciar XAMPP
2. Crear base de datos:
```sql
CREATE DATABASE inventario;
USE inventario;
```

### Inicializar Proyecto
```bash
# Crear tablas
python create_tables.py

# Inicializar categorías
python init_categorias.py
```

## ⚙️ Configuración del Proyecto
### Variables de Entorno
- Crear archivo `.env`
- Configurar:
  - Credenciales de base de datos
  - Clave secreta para JWT
  - Parámetros de conexión

## 🚀 Ejecutar la Aplicación

### Modo Desarrollo
```bash
uvicorn app.main:app --reload
```

### Modo Producción
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📡 Documentación de API
- **Swagger UI**: `http://localhost:8000/docs`
- **Explora endpoints interactivamente**
- **Prueba funcionalidades en tiempo real**

## 🔐 Autenticación

### Flujo de Autenticación
1. Registro de usuario
2. Inicio de sesión
3. Obtención de token JWT
4. Uso de token en solicitudes protegidas

### Endpoints de Autenticación
- `/auth/register`: Registro de usuarios
- `/auth/login`: Inicio de sesión
- `/auth/me`: Información del usuario actual

## 📦 Endpoints Principales

### Gestión de Productos
- `GET /productos`: Listar productos
- `POST /productos`: Crear producto
- `PUT /productos/{id}`: Actualizar producto
- `DELETE /productos/{id}`: Eliminar producto

### Gestión de Categorías
- `GET /categoria`: Listar categorías
- `POST /categoria`: Crear categoría
- `PUT /categoria/{id}`: Actualizar categoría

## 🧪 Ejemplos de Uso

### Crear Producto
```python
POST /productos
{
    "nombre": "Laptop Gaming",
    "descripcion": "Laptop de alto rendimiento",
    "precio": 1500.00,
    "categoria_id": 1,
    "stock": 10
}
```

### Iniciar Sesión
```python
POST /auth/login
{
    "username": "admin",
    "password": "contraseña_segura"
}
```

## 🤝 Contribuciones
1. Haz un fork del repositorio
2. Crea una rama nueva: `git checkout -b feature/nueva-caracteristica`
3. Realiza tus cambios
4. Prueba exhaustivamente
5. Crea un Pull Request

## 📊 Estructura del Proyecto
```
inventario-backend/
│
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── routers/
│       ├── auth.py
│       ├── productos.py
│       └── categoria.py
│
├── requirements.txt
├── create_tables.py
└── init_categorias.py
```

## 🐛 Solución de Problemas
- Revisa logs de la aplicación
- Verifica conexión de base de datos
- Asegúrate de tener todas las dependencias
- Consulta la documentación de API
