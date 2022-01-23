let carritoDeCompras = []
let arrayRelojes = []

//ANIMACION//
$(()=>{
    $('#contenedor-productos').append("<img src='./img/img_logo/logo_fest.gif'>")
    setTimeout(()=>{
        mostrarProductos(arrayRelojes)
    },1500);
})

//AJAX//
$.getJSON('./Json/mistock.json', function(data){
    data.forEach(elemento => arrayRelojes.push(elemento))
    recuperar()
})

//Se muestran los productos en el HTML//
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
                        <p class="card-text">Color: ${productos.color}</p>
                        <p class="card-text">Precio: ${productos.precio}€</p>
                        <p class="card-text">Material: ${productos.material}</p>
                        <p class="card-text">Categoria: ${productos.categoria}</p>
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
        //con este boton se agrega al carrito de compras//
        let botonAgregar = document.getElementById(`boton${productos.id}`)
        
        
        botonAgregar.addEventListener(`click`, ()=>{
            agregarAlCarrito(productos.id)
            Toastify({
                text: "Producto Agregado ✅",
                className: "info",
                style: {
                  background: "green",
                  fontSize: "12px",
                  marginRight: "7%",
                }
            }).showToast();
        });
    })
}
//Se agrega los produtos al carrito de compras//
function agregarAlCarrito(id) {
    let verificar = carritoDeCompras.find(elemento => elemento.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad +1
        $(`#cantidad${verificar.id}`).html (`<p id="cantidad${verificar.id}">Cantidad: ${verificar.cantidad}</p>`)
        actualizarCarrito()
        
    }else{
        let productoAgregar = arrayRelojes.find(producto => producto.id == id)
        carritoDeCompras.push(productoAgregar)  
        mostrarCarrito(productoAgregar)
        actualizarCarrito()
    }
    localStorage.setItem('carrito',JSON.stringify(carritoDeCompras))
}
//producto agregado en el carrito de compras//
function mostrarCarrito (productoAgregar){
    $('#carrito-contenedor').append(`
        <div class="productoEnCarrito">
            <div class="col-md-4">
                <img src="${productoAgregar.img}" class="imgProducto card-img-top img-fluid rounded-start">
            </div>
            <p>${productoAgregar.nombre}</p>
            <button class="boton-agregar" id='agregar${productoAgregar.id}'><i class="far fa-plus-square"></i></button>
            <button class="boton-eliminar" id='eliminar${productoAgregar.id}'><i class="far fa-minus-square"></i></button>
            <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
            <p>€${productoAgregar.precio}</p>
        </div>`
    
    )
    //boton agregar + producto//
    let btnAgregar = document.getElementById(`agregar${productoAgregar.id}`)
    
    btnAgregar.addEventListener('click', () =>{
        
        productoAgregar.cantidad = productoAgregar.cantidad + 1
        document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`
        actualizarCarrito()
        localStorage.setItem('carrito',JSON.stringify(carritoDeCompras))
        Toastify({
            text: "Producto Agregado ✅",
            className: "info",
            style: {
              background: "green",
              fontSize: "12px",
              marginRight: "7%",
            }
        }).showToast();

        
    })

    // Boton eliminar - prodcuto//
    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
      btnEliminar.addEventListener('click', () =>{
        if(productoAgregar.cantidad == 1){
            btnEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id )
            actualizarCarrito()
            localStorage.setItem('carrito',JSON.stringify(carritoDeCompras))
            Toastify({
                text: "Producto Eliminado ❌",
                className: "info",
                style: {
                    background: "black",
                    color: "white",
                    fontSize: "12px",
                    marginRight:" 1%",
                    
                    
                }
            }).showToast();

            }else{
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML =`<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`
                actualizarCarrito()
                localStorage.setItem('carrito',JSON.stringify(carritoDeCompras))
                Toastify({
                    text: "Producto Eliminado ❌",
                    className: "info",
                    style: {
                        background: "black",
                        color: "white",
                        fontSize: "12px",
                        marginRight:" 1%",
                    }
                }).showToast();
            }
    })
}
//recupera los datos obtenidos por el usuario//
function recuperar (){
    let recuperar = JSON.parse(localStorage.getItem('carrito'))
    if(recuperar){
        recuperar.forEach(el => {
            mostrarCarrito(el)
            carritoDeCompras.push(el)
            actualizarCarrito()
        })
    }
    if(carritoDeCompras.length == 0){
        $('#carrito-contenedor').append(`<h4 class="sinProd">Tu carrito esta vacio 😞</h4>`)
        $('.sinProd').show()
    }

}



//Aca se actualiza el carrito//
function  actualizarCarrito (){
    if(carritoDeCompras.length > 0){
        $('#finCompra').show()
        $('.sinProd').hide()

    }else{
        $('#finCompra').hide()
        $('.sinProd').show()
    }
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad , 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad),0)
    
    
}
//boton de finalizar compra con mensaje//
$('#finCompra').on('click', function () {
$.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carritoDeCompras), function(data,estado){
        
        if(data,estado){
            carritoDeCompras.map(item => item.cantidad = 1)
            carritoDeCompras= []
            localStorage.clear()
            actualizarCarrito()
            $('#carrito-contenedor').empty()
            $('#carrito-contenedor').append(`<h4 class="sinProd">Tu carrito esta vacio 😞</h4>`)
            
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su pedido fue aceptado correctamente',
            timer: 1550
          })
    })
    
} )

    
    
