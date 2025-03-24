// Seleccionamos el Header
let header = document.querySelector('header');

let divHeader = document.createElement('div');
divHeader.classList.add('header-container');

// Creamos los divs que va a tener el header y le ponemos una clase
let divInicio = document.createElement('div');
divInicio.classList.add('inicio');

let divLogos = document.createElement('div');
divLogos.classList.add('logos');

let divGreenShop = document.createElement('div');
divGreenShop.classList.add('green-shop');
// Añademos los divs al Header
divHeader.appendChild(divGreenShop);
divHeader.appendChild(divInicio);
divHeader.appendChild(divLogos);

// Creamos un h2 y lo añadimos con su correspondiente div
let h2GreenShop = document.createElement('h2');
h2GreenShop.textContent = 'GreenShop';
divGreenShop.appendChild(h2GreenShop)


// Creamos los siguientes textos y lo añadimos al divInicio
let inicio = document.createElement('h3');
inicio.textContent = 'Inicio';
divInicio.appendChild(inicio);

let plantas = document.createElement('h3');
plantas.textContent = 'Plantas';
divInicio.appendChild(plantas);

let blog = document.createElement('h3');
blog.textContent = 'Blog';
divInicio.appendChild(blog);

let contacto = document.createElement('h3');
contacto.textContent = 'Contacto';
divInicio.appendChild(contacto);


// Creamos los logos y lo añadimos al divLogos
let h3GreenShop = document.createElement('img');
h3GreenShop.textContent = 'Aqui hay que poner el logo';
divLogos.appendChild(h3GreenShop)

header.appendChild(divHeader);