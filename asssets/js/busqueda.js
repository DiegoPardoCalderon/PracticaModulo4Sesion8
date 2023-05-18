import funciones from "./utils/funciones.js";
const { peticiones } = funciones


$(document).ready(function(){

    //Declaracion del evento submit, para identificar cuando el usuario intenta buscar un superheroe
    $("#formulario").submit(async function(event){
        event.preventDefault();
        $("#listado-superheroes").html("");
        $("#alert-error").addClass('d-none')
        let busqueda = $("#txt-busqueda").val();
        let url = `https://superheroapi.com/api.php/10229328223572231/search/${busqueda}`//fetch es ir a buscar a la api

        // opcion 1 para esperar que termine de ejecutar la peticion
        // let respuesta = peticioes(url);
        // respuesta.then((data) => console.log(data));

        
        // opcion 2 para esperar que termine de ejecutar la peticion
        let respuesta = await peticiones(url);

        if(respuesta.response === 'error') {
            return $("#alert-error").removeClass('d-none')
        }

       
        respuesta.results.forEach(element => {
             let raza = element.appearance.race === 'null' ? 'No Definido' : element.appearance.race   
             let [,altura] = element.appearance.height

            $("#listado-superheroes").append(`
            <div class="col-12 col-sm-6 col-lg-4 pb-3">
                <div class="card">
                    <img src="${element.image.url}" class="card-img-top" alt="${element.name}">
                    <div class="card-body">
                            <h5 class="card-title">${element.name}</h5>
                            <div><span class="fw-bold">Genero: </span> ${element.appearance.gender}</div>
                            <div><span class="fw-bold">Raza: </span> ${raza}</div>
                            <div><span class="fw-bold">Altura: </span> ${altura}</div>
                            <div><span class="fw-bold">Peso: </span> ${element.appearance.weight[1]}</div>
                    </div>
                </div>
            </div>
            
            `)
        });
        
    });
})