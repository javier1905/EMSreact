var servicios = {  }

servicios.listaClientes = async (  ) => {
    var vecClientes = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/clientes/list` )
        if ( result ) {
            const json = await  result.json (  )
            vecClientes = json
        }
    }
    catch ( e ) {
        vecClientes = [  ]
    }
    return vecClientes
}
servicios.updateCliente = async ( idCliente , nombreCliente ,  razonSocialCliente ) => {
    var mensaje = ''
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/clientes/update` , {
            method : 'PUT' ,
            body : JSON.stringify( { idCliente , nombreCliente ,  razonSocialCliente } ) ,
            headers : new Headers ( {
                'Acept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            mensaje = json.mensaje
        }
    }
    catch ( e ) {
        mensaje = e.mensaje
    }
    return mensaje
}
servicios.deleteCliente = async ( idCliente ) =>{
    var mensaje = ''
    try {
        const result = await fetch ( `https://ems-node-api.herokuapp.com/api/clientes/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idCliente } ) ,
            headers : new Headers ( {
                'Acept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            mensaje = json.mensaje
        }
    }
    catch ( e ) {
        mensaje = e.mensaje
    }
    return mensaje
}
servicios.altaCliente = async ( nombreCliente ,  razonSocialCliente ) => {
    var mensaje = ''
    try {
        const result = await fetch ( `https://ems-node-api.herokuapp.com/api/clientes/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreCliente ,  razonSocialCliente } ) ,
            headers : new Headers ( {
                'Acept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            })
        } )
        if ( result ) {
            const json = await result.json (  )
            mensaje = json
        }
    }
    catch ( e ) {
        mensaje = e.mensaje
    }
    return mensaje
}

export default servicios