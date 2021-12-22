


let carritoDeCompras = []

// const contenedorProductos = document.getElementById('contenedor-productos') 
// const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');




mostrarProductos(arrayRelojes)

function mostrarProductos(array){

    // contenedorProductos.innerHTML = ''
    $('#contenedor-productos').empty()


    array.forEach(productos => {
        
        $('#contenedor-productos').append(`
        <div class="producto">
            <div class="card " id="producto${productos.id} "style="width: 18rem; margin:6px">
                   <div class="card-image">
                       <img src="${productos.img}" class="card-img-top" alt="...">
                       <span class="card-title">${productos.nombre}</span>
                       <a id="boton${productos.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                   </div>    
                <div class="card-content ">
                    <p> Marca:${productos.marca}</p>
                    <p class="card-text">Color:  ${productos.color}</p>
                    <p class="card-text">Material:  ${productos.material}</p>
                    <p class="card-text">€${productos.precio}</p>
                    <p class="card-text">Stock:  ${productos.stock}</p>
                    <p class="card-text color"> ${productos.categoria}</p>
                </div>
            </div>
        </div>    
        `)
        // contenedorProductos.appendChild(div)
        

        let botonAgregar = document.getElementById(`boton${productos.id}`)
        
        botonAgregar.addEventListener(`click`, ()=>{
            agregarAlCarrito(productos.id)
            

            Toastify({
                text: "Producto Agregado ✅",
                className: "info",
                style: {
                  background: "green",
                }
            }).showToast();
        });
    })
}

function agregarAlCarrito(id) {
    let verificar = carritoDeCompras.find(elemento => elemento.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad +1
        $(`#cantidad${verificar.id}`).html (`<p id="cantidad${verificar.id}">Cantidad:${verificar.cantidad}</p>`)
        actualizarCarrito()
    }else{
         let productoAgregar = arrayRelojes.find(producto => producto.id == id)

        carritoDeCompras.push(productoAgregar)  

        mostrarCarrito(productoAgregar)
        actualizarCarrito()


        
    }
    localStorage.setItem('carrito',JSON.stringify(carritoDeCompras))
}

function mostrarCarrito (productoAgregar){
    $('#carrito-contenedor').append(`<div class="productoEnCarrito">
            <p>${productoAgregar.nombre}</p>
            <p>Precio:€${productoAgregar.precio}</p>
            <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>
            <button class="boton-eliminar" id='eliminar${productoAgregar.id}'><i class="fas fa-trash-alt"></i></button>
        </div>    
        `)
        // contenedorCarrito.appendChild(div)

        let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)


        btnEliminar.addEventListener('click', () =>{
            if(productoAgregar.cantidad == 1){
                btnEliminar.parentElement.remove()
                carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id)
                actualizarCarrito()
                Toastify({
                    text: "Producto Eliminado ❌",
                    className: "info",
                    style: {
                        background: "black",
                        color: "white",
                    }
                }).showToast();
                localStorage.setItem('carrito',JSON.stringify(carritoDeCompras))
            }else{
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>`
                actualizarCarrito()
                localStorage.setItem('carrito',JSON.stringify(carritoDeCompras))
            }
        
        })


}



function recuperar (){
    let recuperar = JSON.parse(localStorage.getItem('carrito'))
    

    if(recuperar){
        recuperar.forEach(el => {
            mostrarCarrito(el)
            carritoDeCompras.push(el)
            actualizarCarrito(  )
        })
    }
}




recuperar()





function  actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad , 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad),0)
    
}






