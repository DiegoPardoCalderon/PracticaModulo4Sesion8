import funciones from "./utils/funciones.js"
const { ajax } = funciones

$(document).ready(function(){

    $("#formulario-listado").submit(async function(event){
        event.preventDefault()
        let desde = Number($("#select-desde").val())
        let hasta = Number($("#select-hasta").val())

        if(desde > hasta) {
            return alert("El desde debe ser menor o igual al hasta");
        }

        let listado = []
        //Opción 1 Proceso síncrono
        // try {
        //     for (let index = desde; index <= hasta; index++) {
        //         let url = `https://superheroapi.com/api.php/10225832066284806/${index}`
        //         let respuesta = await ajax(url)
        //         listado.push(respuesta)
        //     }
        // } catch (error) {
        //     alert("Estimado usuario la petición ha fallado por favor reintentar")
        // }
        mostrarListado(listado)

        // Opción 2 Proceso Asíncrono
        for (let index = desde; index <= hasta; index++) {
            let url = `https://superheroapi.com/api.php/10225832066284806/${index}`
            let respuesta = ajax(url)
            listado.push(respuesta)
        }
        Promise.all(listado).then((respuestas) => {
            console.log(respuestas);
            mostrarListado(respuestas)
        }).catch((error) => {
            console.log("ErrorCatch", error);
            alert("Estimado usuario la petición ha fallado por favor reintentar")
        })
        // console.log(listado);
    })

    function mostrarListado(listado) {
        $("#listado-rango").html("")
        listado.forEach(element => {
            let raza = element.appearance.race === 'null' ? 'No definido' : element.appearance.race
            let [,altura] = element.appearance.height
            $("#listado-rango").append(`
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
    }
})