let carrito = {};

let header = document.querySelector('#headerContainer');

let $footer = document.querySelector('#idFooter');

let comprarCarrito = document.querySelector('#comprar-carrito')
comprarCarrito.addEventListener('click', comprar)

let vaciarCarrito = document.querySelector('#vaciar-carrito')
vaciarCarrito.addEventListener('click', vaciar)



if (header) {
    header.innerHTML = `
        <div class="content">
            <div class="logo">
                <a href="#">GreenShop</a>
            </div>
            <div class="information-container">
                <div class="information">
                    <a href="#">Inicio</a>
                </div>
                <div class="information">
                    <a href="#">Plantas</a>
                </div>
                <div class="information">
                    <a href="#">Blog</a>
                </div>
                <div class="information">
                    <a href="#">Contacto</a>
                </div>
            </div>
            <div class="logos-header">
                <div>
                    <button><img src="imagenes/Logos/gmail.png" alt="Gmail"></button>
                </div>
                <div>
                    <button><img src="imagenes/Logos/telefono.png" alt="Teléfono"></button>
                </div>
                <div>
                    <button id="verCarrito"><img src="imagenes/Logos/carrito-de-compras.png" alt="Carrito"></button>
                </div>
                <div>
                    <button><img src="imagenes/Logos/contacto.png" alt="Contacto"></button>
                </div>
            </div>
        </div>
    `;
}



// Carrito de Compra
let verCarritoBtn = document.querySelector('#verCarrito');
verCarritoBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    let shopCard = document.querySelector('#shop-card');
    shopCard.classList.toggle('show');
}

function mostrarCarrito() {
    let verCarrito = document.querySelector('#shop-card');
    verCarrito.classList.add('show');
}

// Fin del Carrito de Compra

function renderData(productos) {
    let container = document.querySelector('#characterContainer');

    if (container) {
        container.innerHTML = '';

        productos.forEach(producto => {
            let pill = document.createElement('div');
            pill.dataset.productId = producto.id;
            pill.classList.add('character-pill');
            pill.innerHTML = `
                <div class="character-body">
                    <div class="character-header">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="character-content">
                        <h1 class="character-name">${producto.nombre}</h1>
                        <div class="character-description">
                            <div class="character-info">
                                <p class="character-info-content">${producto.descripcion}</p>
                            </div>
                            <div class="character-info">
                                <p class="character-info-content">Precio: ${producto.precio} $</p>
                            </div>
                            <div class="character-info">
                                <button class="btn-carrito">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            let addBtn = pill.querySelector('.btn-carrito');
            addBtn.addEventListener('click', añadirEventoProducto);

            container.appendChild(pill);
        });
    }
}

function añadirEventoProducto() {
    let pill = this.closest('.character-pill');
    let productId = pill.dataset.productId;
    añadirProductos(productId);
}

function añadirProductos(productId) {
    if (!(productId in carrito)) {
        carrito[productId] = {
            productId: productId,
            cantidad: 0
        };
    }

    let producto = getProduct(productId)
    if(carrito[productId].cantidad + 1 > producto.stock) {
        alert('No queda stock')
        if(carrito[productId].cantidad === 0) {
            delete carrito[productId]
        }
    } else {
        carrito[productId].cantidad++;

        actualizarCarrito();
        mostrarCarrito();
    }
    
}

function quitarEventProductoCarrito(productId) {
    carrito[productId].cantidad--;

    if (carrito[productId].cantidad <= 0) {
        delete carrito[productId];
    }

    actualizarCarrito();
    mostrarCarrito();
}

function actualizarCarrito() {
    let contenido = document.querySelector('#lista-carrito tbody');
    contenido.innerHTML = ``;
    let total = 0;

    for (let productId in carrito) {
        let item = carrito[productId];
        let product = getProduct(productId);

        if (product == null) {
            alert('Hubo un error desconocido');
            return;
        }

        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.precio}$</td>
            <td>${item.cantidad}</td>
            <td>${(product.precio * item.cantidad).toFixed(2)}$</td>
            <td class="añadir-quitar-producto">
                <button class="añadir-producto" data-product-id="${productId}">+</button>
                <button class="quitar-producto" data-product-id="${productId}">-</button>
            </td>
        `;

        let añadirProducto = tr.querySelector('.añadir-producto');
        let quitarProducto = tr.querySelector('.quitar-producto');

        añadirProducto.addEventListener('click', añadirEventoDelProducto);
        quitarProducto.addEventListener('click', quitarProductoDelCarrito);

        contenido.append(tr);

        total += product.precio * item.cantidad;
    }

    let totalProducts = document.querySelector('#totalProducts');
    totalProducts.textContent = total.toFixed(2) + '$';
}

function getProduct(productId) {
    return productos.find(producto => producto.id === parseInt(productId));
}

function añadirEventoDelProducto() {
    let productId = this.dataset.productId;
    añadirProductos(productId);
}

function quitarProductoDelCarrito() {
    let productId = this.dataset.productId;
    quitarEventProductoCarrito(productId);
}

function vaciar() {
    carrito = {}
    actualizarCarrito();
}

function comprar() {
    if(Object.keys(carrito).length > 0) {
        alert('Compra Realizada con éxito')
        vaciar()
    } else {
        alert('Añade productos')
    }
}

renderData(productos);



// Footer
if ($footer) {
    let $idFooter = document.createElement('div');
    $idFooter.classList.add('spam');
    $idFooter.innerHTML = `
        <p>@2024 GreenShop - Todos los derechos reservados.</p>
    `;
    $footer.appendChild($idFooter);
}
