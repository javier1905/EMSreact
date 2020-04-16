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

servicios.listaMoldes = async (  ) => {
    var vecMoldes = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/moldes` , {
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