// js/productos.js

const URL_API = "http://127.0.0.1:8000";

// Referencias al DOM
const tablaProductos = document.querySelector("#tabla-productos tbody");
const btnAgregarProducto = document.getElementById("btn-agregar-producto");
const inputBuscarProducto = document.getElementById("buscar-producto");

// Función para cargar productos
async function cargarProductos() {
  try {
    const res = await fetch(`${URL_API}/productos/`);
    const productos = await res.json();

    tablaProductos.innerHTML = "";
    productos.forEach(prod => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${prod.id}</td>
        <td>${prod.nombre}</td>
        <td>$${parseFloat(prod.precio).toFixed(2)}</td>
        <td>${prod.cantidad}</td>
        <td>${prod.categoria.nombre}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editarProducto(${prod.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${prod.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tablaProductos.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Buscar productos
inputBuscarProducto.addEventListener("input", async function () {
  const query = inputBuscarProducto.value.toLowerCase();
  const res = await fetch(`${URL_API}/productos/`);
  const productos = await res.json();

  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(query));
  tablaProductos.innerHTML = "";
  filtrados.forEach(prod => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td>$${parseFloat(prod.precio).toFixed(2)}</td>
      <td>${prod.cantidad}</td>
      <td>${prod.categoria.nombre}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarProducto(${prod.id})">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${prod.id})">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    tablaProductos.appendChild(fila);
  });
});

// Eliminar producto
async function eliminarProducto(id) {
  if (!confirm("¿Estás seguro de eliminar este producto?")) return;
  try {
    await fetch(`${URL_API}/productos/${id}`, { method: "DELETE" });
    cargarProductos();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

// Editar producto (placeholder)
function editarProducto(id) {
  alert("Funcionalidad de edición pendiente para el producto " + id);
}

// Crear producto (placeholder)
btnAgregarProducto.addEventListener("click", () => {
  alert("Formulario para agregar producto aún no implementado");
});

// Cargar productos al iniciar
cargarProductos();
