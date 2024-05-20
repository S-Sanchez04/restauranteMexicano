let productos;
let contenedorProd; // Declarar contenedorProd en un ámbito global

// Definir una función que agregue el evento después de cargar los productos
function addEventToContenedorProd() {
    contenedorProd.addEventListener('click', e => {
        if (e.target.textContent === "Agregar") {
            setCarrito(e.target.parentElement.parentElement);
        }
        e.stopPropagation();
    });
}

async function loadRandomProducts() {
    try {
        // Realiza la solicitud a la API para obtener los datos de productos
        const response = await fetch('http://127.0.0.1:8000/api/products');

        if (response.ok) {
            const data = await response.json();

            // Asigna los datos a la variable productos
            productos = {
                producto1: {
                    nombre: data[0].name,
                    precio: data[0].price,
                    descripcion: data[0].descripcion,
                    srcImg: 'https://www.maricruzavalos.com/wp-content/uploads/2019/09/flautas-de-pollo-recipe.jpg'
                },
                producto2: {
                    nombre: data[1].name,
                    precio: data[1].price,
                    descripcion: data[1].descripcion,
                    srcImg: 'https://images-gmi-pmc.edge-generalmills.com/df8fe355-6eca-4e8e-abcb-4a718999be41.jpg'
                },
                producto3: {
                    nombre: data[2].name,
                    precio: data[2].price,
                    descripcion: data[2].descripcion,
                    srcImg: 'https://elcomercio.pe/resizer/OYwfSMJTQpPypohZc2Gm1ZkOdzg=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/N3RLTCLRIZAAXFATN2COWHZIZQ.jpg'
                },
                producto4: {
                    nombre: data[3].name,
                    precio: data[3].price,
                    descripcion: data[3].descripcion,
                    srcImg: 'https://recetinas.com/wp-content/uploads/2019/11/esquites-mexicanos.jpg'
                },
                producto5: {
                    nombre: data[4].name,
                    precio: data[4].price,
                    descripcion: data[4].descripcion,
                    srcImg: 'https://mandolina.co/wp-content/uploads/2020/11/comidas-mexicanas-recetas-fajitas-de-carne-1200x720.jpg'
                },
                producto6: {
                    nombre: data[5].name,
                    precio: data[5].price,
                    descripcion: data[5].descripcion,
                    srcImg: 'https://vod-hogarmania.atresmedia.com/cocinatis/images/images01/2019/04/12/5cb075f01f4daa0001932474/1239x697.jpg'
                },
                producto7: {
                    nombre: data[6].name,
                    precio: data[6].price,
                    descripcion: data[6].descripcion,
                    srcImg: 'https://assets.unileversolutions.com/recipes-v2/218407.jpg'
                },
                producto8: {
                    nombre: data[7].name,
                    precio: data[7].price,
                    descripcion: data[7].descripcion,
                    srcImg: 'https://i1.wp.com/itraalimentos.com/wp-content/uploads/2020/12/AdobeStock_273956677-min-scaled.jpeg?fit=1024%2C683&ssl=1'
                },
                producto9: {
                    nombre: data[8].name,
                    precio: data[8].price,
                    descripcion: data[8].descripcion,
                    srcImg: 'https://www.culinaryhill.com/wp-content/uploads/2022/08/Agua-De-Jamaica-Culinary-Hill-LR-04.jpg'
                },
                producto10: {
                    nombre: data[9].name,
                    precio: data[9].price,
                    descripcion: data[9].descripcion,
                    srcImg: 'https://i.blogs.es/f017a7/como-hacer-agua-de-horchata-arroz-3-/450_1000.jpg'
                }
            };

            console.log(productos);

            // Llama a la función para agregar productos al DOM
            agregarProductosAlDOM();

            // Llama a la función para agregar el evento al contenedor
            addEventToContenedorProd();
        } else {
            console.error('Error al obtener los datos de la API');
        }
    } catch (error) {
        console.error('Error en la solicitud a la API: ', error);
    }
}

function agregarProductosAlDOM() {
    const templateProd = document.getElementById('template-prod').content;
    contenedorProd = document.querySelector('.contenedor-productos'); // Asigna contenedorProd en este punto
    const fragment = document.createDocumentFragment();

    // Agregar productos al DOM
    Object.values(productos).forEach(producto => {
        const clone = templateProd.cloneNode(true);
        clone.querySelector('.div-info .nombre-prod').textContent = producto.nombre;
        clone.querySelector('.div-precio-boton .precio').textContent = producto.precio;
        clone.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion;
        clone.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre);
        clone.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg);
        fragment.appendChild(clone);
    });

    contenedorProd.appendChild(fragment);
}

// Llama a la función loadRandomProducts para obtener los datos de la API cuando sea necesario
loadRandomProducts();

// TODO LO RELACIONADO AL CARRITO DE COMPRA
let carrito = {}
const templateTabla = document.getElementById('agregar-producto-al-carro').content
const tbodyCarrito = document.getElementById('carrito-body')
const fragmentTabla = document.createDocumentFragment()
const templateFoot = document.getElementById('tfooter').content
const tfootCarrito = document.getElementById('footer')

const setCarrito = e => {
    const pivoteCarrito = {
        nombre: e.querySelector('.div-info .nombre-prod').textContent,
        precio: e.querySelector('.div-precio-boton .precio').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(pivoteCarrito.nombre)) {
        carrito[pivoteCarrito.nombre].cantidad += 1;
    } else {
        carrito[pivoteCarrito.nombre] = { ...pivoteCarrito };
    }
    pintarTabla(carrito);
}

const pintarTabla = objetoCarrito => {
    Object.values(objetoCarrito).forEach(objeto => {
        const cloneTabla = templateTabla.cloneNode(true);
        cloneTabla.querySelector('#producto').textContent = objeto.nombre;
        cloneTabla.querySelector('#cant').textContent = objeto.cantidad;
        cloneTabla.querySelector('#precio-uni').textContent = objeto.precio;
        let precioTotal = parseFloat(objeto.precio) * objeto.cantidad;
        cloneTabla.querySelector('#precio-total-prod').textContent = precioTotal.toFixed(2);
        fragmentTabla.appendChild(cloneTabla);
    });
    tbodyCarrito.innerHTML = '';
    tbodyCarrito.appendChild(fragmentTabla);
    pintarFooter();
}

const pintarFooter = () => {
    tfootCarrito.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        tfootCarrito.innerHTML = '<tr><td colspan="4">¡No hay ningún elemento en el carrito!</td></tr>';
    } else {
        const total = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + (cantidad * precio), 0);
        templateFoot.querySelector('#total-a-pagar').textContent = total.toFixed(2);
        const cloneFoot = templateFoot.cloneNode(true);
        fragmentTabla.appendChild(cloneFoot);
        tfootCarrito.appendChild(fragmentTabla);
        // Boton Vaciar carrito
        const botonVaciar = document.getElementById('vaciar-tabla');
        botonVaciar.addEventListener('click', () => {
            carrito = {};
            pintarTabla(carrito);
            pintarFooter();
        });

        // Botones aumentar y disminuir cantidades
    }
}

tbodyCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('button')) {
        aumentarDisminuir(e.target);
    }
});

const aumentarDisminuir = boton => {
    if (boton.textContent === '+') {
        const indicador = boton.parentElement.parentElement.firstElementChild.textContent;
        Object.values(carrito).forEach(elemento => {
            if (elemento.nombre === indicador) {
                carrito[elemento.nombre].cantidad++;
            }
        });
    }
    if (boton.textContent === '-') {
        const indicador = boton.parentElement.parentElement.firstElementChild.textContent;
        Object.values(carrito).forEach(elemento => {
            if (elemento.nombre === indicador) {
                carrito[elemento.nombre].cantidad--;
                if (carrito[elemento.nombre].cantidad === 0) {
                    delete carrito[elemento.nombre];
                }
            }
        });
    }
    pintarTabla(carrito);
    pintarFooter();
}
document.getElementById('comprar').addEventListener('click', async () => {
    const inputCedula = document.getElementById('inputCedula').value; // Obtener el valor de la cédula

    // Verificar si la cédula está ingresada
    if (!inputCedula) {
        alert('Por favor, ingrese la cédula antes de comprar.');
        return;
    }

    const orderId = generateOrderId(); // Generar un nuevo order id
    const productosOrden = Object.values(carrito).map(producto => producto.nombre).join('/'); // Obtener los nombres de los productos
    const orderData = {
        id: inputCedula,
        order_id: orderId,
        product_id: productosOrden,
        estado: 'en proceso'
    };

    try {
        // Realizar la solicitud POST a tu API con los datos de la orden
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('Orden enviada correctamente');
            // Limpia el carrito después de realizar la compra
            carrito = {};
            pintarTabla(carrito);
            pintarFooter();
        } else {
            console.error('Error al enviar la orden');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud: ', error);
    }
});

function generateOrderId() {
    // Función para generar un número de pedido único
    // Aquí puedes implementar la lógica para generar un número de pedido único, como por ejemplo, utilizando la fecha actual o un contador.
    // Por ejemplo:
    const currentDate = new Date();
    const orderId = currentDate.getTime(); // Utiliza el timestamp como orderId (puede que necesites un formato específico)
    return orderId;
}


