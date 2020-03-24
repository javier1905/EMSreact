import Moment from 'moment'
var consultas = {  }
consultas.operaciones = async  (  ) => {
    var operaciones = []
    try {
        const response = await fetch('https://ems-node-api.herokuapp.com/api/operaciones', { signal : new AbortController(  ).signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if(! response.ok ) { operaciones = [  ] }
        else { operaciones = await response.json (  ) }
    }
    catch ( e ) { operaciones = [  ] }
    return  operaciones
}
consultas.maquinas = async  (  ) => {
    var maquinas = []
    try {
        const response = await fetch('https://ems-node-api.herokuapp.com/api/maquinas', { signal : new AbortController(  ).signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if(! response.ok ) { maquinas = [  ] }
        else { maquinas = await response.json (  ) }
    }
    catch ( e ) { maquinas = [  ] }
    return  maquinas
}
consultas.maquinasXoperaxion  = async  ( idOp ) => {
    var maquinas = []
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/maquinas/xoperacion/${idOp}`, { signal : new AbortController(  ).signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if(! response.ok ) { maquinas = [  ] }
        else { maquinas = await response.json (  ) }
    }
    catch ( e ) { maquinas = [  ] }
    return  maquinas
}
consultas.piezas = async  (  ) => {
    var pieza = []
    try {
        const response = await fetch('https://ems-node-api.herokuapp.com/api/piezas', { signal : new AbortController(  ).signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if(! response.ok ) { pieza = [  ] }
        else { pieza = await response.json (  ) }
    }
    catch ( e ) { pieza = [  ] }
    return  pieza
}
consultas.piezasXmaquina = async  ( idMaq  ) => {
    var pieza = []
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/piezas/xmaquina/${idMaq}` , { signal : new AbortController(  ).signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if(! response.ok ) { pieza = [  ] }
        else { pieza = await response.json (  ) }
    }
    catch ( e ) { pieza = [  ] }
    return  pieza
}
consultas.moldesXpieza = async  ( idPie ) => {
    var id = null
    if ( idPie !== '' ) { id = idPie }
    var molde = []
    try {
        const response = await fetch(`https://ems-node-api.herokuapp.com/api/moldes/xpieza/${id}`, { signal : new AbortController(  ).signal } , {
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        if(! response.ok ) { molde = [  ] }
        else { molde = await response.json (  ) }
    }
    catch ( e ) { molde = [  ] }
    return  molde
}
consultas.tipoProcesosXmaquinaYpieza = async  ( idPi , idMaq ) => {
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
consultas.tipoProcesos = async  (  ) => {
    var tipoProceso = []
    try {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/tiposProceso`, { signal : new AbortController(  ).signal } , {
            method : 'GET',
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
consultas.planillasProduccion = async ( fDesdeProduccion ,  fHastaProduccion ,
    fDesdeFundicion , fHastaFundicon , idMaq , idPie , idMol , idTipoPro ,  idOp ) => {
    var planillasProduccion = []
    const filtros = { fechaDesdeProduccion: new Moment(fDesdeProduccion).format("DD/MM/YYYY") ,
    fechaHastaProduccion: new Moment(fHastaProduccion).format("DD/MM/YYYY") ,
        fechaDesdeFundicion: new Moment(fDesdeFundicion).format("DD/MM/YYYY") ,
        fechaHastaFundicon: new Moment(fHastaFundicon).format("DD/MM/YYYY") ,
        idMaquina: idMaq === '' ? null : idMaq , idPieza: idPie === '' ? null : idPie ,
        idMolde: idMol === '' ? null : idMol , idTipoProceso : idTipoPro === '' ?null : idTipoPro  ,
        idOperacion : idOp === '' ? null : idOp
    }
    try {
        // const response = await fetch( `http://localhost:5000/api/planillasProduccion/listar`,  {
        const response = await fetch( `https://ems-node-api.herokuapp.com/api/planillasProduccion/listar`,  {
            method : 'POST',
            body : JSON.stringify ( filtros ) ,
            headers : new Headers ( {
                'Accept' : 'Applitaction/json' ,
                'Content-Type' : 'Application/json'
            })
        })
        if(! response.ok ) { planillasProduccion = [  ] }
        else { planillasProduccion = await response.json (  ) }
    }
    catch ( e ) { planillasProduccion = [  ] }
    return  planillasProduccion
}

export default consultas
