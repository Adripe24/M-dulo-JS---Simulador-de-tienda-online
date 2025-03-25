/*let $header = document.querySelector('#headerContainer')

let $headerContainer = document.createElement('div');
$header.classList.add('header-container')*/



function renderData(productos) {
    let $container = document.querySelector('#characterContainer');
  
    for (let producto of productos) {
      let $pill = document.createElement('div');
      $pill.classList.add('character-pill');
      $pill.innerHTML = `
        <div class="character-pill">
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
                  <p class="character-info-content">${producto.precio}</p>
                </div>
                <div class="character-info">
                  <button class="btn-carrito">Agregar al carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      $container.appendChild($pill);
    }
  }
  
  renderData(productos);