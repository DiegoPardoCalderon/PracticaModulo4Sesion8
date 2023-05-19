import funciones from "./utils/funciones.js";
const { peticiones } = funciones

$(document).ready(function() {

    // Declaración del evento submit, para identificar cuando el usuario intenta buscar un superheroe
    $("#formulario").submit(async function(event){
        event.preventDefault();
        $("#listado-superheroes").html("")
        $("#alert-error").addClass("d-none")
        let busqueda = $("#txt-busqueda").val()
        let url = `https://superheroapi.com/api.php/10225832066284806/search/${busqueda}`

        //Opción 1 para esperar que termine de ejecutar la petición
        // let respuesta = peticiones(url)
        // respuesta.then((data) => console.log(data))

        //Opción 2 para esperar que termine de ejecutar la petición
        try {
            let respuesta = await peticiones(url)    
        } catch (error) {
            alert("Ha ocurrido un error")
        }
        


        if(respuesta.response === 'error') {
            return $("#alert-error").removeClass("d-none")
        }

        
        respuesta.results.forEach(element => {
            let raza = element.appearance.race === 'null' ? 'No definido' : element.appearance.race
            console.log(element.appearance.height);
            let [,altura] = element.appearance.height
            $("#listado-superheroes").append(`
                <div class="col-12 col-sm-6 col-lg-4 pb-3">
                    <div class="card">
                        <img src="${element.image.url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <div><span class="fw-bold">Género: </span> ${element.appearance.gender}</div>
                        <div><span class="fw-bold">Raza: </span> ${raza}</div>
                        <div><span class="fw-bold">Altura: </span> ${altura}</div>
                        <div><span class="fw-bold">Peso: </span> ${element.appearance.weight[1]}</div>
                        </div>
                    </div>
                </div>
            `)
        });
    })
})