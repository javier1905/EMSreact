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
servicios.listaProcesos = async (  ) => {
    var vecProcesos = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/procesos/list` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecProcesos = json
        }
    }
    catch ( e ) {
        vecProcesos = [  ]
    }
    return vecProcesos
}
servicios.insertProceso = async ( descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora ) => {
    var mensaje = ''
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/procesos/insert` , {
            // const result = await fetch (`http://localhost:5000/api/procesos/insert` , {
            method : 'POST' ,
            body : JSON.stringify ( { descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
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
servicios.updateProceso = async ( idProceso , descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora ) => {
    var mensaje = ''
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/procesos/update` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idProceso , descripcionProceso , idPieza , idMaquina , idTiposProceso , vecPiezasXhora } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
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
servicios.deleteProceso = async ( idProceso ) => {
    var mensaje = ''
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/procesos/delete` , {
            method : 'PUT' ,
            body : JSON.stringify ( { idProceso } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
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
servicios.listaTiposProceso = async (  ) => {
    var vecTiposProceso = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/tiposProceso` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecTiposProceso = json
        }
    }
    catch ( e ) {
        vecTiposProceso = [  ]
    }
    return vecTiposProceso
}
servicios.listaDefectos = async (  ) => {
    var vecDefectos = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/defectos` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecDefectos = json
        }
    }
    catch ( e ) {
        vecDefectos = [  ]
    }
    return vecDefectos
}
servicios.deleteDefecto = async ( idDefecto ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/defectos/delete' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idDefecto } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.updateDefecto = async ( idDefecto , nombreDefecto , idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/defectos/update' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idDefecto , nombreDefecto , idOperacion } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.insertDefecto = async ( nombreDefecto , idOperacion ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/defectos/insert' , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreDefecto , idOperacion } ) ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        } )
        if ( result ) {
            const json = await result.json (  )
            if ( json.status === 200 ) {
                response.mensaje = json.mensaje
                response.status = 200
            }
            else {
                response.mensaje = json.mensaje
                response.status = 403
            }
        }
    }
    catch ( e )  {
        response.mensaje = e.message
        response.status = 403
    }
    return response
}
servicios.listaOperaciones = async (  ) => {
    var vecOperaciones = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/operaciones` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecOperaciones = json
        }
    }
    catch ( e ) {
        vecOperaciones = [  ]
    }
    return vecOperaciones
}

export default servicios