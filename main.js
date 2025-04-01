

let carrito = {};
 
let header = document.querySelector('#headerContainer');
let footer = document.querySelector('#idFooter');
let comprarCarritoBtn = document.querySelector('#comprar-carrito');
let vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let verCarritoBtn = document.querySelector('#verCarrito');
let cerrarCarritoBtn = document.querySelector('#cerrarCarrito');
let characterContainer = document.querySelector('#characterContainer');
let shopCard = document.querySelector('#shop-card');
let listaCarrito = document.querySelector('#lista-carrito tbody');
let totalProductsElement = document.querySelector('#totalProducts');


comprarCarritoBtn?.addEventListener('click', comprarCarrito);
vaciarCarritoBtn?.addEventListener('click', vaciarCarrito);
verCarritoBtn?.addEventListener('click', toggleMenu);
cerrarCarritoBtn?.addEventListener('click', toggleMenu);


function init() {
 renderHeader();
 renderFooter();
 renderData(productos);
}

function renderHeader() {
    if (!header) return;


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


    let verCarritoBtn = header.querySelector('#verCarrito');
    verCarritoBtn?.addEventListener('click', toggleMenu);
}


function renderFooter() {
    if (!footer) return;


    footer.innerHTML = `
        <div class="spam">
            <p>@2024 GreenShop - Todos los derechos reservados.</p>
        </div>
        `;
}


// Funcionalidad del carrito
function toggleMenu() {
    shopCard?.classList.toggle('show');
}


function mostrarCarrito() {
    shopCard?.classList.add('show');
}


function renderData(productos) {
    if (!characterContainer) return;


    characterContainer.innerHTML = '';


    productos.forEach(producto => {
        let pill = createProductPill(producto);
        characterContainer.appendChild(pill);
    });
}


function createProductPill(producto) {
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
    addBtn?.addEventListener('click', () => añadirProductos(producto.id));

    return pill;
}


function añadirProductos(productId) {
    let producto = getProduct(productId);

    if (!producto) {
        Swal.fire({
            icon: "error",
            title: "Noo...",
            text: "¡No encuentro el producto!",
          });
        return;
    }


    if (!carrito[productId]) {
        carrito[productId] = {
            productId: productId,
            cantidad: 0
        };
    }


    if (carrito[productId].cantidad + 1 > producto.stock) {
        Swal.fire({
            icon: "error",
            title: "Noo...",
            text: "¡No quedan más en stock!",
          });
        return;
    }


    carrito[productId].cantidad++;
    actualizarCarrito();
    mostrarCarrito();
}


function quitarEventProductoCarrito(productId) {
    if (!carrito[productId]) return;


    carrito[productId].cantidad--;


    if (carrito[productId].cantidad <= 0) {
        delete carrito[productId];
    }


    actualizarCarrito();
    mostrarCarrito();
}


function actualizarCarrito() {
    if (!listaCarrito) return;


    listaCarrito.innerHTML = '';
    let total = 0;


    for (const productId in carrito) {
        if (!carrito.hasOwnProperty(productId)) continue;


        let item = carrito[productId];
        let product = getProduct(productId);


        if (!product) {
            Swal.fire({
                icon: "error",
                title: "Oh Ohhh",
                text: "Hubo un error desconocido",
              });
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


        let añadirProductoBtn = tr.querySelector('.añadir-producto');
        let quitarProductoBtn = tr.querySelector('.quitar-producto');


        añadirProductoBtn?.addEventListener('click', () => añadirProductos(productId));
        quitarProductoBtn?.addEventListener('click', () => quitarEventProductoCarrito(productId));


        listaCarrito.appendChild(tr);
        total += product.precio * item.cantidad;
 }


    totalProductsElement.textContent = total.toFixed(2) + '$';
}


function getProduct(productId) {
 return productos.find(producto => producto.id === parseInt(productId));
}


function vaciarCarrito() {
 carrito = {};
 actualizarCarrito();
}


function comprarCarrito() {
    if (Object.keys(carrito).length > 0) {
        let swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "¿Seguro que quieres comprar?",
            text: "Todavia puedes cancelarlo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, comprar",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Comprado",
                text: "Su pedido se ha realizado correctamente.",
                icon: "success"
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Su pedido ha sido cancelado.",
                icon: "success"
              });
            }
          });
        vaciarCarrito();
 } else {
    Swal.fire({
        icon: "error",
        title: "Oh ohhh...",
        text: "No hay nada en el carrito!",
      });
    }
}


init();
