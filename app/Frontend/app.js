const API_URL = "http://localhost:8000"; // Cambia si despliegas en otro host

// Manejo token
function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function clearToken() {
  localStorage.removeItem("token");
}

// -------- LOGIN --------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: correo, password: contrasena }),
      });

      if (!res.ok) throw new Error("Correo o contraseña incorrectos");
      const data = await res.json();
      setToken(data.access_token);
      window.location.href = "dashboard.html";
    } catch (err) {
      document.getElementById("loginError").textContent = err.message;
      document.getElementById("loginError").style.display = "block";
    }
  });
}

// -------- REGISTRO --------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contrasena }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error en el registro");
      }

      alert("Registro exitoso, ya puedes iniciar sesión");
      window.location.href = "index.html";
    } catch (err) {
      document.getElementById("registerError").textContent = err.message;
      document.getElementById("registerError").style.display = "block";
    }
  });
}

// -------- DASHBOARD (CRUD productos) --------

const productosTableBody = document.querySelector("#productosTable tbody");
const productoModal = document.getElementById("productoModal");
const productoForm = document.getElementById("productoForm");
const modalTitle = document.getElementById("modalTitle");
const addProductoBtn = document.getElementById("addProductoBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    clearToken();
    window.location.href = "index.html";
  });
}

let editProductoId = null;

function openModal() {
  productoModal.style.display = "block";
  productoModal.classList.add("show");
}

function closeModal() {
  productoModal.style.display = "none";
  productoModal.classList.remove("show");
  productoForm.reset();
  editProductoId = null;
  modalTitle.textContent = "Nuevo Producto";
}

if (addProductoBtn) {
  addProductoBtn.addEventListener("click", () => {
    openModal();
  });
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

async function fetchProductos() {
  const token = getToken();
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/productos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    productosTableBody.innerHTML = "";

    data.forEach((prod) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${prod.nombre}</td>
        <td>${prod.descripcion || ""}</td>
        <td>${prod.precio.toFixed(2)}</td>
        <td>${prod.cantidad}</td>
        <td>
          <button class="btn btn-sm btn-warning btn-edit" data-id="${prod.id}">Editar</button>
          <button class="btn btn-sm btn-danger btn-delete" data-id="${prod.id}">Eliminar</button>
        </td>
      `;
      productosTableBody.appendChild(tr);
    });

    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        openEditProducto(id);
      });
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        deleteProducto(id);
      });
    });
  } catch (err) {
    alert(err.message);
  }
}

async function openEditProducto(id) {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener producto");
    const prod = await res.json();
    editProductoId = id;
    modalTitle.textContent = "Editar Producto";
    productoForm.nombre.value = prod.nombre;
    productoForm.descripcion.value = prod.descripcion || "";
    productoForm.precio.value = prod.precio;
    productoForm.cantidad.value = prod.cantidad;
    openModal();
  } catch (err) {
    alert(err.message);
  }
}

productoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = getToken();

  const productoData = {
    nombre: productoForm.nombre.value,
    descripcion: productoForm.descripcion.value,
    precio: parseFloat(productoForm.precio.value),
    cantidad: parseInt(productoForm.cantidad.value, 10),
  };

  try {
    let res;
    if (editProductoId) {
      res = await fetch(`${API_URL}/productos/${editProductoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productoData),
      });
    } else {
      res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productoData),
      });
    }

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al guardar producto");
    }

    closeModal();
    fetchProductos();
  } catch (err) {
    alert(err.message);
  }
});

async function deleteProducto(id) {
  if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

  const token = getToken();

  try {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al eliminar producto");
    fetchProductos();
  } catch (err) {
    alert(err.message);
  }
}

// Carga inicial dashboard
if (document.body.contains(productosTableBody)) {
  fetchProductos();
}
