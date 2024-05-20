document.getElementById('clienteBtn').addEventListener('click', () => {
    loadClienteContent();
});

document.getElementById('productoBtn').addEventListener('click', () => {
    loadProductoContent();
});

document.getElementById('pedidoBtn').addEventListener('click', () => {
    loadPedidoContent();
});



document.addEventListener("DOMContentLoaded", function() {
    const btnClientes = document.getElementById("clienteBtn");
    const btnProductos = document.getElementById("productoBtn");
    const btnPedidos = document.getElementById("pedidoBtn");
  
    const tablaClientes = document.getElementById("tablaClientes");
    const tablaProductos = document.getElementById("tablaProductos");
    const tablaPedidos = document.getElementById("tablaPedidos");
  
    btnClientes.addEventListener("click", function() {
        //limpiarTabla([tablaClientes, tablaProductos]);
        ocultarTablas([tablaProductos, tablaPedidos]);
      mostrarTabla(tablaClientes);
    });
  
    btnProductos.addEventListener("click", function() {
        //limpiarTabla([tablaClientes, tablaProductos]);
    ocultarTablas([tablaClientes, tablaPedidos]);
      mostrarTabla(tablaProductos);
    });
  
    btnPedidos.addEventListener("click", function() {
        //limpiarTabla([tablaClientes, tablaProductos]);
        ocultarTablas([tablaClientes, tablaProductos]);
      mostrarTabla(tablaPedidos);
    });
  });
  
  function limpiarTabla(tablas) {
    tablas.forEach(tabla => {
        const filas = tabla.querySelectorAll("tr:not(:first-child)");
        filas.forEach(fila => fila.remove());
    });
    }

  function mostrarTabla(tabla) {
    tabla.style.display = "block";
  }
  
  function ocultarTablas(tablas) {
    tablas.forEach(tabla => {
      tabla.style.display = "none";
    });
  }
  

function loadClienteContent() {
    const content = `
        <h3>Operaciones de Cliente</h3>
        <button onclick="consultarClientes()">Consultar Clientes</button>
        <button onclick="crearCliente()">Crear Cliente</button>
        <button onclick="consultarCliente()">Consultar Cliente</button>
        <button onclick="eliminarCliente()">Eliminar Cliente</button>
        <div id="clienteResult"></div>
    `;
    document.getElementById('content').innerHTML = content;
}

function loadProductoContent() {
    const content = `
        <h3>Operaciones de Producto</h3>
        <button onclick="consultarProductos()">Consultar Productos</button>
        <button onclick="crearProducto()">Crear Producto</button>
        <button onclick="consultarProducto()">Consultar Producto</button>
        <button onclick="eliminarProducto()">Eliminar Producto</button>
        <div id="productoResult"></div>
    `;
    document.getElementById('content').innerHTML = content;
}

function loadPedidoContent() {
    const content = `
        <h3>Operaciones de Pedido</h3>
        <button onclick="consultarPedidos()">Consultar Pedidos</button>
        <button onclick="crearPedido()">Crear Pedido</button>
        <button onclick="consultarPedido()">Consultar Pedido</button>
        <div id="pedidoResult"></div>
    `;
    document.getElementById('content').innerHTML = content;
}

async function consultarClientes() {
    const response = await fetch('http://localhost:8080/Cliente/ConsultarClientes');
    const clientes = await response.json();
    mostrarClientesEnTabla(clientes)
}

async function crearCliente() {
    const cedula = document.getElementById('inputCedula').value;
    const cliente = { cedula: cedula, nombre: 'Nombre de Ejemplo', licencia: 'Licencia de Ejemplo' };
    const response = await fetch('http://localhost:8080/Cliente/CrearCliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });
    const data = await response.json();
    document.getElementById('clienteResult').innerText = JSON.stringify(data, null, 2);
}

async function consultarCliente() {
    const id = document.getElementById('inputCedula').value;
    if(validaCedula(id)){
        const response = await fetch(`http://localhost:8080/Cliente/ConsultarCliente/${id}`);
        const cliente = await response.json();
        mostrarClienteEnTabla(cliente)
    }
}

async function eliminarCliente() {
    const id = prompt("Ingrese el ID del cliente:");
    const response = await fetch(`http://localhost:8080/Cliente/EliminarCliente/${id}`, {
        method: 'DELETE'
    });
    const data = await response.text();
    document.getElementById('clienteResult').innerText = data;
}

async function consultarProductos() {
    const clienteID = document.getElementById('inputCedula').value;
    if(validaCedula(clienteID)){
        const response = await fetch(`http://localhost:8080/Producto/ConsultarProductos/${clienteID}`);
        const productos = await response.json();
        mostrarProductosEnTabla(productos)
    }
}

async function crearProducto() {
    const producto = { nombre: 'Producto de Ejemplo', precio: 123.45 };
    const response = await fetch('http://localhost:8080/Producto/CrearProducto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    });
    const data = await response.json();
    document.getElementById('productoResult').innerText = JSON.stringify(data, null, 2);
}

async function consultarProducto() {
    const id = prompt("Ingrese el ID del producto:");
    if(validaCedula(id)){
        const clienteID = document.getElementById('inputCedula').value;
        const response = await fetch(`http://localhost:8080/Producto/ConsultarProducto/${id}/${clienteID}`);
        const producto = await response.json();
        mostrarProductoEnTabla(producto)
    }
}

async function eliminarProducto() {
    const id = prompt("Ingrese el ID del producto:");
    const response = await fetch(`http://localhost:8080/Producto/EliminarProducto/${id}`, {
        method: 'DELETE'
    });
    const data = await response.text();
    document.getElementById('productoResult').innerText = data;
}

async function consultarPedidos() {
    const response = await fetch('http://localhost:8080/Pedido/ConsultarPedidos');
    const data = await response.json();
    document.getElementById('pedidoResult').innerText = JSON.stringify(data, null, 2);
}

async function crearPedido() {
    const pedido = { clienteID: document.getElementById('inputCedula').value, productos: [] };
    const response = await fetch('http://localhost:8080/Pedido/CrearPedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    });
    const data = await response.json();
    document.getElementById('pedidoResult').innerText = JSON.stringify(data, null, 2);
}

async function consultarPedido() {
    const id = prompt("Ingrese el ID del pedido:");
    const response = await fetch(`http://localhost:8080/Pedido/ConsultarPedido/${id}`);
    const data = await response.json();
    document.getElementById('pedidoResult').innerText = JSON.stringify(data, null, 2);
}


function mostrarClientesEnTabla(clientes) {
    const tablaClientes = document.getElementById('tablaClientes');

    // Iterar sobre los clientes y agregarlos a la tabla como filas
    const filas = tablaClientes.querySelectorAll("tr:not(:first-child)");
    filas.forEach(fila => fila.remove());
    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.licencia}</td>
            <td>${cliente.direccion}</td>
        `;
        tablaClientes.appendChild(fila);
    });
}
function mostrarClienteEnTabla(cliente) {
    const tablaClientes = document.getElementById('tablaClientes');
    const fila = document.createElement('tr');
    const filas = tablaClientes.querySelectorAll("tr:not(:first-child)");
    filas.forEach(fila => fila.remove());
    fila.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.licencia}</td>
        <td>${cliente.direccion}</td>
    `;
    tablaClientes.appendChild(fila);
}

function mostrarProductosEnTabla(productos) {
    const tablaClientes = document.getElementById('tablaProductos');

    const filas = tablaProductos.querySelectorAll("tr:not(:first-child)");
    filas.forEach(fila => fila.remove());
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.ingredientes}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.tieneDescuento}</td>
        `;
        tablaClientes.appendChild(fila);
    });
}
function mostrarProductoEnTabla(producto) {
    const tablaClientes = document.getElementById('tablaProductos');

    const filas = tablaProductos.querySelectorAll("tr:not(:first-child)");
    filas.forEach(fila => fila.remove())
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.ingredientes}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.tieneDescuento}</td>
    `;
    tablaClientes.appendChild(fila);
}
function validaCedula(cedula){
    if (!cedula) {
        alert("La operación requiere cédula de cliente.");
        return false;
    }
    return true;
}
