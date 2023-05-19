const peticiones = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((respuesta) => respuesta.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    }) 
}

const ajax = (url) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "GET",
            data: {},
            success: function(data) {
                resolve(data);
            },
            error: function(error) {
                console.log(error);
                reject(error)
            }
        })
    })
}

export default { peticiones, ajax }