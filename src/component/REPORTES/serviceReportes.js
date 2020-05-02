var servicios = {}

servicios.listaOeeFundicion = async ( idMaquina , idPieza , idMolde , fechaFundicionDesde , fechaFundicionHasta ) => {
    var response = { vecOeefundicion : [  ] , status : '' }
    try {
        const result = await fetch ( `https://ems-node-api.herokuapp.com/api/oee/fundicion` , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaFundicionDesde , fechaFundicionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await result.json (  )
                response.vecOeefundicion = json
                response.status = 200
        }
    }
    catch ( e ) {
        response.vecOeefundicion = [  ]
        response.status = 403
    }
    return response
}

servicios.listaOeeGranallado = async ( idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta ) => {
var response = { vecOeeGranallado : [  ] , status : '' }
    try {
        const resultFetch = await fetch ( `https://ems-node-api.herokuapp.com/api/oee/granallado`  , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json',
                'Content-Type' : 'Application/json'
            } )
        })
        if ( resultFetch ) {
            const json = await resultFetch.json (  )
            if ( json.status && json.status === 403 ) {
                response.vecOeeGranallado = [  ]
                response.status = 403
            }
            else {
                response.vecOeeGranallado = json
                response.status = 200
            }
        }
    }
    catch ( e ) {
        response.vecOeeGranallado = [  ]
        response.status = 403
    }
    return response
}

servicios.listaOeeMecanizado = async ( idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta ) => {
    var response = { vecOeeMecanizado : [  ] , status : '' }
    try {
        const result = await fetch ( `https://ems-node-api.herokuapp.com/api/oee/mecanizado` , {
            method : 'POST' ,
            body : JSON.stringify ( { idMaquina , idPieza , idMolde , fechaProduccionDesde , fechaProduccionHasta } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json',
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json ) {
                if ( json.status  && json.status === 403 ) {
                    response.vecOeeMecanizado = [  ]
                    response.status = json.status
                }
                else {
                    response.vecOeeMecanizado = json
                    response.status = 200
                }
            }
        }
    }
    catch ( e ) {
        response.vecOeeMecanizado = [  ]
        response.status = 403
    }
    return response
}

servicios.listaMaquinas = async (  ) => {
    var vecMaquinas = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/maquinas` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecMaquinas = json
        }
    }
    catch ( e ) {
        vecMaquinas = [  ]
    }
    return vecMaquinas
}

servicios.listaMoldes = async ( idPieza ) => {
    var vecMoldes = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/moldes/xpieza/${idPieza === '' ? null : idPieza}` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecMoldes = json
        }
    }
    catch ( e ) {
        vecMoldes = [  ]
    }
    return vecMoldes
}
servicios.listaPiezas = async (  ) => {
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



export default servicios