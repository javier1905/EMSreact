var servicio = {  }

servicio.listaOperaciones = async ( controller ) => {
    var vecOperaciones = [  ]
    try {
        const response = await fetch('https://ems-node-api.herokuapp.com/api/operaciones', { signal : controller.signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if ( response.ok ) { vecOperaciones  = await response.json (  )  }
        else { vecOperaciones = [  ] }
    }
    catch ( e ) { vecOperaciones = [  ] }
    return vecOperaciones
}
servicio.listaMaquinaXoperacion  = async ( idOp , controller )  => {
    var vecMaq = [  ]
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/maquinas/xoperacion/${idOp}`, { signal : controller.signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if ( response.ok ) { vecMaq  = await response.json (  )  }
        else { vecMaq = [  ] }
    }
    catch ( e ) { vecMaq = [  ] }
    return vecMaq
}
servicio.listaPiezasXmaquina  = async ( idMaq , controller ) => {
    var vecPie = [  ]
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/piezas/xmaquina/${idMaq}`, { signal : controller.signal } , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Applitaction/json' ,
                'Content-Type' : 'Application/json'
            })
        })
        if ( response.ok ) { vecPie  = await response.json (  )  }
        else { vecPie = [  ] }
    }
    catch ( e ) { vecPie = [  ] }
    return vecPie
}
servicio.listaMoldesXpieza  = async ( idPie , controller ) => {
    var vecMol = [  ]
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/moldes/xpieza/${idPie}`, { signal : controller.signal } , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Applitaction/json' ,
                'Content-Type' : 'Application/json'
            })
        })
        if ( response.ok ) { vecMol  = await response.json (  )  }
        else { vecMol = [  ] }
    }
    catch ( e ) { vecMol = [  ] }
    return vecMol
}
servicio.listaParadaMaquinas  = async  controller  => {
    var vecPm = [  ]
    try {
        const response = await fetch( 'https://ems-node-api.herokuapp.com/api/paradasMaquina', { signal : controller.signal } , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Applitaction/json' ,
                'Content-Type' : 'Application/json'
            })
        })
        if ( response.ok ) { vecPm  = await response.json (  )  }
        else { vecPm = [  ] }
    }
    catch ( e ) { vecPm = [  ] }
    return vecPm
}
servicio.listaTurnos  = async controller => {
    var vecTur = [  ]
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/turnos` , { signal : controller.signal } , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Applitaction/json' ,
                'Content-Type' : 'Application/json'
            })
        })
        if ( response.ok ) { vecTur  = await response.json (  )  }
        else { vecTur = [  ] }
    }
    catch ( e ) { vecTur = [  ] }
    return vecTur
}
servicio.listaDefectos  = async controller => {
    var vecDef = [  ]
    try {
        const response = await fetch( 'https://ems-node-api.herokuapp.com/api/defectos' , { signal : controller.signal } , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Applitaction/json' ,
                'Content-Type' : 'Application/json'
            })
        })
        if ( response.ok ) { vecDef  = await response.json (  )  }
        else { vecDef = [  ] }
    }
    catch ( e ) { vecDef = [  ] }
    return vecDef
}
servicio.listaTrabajadores  = async controller => {
    var vecTrab = [  ]
    try {
        const response = await fetch( 'https://ems-node-api.herokuapp.com/api/trabajadores' , { signal : controller.signal } , {
            method : 'GET' ,
            headers : new Headers ( {
                'Accept' : 'Applitaction/json' ,
                'Content-Type' : 'Application/json'
            })
        })
        if ( response.ok ) { vecTrab  = await response.json (  )  }
        else { vecTrab = [  ] }
    }
    catch ( e ) { vecTrab = [  ] }
    return vecTrab
}
servicio.tipoProcesosXmaquinaYpieza = async  ( idPi , idMaq ) => {
    var tipoProceso = []
    const dato = {
        idPieza : parseInt ( idPi ) ,
        idMaquina : parseInt ( idMaq )
    }
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/tiposProceso`, {
            method : 'POST',
            body : JSON.stringify ( dato ) ,
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if(! response.ok ) { tipoProceso = [  ] }
        else { tipoProceso = await response.json (  ) }
    }
    catch ( e ) { tipoProceso = [  ] }
    return  tipoProceso
}

export default servicio
