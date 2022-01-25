const material = document.getElementById('material')
const categoria = document.getElementById('categoria')
const color = document.getElementById('color')

let darkMode;

//modo dark//

if(localStorage.getItem('darkMode')) {
    darkMode = localStorage.getItem('darkMode')
} else {
    darkMode = "light"
}

localStorage.setItem('darkMode', darkMode)

$(() => {
    if(localStorage.getItem('darkMode') == "dark") {
        $('body').addClass('darkMode')
        $('#btnDarkMode').hide()
        $('#btnLightMode').show()
    } else {
        $('#btnLightMode').hide()
    }
    $('#btnLightMode').click(() => {
        $('#btnDarkMode').show()
        $('#btnLightMode').hide()
        
        $('body').removeClass('darkMode')
        localStorage.setItem('darkMode', "light")
    })
    
    $('#btnDarkMode').click(() => {
        $('#btnDarkMode').hide()
        $('#btnLightMode').show()

        $('body').addClass('darkMode')
        localStorage.setItem('darkMode', "dark")
    })
})

//filtros //
material.addEventListener('change', ()=>{

    if(material.value == 'all'){
        mostrarProductos(arrayRelojes)

    }else{
       mostrarProductos(arrayRelojes.filter(elemento => elemento.material == material.value))
    }
    
})

categoria.addEventListener('change', ()=>{

    if(categoria.value == 'all'){
        mostrarProductos(arrayRelojes)

    }else{
       mostrarProductos(arrayRelojes.filter(elemento => elemento.categoria == categoria.value))
    }
    
})

color.addEventListener('change', ()=>{

    if(color.value == 'all'){
        mostrarProductos(arrayRelojes)

    }else{
       mostrarProductos(arrayRelojes.filter(elemento => elemento.color == color.value))
    }
    
})