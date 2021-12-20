const material = document.getElementById('material')
const categoria = document.getElementById('categoria')
const color = document.getElementById('color')



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