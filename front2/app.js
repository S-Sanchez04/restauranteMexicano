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
        limpiarTabla([tablaClientes, tablaProductos, tablaPedidos]);
        ocultarTablas([tablaProductos, tablaPedidos]);
      mostrarTabla(tablaClientes);
    });
  
    btnProductos.addEventListener("click", function() {
        limpiarTabla([tablaClientes, tablaProductos, tablaPedidos]);
    ocultarTablas([tablaClientes, tablaPedidos]);
      mostrarTabla(tablaProductos);
    });
  
    btnPedidos.addEventListener("click", function() {
        limpiarTabla([tablaClientes, tablaProductos, tablaPedidos]);
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
    <div>
        <label for="nombreCliente">Nombre:</label>
        <input type="text" id="nombreCliente">
    </div>
    <div>
        <label for="cedulaCliente">Cédula:</label>
        <input type="text" id="cedulaCliente">
    </div>
    <div>
        <label for="licenciaCliente">Licencia:</label>
        <input type="text" id="licenciaCliente">
    </div>
    <div>
        <label for="direccionCliente">Dirección:</label>
        <input type="text" id="direccionCliente">
    </div><br>
    <button onclick="consultarClientes()">Consultar Clientes</button>
    <button onclick="crearCliente()">Crear Cliente</button>
    <button onclick="consultarCliente()">Consultar Cliente</button>
    <button onclick="eliminarCliente()">Eliminar Cliente</button>
    `;
    document.getElementById('content').innerHTML = content;
}

function loadProductoContent() {
    const content = `
        <h3>Operaciones de Producto</h3>
        <div>
            <label for="nombreProducto">Nombre:</label>
            <input type="text" id="nombreProducto">
        </div>
        <div>
            <label for="cantidadProducto">Cantidad:</label>
            <input type="text" id="cantidadProducto">
        </div>
        <div>
            <label for="ingredientesProducto">Ingredientes:</label>
            <input type="text" id="ingredientesProducto">
        </div>
        <div>
            <label for="descripcionProducto">Descripción:</label>
            <input type="text" id="descripcionProducto">
        </div>
        <div>
            <label for="precioProducto">Precio:</label>
            <input type="text" id="precioProducto">
        </div>
        <br> 
        <button onclick="consultarProductos()">Consultar Productos</button>
        <button onclick="crearProducto()">Crear Producto</button>
        <button onclick="consultarProducto()">Consultar Producto</button>
        <button onclick="eliminarProducto()">Eliminar Producto</button>
    `;
    document.getElementById('content').innerHTML = content;
}

function loadPedidoContent() {
    const content = `
        <h3>Operaciones de Pedido</h3>
        <div>
            <label for="IDCliente">IDCliente:</label>
            <input type="text" id="IDCliente">
        </div>
        <div>
            <label for="IDProductos">IDProductos:</label>
            <input type="text" id="IDProductos">
        </div>
        <div>
            <label for="Cantidad">Cantidad:</label>
            <input type="text" id="Cantidad">
        </div>
        <button onclick="consultarPedidos()">Consultar Pedidos</button>
        <button onclick="crearPedido()">Crear Pedido</button>
        <button onclick="consultarPedido()">Consultar Pedido</button>
    `;
    document.getElementById('content').innerHTML = content;
}

async function consultarClientes() {
    const response = await fetch('http://localhost:8080/Cliente/ConsultarClientes');
    const clientes = await response.json();
    mostrarClientesEnTabla(clientes)
}

async function crearCliente() {
    const nombre = document.getElementById('nombreCliente').value;
    const cedula = document.getElementById('cedulaCliente').value;
    const licencia = document.getElementById('licenciaCliente').value;
    const direccion = document.getElementById('direccionCliente').value;
    if(!nombre || !cedula || !direccion || !licencia){
        alert('Faltan datos por ingresar');
    }else{
        const cliente = { 
            nombre: nombre,
            id: cedula,
            direccion: direccion,
            licencia: licencia 
        };
        const response = await fetch('http://localhost:8080/Cliente/CrearCliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });
        const data = await response.json();
        consultarClientes()
    }
}
async function consultarCliente() {
    try{
    const id = document.getElementById('inputCedula').value;
    if(validaCedula(id)){
        const response = await fetch(`http://localhost:8080/Cliente/ConsultarCliente/${id}`);
        const cliente = await response.json();
        mostrarClienteEnTabla(cliente)
    }
    } catch (error) {
        console.error('Error al consultar clientes:', error);
    }
}

async function eliminarCliente() {
    const id = prompt("Ingrese el ID del cliente:");
    const response = await fetch(`http://localhost:8080/Cliente/EliminarCliente/${id}`, {
        method: 'DELETE'
    });
    const data = await response.text();
    alert(data);
    consultarClientes();
}

async function consultarProductos() {
    const clienteID = document.getElementById('inputCedula').value;
    if(validaCedula(clienteID)){
        const response = await fetch(`http://localhost:8080/Producto/ConsultarProductos/${clienteID}`);
        const productos = await response.json();
        mostrarProductosEnTabla(productos);
    }
}

async function crearProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const cantidad = document.getElementById('cantidadProducto').value;
    const ingredientes = document.getElementById('ingredientesProducto').value;
    const descripcion = document.getElementById('descripcionProducto').value;
    const precio = document.getElementById('precioProducto').value;
    if(!nombre || !cantidad || !ingredientes || !descripcion || !precio){
        alert('Faltan datos por ingresar');
    }else{
    const producto = {
        nombre: nombre,
        cantidad: cantidad,
        ingredientes: ingredientes,
        descripcion: descripcion,
        precio: parseFloat(precio),
        tieneDescuento: false
    };
    const response = await fetch('http://localhost:8080/Producto/CrearProducto', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    });
    const data = await response.json();
    consultarProductos();
    }
}



async function consultarProducto() {
    try{
    const id = prompt("Ingrese el ID del producto:");
    if(validaCedula(id)){
        const clienteID = document.getElementById('inputCedula').value;
        const response = await fetch(`http://localhost:8080/Producto/ConsultarProducto/${id}/${clienteID}`);
        const producto = await response.json();
        mostrarProductoEnTabla(producto)
    }
    } catch (error) {
        console.error('Error al consultar clientes:', error);
    }
}

async function eliminarProducto() {

    const id = prompt("Ingrese el ID del producto:");
    const response = await fetch(`http://localhost:8080/Producto/EliminarProducto/${id}`, {
        method: 'DELETE'
    });
    const data = await response.text();
    alert(data);
    consultarProductos();
}

async function consultarPedidos() {
    try{
        const response = await fetch('http://localhost:8080/Pedido/ConsultarPedidos');
        const pedidos = await response.json();
        mostrarPedidosEnTabla(pedidos);
    } catch (error) {
        console.error('Error al consultar clientes:', error);
    }
}

async function crearPedido() {
    try {
        const clienteResponse = await fetch(`http://localhost:8080/Cliente/ConsultarCliente/${IDCliente}`);
        if (!clienteResponse.ok) {
            throw new Error('Error al consultar cliente');
        }
        const cliente = await clienteResponse.json();

        const productosPromises = productosArray.map(async id => {
            const productoResponse = await fetch(`http://localhost:8080/Producto/ConsultarProducto/${id}/${IDCliente}`);
            const producto = await productoResponse.json();
            const cantidadIndex = productosArray.findIndex(productoId => productoId === id);
            const cantidad = cantidadIndex !== -1 ? parseInt(cantidadesArray[cantidadIndex]) : 0;
            return { ...producto, cantidad: cantidad };
        });

        const productos = await Promise.all(productosPromises);

        const pedido = { 
            cliente: cliente,
            productos: productos,
        };
        const response = await fetch('http://localhost:8080/Pedido/CrearPedido', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido)
    });
    const data = await response.json();
    consultarPedidos();
    }catch(error){
        console.error('Error al crear pedido:', error);
    }
}

async function consultarPedido() {
    const id = prompt("Ingrese el ID del pedido:");
    const response = await fetch(`http://localhost:8080/Pedido/ConsultarPedido/${id}`);
    const pedido = await response.json();
    mostrarPedidoEnTabla(pedido);
}


function mostrarClientesEnTabla(clientes) {
    const tablaClientes = document.getElementById('tablaClientes');

    const filas = tablaClientes.querySelectorAll("tr:not(:first-child)");
    const tbody = tablaClientes.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar contenido existente
    filas.forEach(fila => fila.remove());
    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.licencia}</td>
            <td>${cliente.direccion}</td>
        `;
        tbody.appendChild(fila);
    });
}
function mostrarClienteEnTabla(cliente) {
    const tablaClientes = document.getElementById('tablaClientes');
    const filas = tablaClientes.querySelectorAll("tr:not(:first-child)");
    const tbody = tablaClientes.querySelector('tbody');
    const fila = document.createElement('tr');
    tbody.innerHTML = ''; // Limpiar contenido existente

    filas.forEach(fila => fila.remove());
    fila.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.licencia}</td>
        <td>${cliente.direccion}</td>
    `;
    tbody.appendChild(fila);
}

function mostrarProductosEnTabla(productos) {
    const tablaProductos = document.getElementById('tabla-productos');

    const tbody = tablaProductos.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar contenido existente

    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.classList.add('fila');

        // Agregar celdas a la fila con los datos del producto
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.ingredientes}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.tieneDescuento}</td>
        `;

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(fila);
    });
}

function mostrarProductoEnTabla(producto) {
    const tablaProductos = document.getElementById('tabla-productos');

    const tbody = tablaProductos.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar contenido existente

    const fila = document.createElement('tr');
    fila.classList.add('fila');

    // Agregar celdas a la fila con los datos del producto
    fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.ingredientes}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.tieneDescuento}</td>
    `;

    // Agregar la fila al cuerpo de la tabla
    tbody.appendChild(fila);
}
function validaCedula(cedula){
    if (!cedula) {
        alert("La operación requiere cédula de cliente.");
        return false;
    }
    return true;
}

function mostrarPedidosEnTabla(pedidos) {
    const tablaPedidos = document.getElementById('tabla-pedidos');

    const tbody = tablaPedidos.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar contenido existente

    pedidos.forEach(pedido => {
        const fila = document.createElement('tr');
        const totalFormateado = `$${pedido.total.toLocaleString()}`;

        // Agregar celdas a la fila con los datos del pedido
        fila.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente.nombre}</td>
            <td>${pedido.productos.map(producto => producto.nombre).join(', ')}</td>
            <td>${totalFormateado}</td>
        `;

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(fila);
    });
}
function mostrarPedidoEnTabla(pedido) {
    const tablaPedidos = document.getElementById('tabla-pedidos');

    const tbody = tablaPedidos.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar contenido existente

    const fila = document.createElement('tr');
    const totalFormateado = `$${pedido.total.toLocaleString()}`;

    // Agregar celdas a la fila con los datos del pedido
    fila.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.cliente.nombre}</td>
        <td>${pedido.productos.map(producto => producto.nombre).join(', ')}</td>
        <td>${totalFormateado}</td>
    `;

    // Agregar la fila al cuerpo de la tabla
    tbody.appendChild(fila);
}
