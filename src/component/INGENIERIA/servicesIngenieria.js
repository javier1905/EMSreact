var servicios = { }

servicios.listaClientes = async (  ) => {
    var vecClientes = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/clientes/list` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
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

servicios.listaTtiposMaterial = async (  ) => {
    var vecTiposMaterial = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/tiposMaterial/list`, {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await  result.json (  )
            vecTiposMaterial = json
        }
    }
    catch ( e ) {
        vecTiposMaterial = [  ]
    }
    return vecTiposMaterial
}
servicios.savePieza = async ( nombrePieza , idCliente , idTipoMaterial ) => {
    var response
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/piezas/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { nombrePieza , idCliente , idTipoMaterial } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await  result.json (  )
            response = json.mensaje
        }
    }
    catch ( e ) {
        response =  e.message
    }
    return response
}
servicios.listPiezas = async (  ) => {
    var vecPiezas = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/piezas` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await  result.json (  )
            vecPiezas = json
        }
    }
    catch ( e ) {
        vecPiezas =  [  ]
    }
    return vecPiezas
}
servicios.updatePieza = async ( idPieza , nombrePieza , idCliente , idTipoMaterial ) => {
    var mensaje = { }
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/piezas/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPieza , nombrePieza , idCliente , idTipoMaterial } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await  result.json (  )
            mensaje.exito = json.mensaje
        }
    }
    catch ( e ) { mensaje.fracaso =  e.message  }
    return mensaje
}
servicios.deletPieza = async ( idPieza ) => {
    var mensaje = { }
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/piezas/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idPieza } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await  result.json (  )
            mensaje.exito = json.mensaje
        }
    }
    catch ( e ) { mensaje.fracaso =  e.message  }
    return mensaje
}



export default servicios