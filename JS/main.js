let carritoDeCompras = []
let arrayRelojes = []




//ANIMACION//
$(()=>{
    $('#contenedor-productos').append("<img src='./img/img_logo/logo_fest.gif'>")
    setTimeout(()=>{
        mostrarProductos(arrayRelojes)
    },2000);
})

//AJAX//
$.getJSON('./Json/mistock.json', function(data){
    data.forEach(elemento => arrayRelojes.push(elemento))
    
})


function mostrarProductos(array){

    $('#contenedor-productos').empty()
    $('#contenedor-productos').fadeIn()

    array.forEach(productos => {
        $('#contenedor-productos').append(`
        <div class="producto">
            <div class="card " id="producto${productos.id} "style="width: 18rem; margin:6px">
                   <div class="card-image">
                       <img src='./img/img_logo/logo_fest.gif' class="loader">
                       <img src="${productos.img}" class="card-img-top productoLoad" ">
                       <span class="card-title">${productos.nombre}</span>
                       <button id="boton${productos.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></button>
                   </div>    
                <div class="card-content">
                    <p> Marca: ${productos.marca}</p>
                    <p class="card-text">Color:  ${productos.color}</p>
                    <p class="card-text">Material:  ${productos.material}</p>
                    <p class="card-text">${productos.precio}€</p>
                    <p class="card-text"> ${productos.categoria}</p>
                </div>
            </div>
        </div>    
        `)
        
        $('.productoLoad').on('load', function(){
            $(this).hide()
            setTimeout(() => {
                $(this).show()
                $('.loader').hide()
            }, 1000);
        })
        
        let botonAgregar = document.getElementById(`boton${productos.id}`)
        
        
        botonAgregar.addEventListener(`click`, ()=>{
            agregarAlCarrito(productos.id)
            Toastify({
                text: "Producto Agregado ✅",
                className: "info",
                style: {
                  background: "green",
                  fontSize: "12px",
                  marginRight:" 7%",
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
//producto en el carrito de compras//
function mostrarCarrito (productoAgregar){
    $('#carrito-contenedor').append(`
    <div class="productoEnCarrito">
        <div class="col-md-4">
            <img src="${productoAgregar.img}" class="imgProducto card-img-top img-fluid rounded-start">
        </div>
        <p>${productoAgregar.nombre}</p>
        <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>
        <p>€${productoAgregar.precio}</p>
        <button class="boton-eliminar" id='eliminar${productoAgregar.id}'><i class="fas fa-trash-alt"></i></button>
    </div>    
`)
    
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
                        fontSize: "12px",
                        marginRight:" 7%",
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
            actualizarCarrito()

        })
    }
}

recuperar()


function  actualizarCarrito (){
    if(carritoDeCompras.length > 0){
        $('#finCompra').show()
    }else{
        $('#finCompra').hide()
    }
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad , 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad),0)
    
}


//boton de finalizar compra con su mensaje (utilizando AJAX/JSON)//
$('#finCompra').on('click', function () {
$.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carritoDeCompras), function(data,estado){
        
        if(data,estado){
            carritoDeCompras.map(item => item.cantidad = 1)
            carritoDeCompras= []
            localStorage.clear()
            actualizarCarrito()
            $('#carrito-contenedor').empty()
            
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su pedido fue procesado correctamente Nº 4565s4dasdw48',
            showConfirmButton: false,
            timer: 2250
          })
    })
} )

    
    
