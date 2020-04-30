import React, { useEffect , useState } from 'react'
import Servicios from '../serviceReportes'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import './styleOeeGra.css'
import Loading from '@material-ui/core/CircularProgress'
import NoFound from '../../../Imagenes/noFound.png'
import Items from './items'
import Moment from 'moment'
import Typography from '@material-ui/core/Typography'

const OeeGranallado = ( props ) => {
    const [idMaquina , setIdMaquina] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )
    const [idMolde , setIdMolde] = useState ( '' )
    const [fechaProduccionDesde , setFechaProduccionDesde] = useState ( new Moment ( new Date (  ) ).add (  -1 , 'months').format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )
    const [fechaProduccionHasta , setFechaProduccionHasta] = useState ( new Date (  ) )
    const [vecMaquinas , setVecMaquinas] = useState ( '' )
    const [vecPiezas , setVecPiezas] = useState ( '' )
    const [vecMoldes , setVecMoldes] = useState ( '' )
    const [loading , setLoading] = useState ( true )
    const [vecDatosOee , setVecDatosOee] = useState ( [  ] )
    const [idAgrupar , setIdAgrupar] = useState( 1 )
    useEffect ( (  ) => {
        const getListas = async (  ) => {
            const listaMaq = await Servicios.listaMaquinas (  )
            const listaPie = await Servicios.listaPiezas (  )
            listaMaq.unshift ( { idMaquina : '' , nombreMaquina : 'NONE' , idTipoMaquina : 1 } )
            if ( listaMaq) {  setVecMaquinas ( listaMaq.filter ( mq => mq.idTipoMaquina === 1 ) )  }
            listaPie.unshift ( { idPieza : '' , nombrePieza : 'NONE' } )
            if ( listaPie) {  setVecPiezas ( listaPie )  }
        }
        getListas (  )
    }  , [ props ]  )
    useEffect ( (  ) => {
        const getMoldes = async (  ) => {
            const listaMoldes = await  Servicios.listaMoldes ( idPieza )
            console.log ( listaMoldes)
            if ( listaMoldes ) {
                setIdMolde ( '' )
                setVecMoldes ( listaMoldes )
            }
        }
        getMoldes (  )
    } , [ idPieza ] )
    useEffect ( (  ) => {
        setLoading ( true )
        const getListaOee = async (  ) => {
            const listaOee = await Servicios.listaOeeGranallado (  idMaquina === '' ? null : idMaquina ,
            idPieza === '' ? null : idPieza ,  idMolde === '' ? null : idMolde , fechaProduccionDesde , fechaProduccionHasta  )
            if ( listaOee.vecOeeGranallado && Array.isArray ( listaOee.vecOeeGranallado )) {
                var datosOEE = listaOee.vecOeeGranallado
                const agrupador = (  ) => {
                    if ( idAgrupar === 2 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            datosOEE[i].fechaProduccion = `SEM${new Moment (e.fechaProduccion).add(1 , 'd').week()}/${new Moment (e.fechaProduccion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            datosOEE[i].fechaProduccion = `${new Moment (e.fechaProduccion).add( 1 , 'd' ).add( 1, 'months' ).month()}/${new Moment (e.fechaProduccion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        datosOEE.forEach ( ( e , i ) => {
                            datosOEE[i].fechaProduccion = new Moment (e.fechaProduccion).year()
                        } )
                    }
                    var vecUnificado = [  ]
                    datosOEE.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaProduccion : null ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : null ,
                            produccion : 0 ,
                            pmMatrizeria : 0 ,
                            pmMantenimiento : 0 ,
                            pmProduccion : 0 ,
                            totalPNP : 0 ,
                            pmProgramada : 0 ,
                            totalRechazos : 0 ,
                            minTotal : 0
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificado ) && vecUnificado.length > 0 ) {
                            vecUnificado.forEach ( ( e , i ) => {
                                if ( items.fechaProduccion === e.fechaProduccion && items.idMaquina === e.idMaquina &&
                                    items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                        encontro = true
                                    }
                            } )
                        }
                        if ( encontro === false  ) {
                            var vecFiltrado = datosOEE
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaProduccion === d.fechaProduccion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                            newItems.fechaProduccion = items.fechaProduccion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            newItems.piezasXhora = items.piezasXhora
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                                newItems.totalRechazos += elem.totalRechazos === null ? 0 : parseInt ( elem.totalRechazos )
                                newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                                newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                                newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                                newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                                newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                                newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                            } )
                            vecUnificado.push ( newItems )
                        }
                    } )
                    var newItems2 = {
                        fechaProduccion : null ,
                        idPlanta : null  ,
                        idMaquina : undefined ,
                        nombreMaquina : null ,
                        idPieza : undefined ,
                        nombrePieza : null ,
                        idMolde : undefined ,
                        nombreMolde : null ,
                        piezasXhora : null ,
                        produccion : 0 ,
                        pmMatrizeria : 0 ,
                        pmMantenimiento : 0 ,
                        pmProduccion : 0 ,
                        totalPNP : 0 ,
                        pmProgramada : 0 ,
                        totalRechazos : 0 ,
                        minTotal : 0 ,
                        minNoCalidad : 0 ,
                        minPorPiezaProducidas : 0
                    }
                    vecUnificado.forEach ( ( e , i ) => {
                        newItems2.produccion += parseInt ( e.produccion )
                        newItems2.pmMatrizeria += parseInt ( e.pmMatrizeria )
                        newItems2.pmMantenimiento += parseInt ( e.pmMantenimiento )
                        newItems2.pmProduccion += parseInt ( e.pmProduccion )
                        newItems2.totalPNP += parseInt ( e.totalPNP )
                        newItems2.pmProgramada += parseInt ( e.pmProgramada )
                        newItems2.minTotal += parseInt ( e.minTotal )
                        newItems2.totalRechazos += parseInt ( e.totalRechazos )
                        vecUnificado[i].minNoCalidad = (  parseInt ( e.totalRechazos ) ) * 60 / parseInt ( e.piezasXhora )
                        vecUnificado[i].minPorPiezaProducidas = ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                        newItems2.minPorPiezaProducidas += ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                        newItems2.minNoCalidad += ( parseInt ( e.totalRechazos === null ? 0 : e.totalRechazos )  ) * 60 / parseInt ( e.piezasXhora )
                    } )
                    if ( vecUnificado.length > 0 ) {
                        vecUnificado.push ( newItems2 )
                    }
                    setVecDatosOee ( vecUnificado )
                }
                agrupador (  )
                setLoading ( false )
            } }
        getListaOee (  )
        }  , [ fechaProduccionDesde , fechaProduccionHasta , idMaquina , idPieza ,  idMolde , idAgrupar ]  )

    const vecAgrupar = [
        { idAgrupar : 1 , nombreAgrupar : 'DIA'} ,
        { idAgrupar : 2 , nombreAgrupar : 'SEMANA'} ,
        { idAgrupar : 3 , nombreAgrupar : 'MES'} ,
        { idAgrupar : 4 , nombreAgrupar : 'AÑO'} ,
    ]
    return (
        <div>
            <Typography style = { { marginTop : 15 , marginBottom : 20 } }  variant ='h3'>OEE Granallado</Typography>
            <div>
                <MyComponent.fecha id = 'fechaDesde' label = 'Fecha Produccion Desde' value = { fechaProduccionDesde } onChange = { e => setFechaProduccionDesde ( e ) } />
                <MyComponent.fecha id = 'fechaHasta' label = 'Fecha Produccion Hasta' value = { fechaProduccionHasta } onChange = { e => setFechaProduccionHasta ( e ) } />
                <MyComponent.listaDesplegable label = 'Maquina' value = { idMaquina } onChange = { e => setIdMaquina ( e.target.value ) } array = { vecMaquinas } member = { { valueMember : 'idMaquina' , displayMember : 'nombreMaquina' } } />
                <MyComponent.listaDesplegable label = 'Pieza' value = { idPieza } onChange = { e => setIdPieza ( e.target.value ) } array = { vecPiezas } member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } } />
                <MyComponent.listaDesplegable label = 'Molde' value = { idMolde } onChange = { e => setIdMolde ( e.target.value ) } array = { vecMoldes } member = { { valueMember : 'idMolde' , displayMember : 'nombreMolde' } } />
                <MyComponent.listaDesplegable label = 'Agrupar' value = { idAgrupar } onChange = { e => setIdAgrupar ( e.target.value ) } array = { vecAgrupar } member = { { valueMember : 'idAgrupar' , displayMember : 'nombreAgrupar' } } />
            </div>
            <div id = 'containerTabla'>
                <Table responsive >
                    <thead id = 'cabezera' >
                        <tr style = { { background : '#4141B3' , color : 'white' , boxShadow : '1px 1px  1px grey ' } }>
                            <th >Fecha</th>
                            <th>Maquina</th>
                            <th>Pieza</th>
                            <th>Molde</th>
                            <th>Pz x hs</th>
                            <th>Produccion</th>
                            <th>Rech</th>
                            <th>PM matri</th>
                            <th>PM mante</th>
                            <th>PM produc</th>
                            <th>Total PNP</th>
                            <th>Total PM prog</th>
                            <th>min dispon</th>
                            <th>min prog</th>
                            <th>min Totales</th>
                            <th className = 'D' >D</th>
                            <th className = 'R' >R</th>
                            <th className = 'Q' >Q</th>
                            <th className = 'OEE' >OEE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan ={ 19 }  >
                                    <Loading/>
                                </td>
                            </tr>
                            :
                            Array.isArray ( vecDatosOee ) && vecDatosOee.length > 0 ?
                            vecDatosOee.map ( ( items , i ) => {
                                return (
                                    <Items idAgrupar = { idAgrupar } key = { i } items = { items } ultimo = { ( vecDatosOee.length -1 ) === i  ? true : false} />
                                )
                            } )
                            :
                            <tr>
                                <td colSpan ={ 19 }  >
                                    <img src = { NoFound } alt = 'imgNoFound' />
                                </td>
                        </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default OeeGranallado