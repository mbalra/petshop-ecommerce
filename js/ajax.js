let informacion = "https://mbalra.github.io/petshop-ecommerce/js/datos.json" ;


$.getJSON(informacion, function(respuesta, estado){
    if (estado === "success"){
        let misDatos = respuesta;
        for (const dato of respuesta){
            $("#veterinarias").prepend (`<div class="vet-item">
            <h3>${dato.nombre}</h3>
            <p>Direccion: ${dato.direccion}</p>
            <p>Telefono: ${dato.telefono}</p>
        </div>`)
        }
    }
})
