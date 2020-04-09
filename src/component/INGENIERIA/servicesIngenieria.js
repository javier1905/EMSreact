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
servicios.deleteMolde = async ( idMolde ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/moldes/delete' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMolde } ) ,
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
servicios.updateMolde = async ( idMolde , nombreMolde , idPieza ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/moldes/update' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMolde , nombreMolde , idPieza } ) ,
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
servicios.insertMolde = async ( nombreMolde , idPieza ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/moldes/insert' , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreMolde , idPieza } ) ,
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








servicios.listaParadasMaquina = async (  ) => {
    var vecParadasMaquina = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/paradasMaquina` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecParadasMaquina = json
        }
    }
    catch ( e ) {
        vecParadasMaquina = [  ]
    }
    return vecParadasMaquina
}
servicios.deleteParadaMaquina = async ( idParadaMaquina ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/paradasMaquina/delete' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idParadaMaquina } ) ,
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
servicios.updateParadaMaquina = async ( idParadaMaquina , nombreParadaMaquina , tipoParadaMaquina , idArea ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/paradasMaquina/update' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idParadaMaquina , nombreParadaMaquina , tipoParadaMaquina , idArea } ) ,
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
servicios.insertParadaMaquina = async ( nombreParadaMaquina , tipoParadaMaquina , idArea ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/paradasMaquina/insert' , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreParadaMaquina , tipoParadaMaquina , idArea } ) ,
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

servicios.listaAreas = async (  ) => {
    var vecAreas = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/areas` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecAreas = json
        }
    }
    catch ( e ) {
        vecAreas = [  ]
    }
    return vecAreas
}
servicios.listaTiposMaquina = async (  ) => {
    var vecTiposMaquina = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/tiposMaquina/list` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecTiposMaquina = json
        }
    }
    catch ( e ) {
        vecTiposMaquina = [  ]
    }
    return vecTiposMaquina
}

servicios.listaPlantas = async (  ) => {
    var vecPlantas = [  ]
    try {
        const result = await fetch (`https://ems-node-api.herokuapp.com/api/plantas/list` , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Application/json' ,
                'Content-Type' : 'Application/json'
            } )
        })
        if ( result ) {
            const json = await result.json (  )
            vecPlantas = json
        }
    }
    catch ( e ) {
        vecPlantas = [  ]
    }
    return vecPlantas
}

servicios.deleteMaquina = async ( idMaquina ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/maquinas/delete' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMaquina } ) ,
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
servicios.updateMaquina = async ( idMaquina , nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/maquinas/update' , {
            method : 'PUT' ,
            body : JSON.stringify ( { idMaquina , nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta } ) ,
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
servicios.insertMaquina = async ( nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta ) => {
    var response = { mensaje : '' ,  status : 0 }
    try {
        const result = await fetch ( 'https://ems-node-api.herokuapp.com/api/maquinas/insert' , {
            method : 'POST' ,
            body : JSON.stringify ( { nombreMaquina , descripcionMaquina , idTipoMaquina , idPlanta } ) ,
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

export default servicios