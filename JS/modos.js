let darkMode;

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