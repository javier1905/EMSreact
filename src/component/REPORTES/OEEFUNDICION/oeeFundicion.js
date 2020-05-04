import React, { useEffect , useState } from 'react'
import Servicios from '../serviceReportes'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import './styleOeeFun.css'
import Loading from '@material-ui/core/CircularProgress'
import NoFound from '../../../Imagenes/noFound.png'
import Items from './items'
import Moment from 'moment'
import Typography from '@material-ui/core/Typography'
import GraficoOeeFun from './graficoOeeFun'

const OeeFundicion = ( props ) => {
    const [idMaquina , setIdMaquina] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )
    const [idMolde , setIdMolde] = useState ( '' )
    const [fechaFundicionDesde , setFechaFundicionDesde] = useState ( new Moment ( new Date (  ) ).add (  -1 , 'months').format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )
    const [fechaFundicionHasta , setFechaFundicionHasta] = useState ( new Date (  ) )
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
            if ( listaMaq) {
                listaMaq.unshift ( { idMaquina : '' , nombreMaquina : 'NONE' } )
                setVecMaquinas ( listaMaq )
            }
            if ( listaPie) {
                listaPie.unshift ( { idPieza : '' , nombrePieza : 'NONE' } )
                setVecPiezas ( listaPie )
            }
        }
        getListas (  )
    }  , [ props ]  )
    useEffect ( (  ) => {
        const getMoldes =  async (  ) => {
            const listaMoldes = await Servicios.listaMoldes ( idPieza )
            if (  listaMoldes ) {
                if (Array.isArray ( listaMoldes ) ) {
                    listaMoldes.unshift (  { idMolde : '' , nombreMolde : 'NONE' } )
                }
                setIdMolde ( '' )
                setVecMoldes ( listaMoldes )
            }
        }
        getMoldes (  )
    } , [ idPieza ] )
    useEffect ( (  ) => {
        setLoading ( true )
        const getListaOee = async (  ) => {
            const listaOee = await Servicios.listaOeeFundicion (  idMaquina === '' ? null : idMaquina ,
            idPieza === '' ? null : idPieza ,  idMolde === '' ? null : idMolde , fechaFundicionDesde , fechaFundicionHasta  )
            if ( listaOee.vecOeefundicion && Array.isArray ( listaOee.vecOeefundicion )) {
                    var vecP1 = listaOee.vecOeefundicion.filter ( items => items.idPlanta === 1 )
                    var vecP2 = listaOee.vecOeefundicion.filter ( items => items.idPlanta === 2 )
                const unificadorVecP1 = ( vecP1 ) => {
                    if ( idAgrupar === 2 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = `SEM${new Moment (e.fechaFundicion).add(1 , 'd').week()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = `${new Moment (e.fechaFundicion).add( 1 , 'd' ).add( 1, 'months' ).month()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        vecP1.forEach ( ( e , i ) => {
                            vecP1[i].fechaFundicion = new Moment (e.fechaFundicion).year()
                        } )
                    }
                    var vecUnificadoP1 = [  ]
                    vecP1.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaFundicion : null ,
                            idPlanta : 1 ,
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
                            pmOtros : 0 ,
                            totalPNP : 0 ,
                            pmProgramada : 0 ,
                            setup : 0 ,
                            totalrechazosPlanta2 : 0 ,
                            totalrechazosPlanta1 : 0 ,
                            minTotal : 0
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificadoP1 ) && vecUnificadoP1.length > 0 ) {
                        vecUnificadoP1.forEach ( ( e , i ) => {
                            if ( items.fechaFundicion === e.fechaFundicion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde && items.piezasXhora === e.piezasXhora ) {
                                    encontro = true
                                }
                        } ) }
                        if ( encontro === false  ) {
                            var vecFiltrado = vecP1
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaFundicion === d.fechaFundicion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde && items.piezasXhora === d.piezasXhora ) )
                            newItems.fechaFundicion = items.fechaFundicion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            newItems.piezasXhora = items.piezasXhora
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.produccion += elem.produccion === null ? 0 : parseInt ( elem.produccion )
                                newItems.totalrechazosPlanta1 += elem.totalrechazosPlanta1 === null ? 0 : parseInt ( elem.totalrechazosPlanta1 )
                                newItems.totalrechazosPlanta2 += elem.totalrechazosPlanta2 === null ? 0 : parseInt ( elem.totalrechazosPlanta2 )
                                newItems.pmMatrizeria += elem.pmMatrizeria === null ? 0 : parseInt ( elem.pmMatrizeria )
                                newItems.pmMantenimiento += elem.pmMantenimiento === null ? 0 : parseInt ( elem.pmMantenimiento )
                                newItems.pmProduccion += elem.pmProduccion === null ? 0 : parseInt ( elem.pmProduccion )
                                newItems.pmOtros += elem.pmOtros === null ? 0 : parseInt ( elem.pmOtros )
                                newItems.totalPNP += elem.totalPNP === null ? 0 : parseInt ( elem.totalPNP )
                                newItems.pmProgramada += elem.pmProgramada === null ? 0 : parseInt ( elem.pmProgramada )
                                newItems.minTotal += elem.minTotal === null ? 0 : parseInt ( elem.minTotal )
                                newItems.setup += elem.setup === null ? 0 : parseInt ( elem.setup )
                            })
                            vecUnificadoP1.push ( newItems )
                        }
                    } )
                    return vecUnificadoP1
                }
                const unificadorVecP2 = ( vecP2 ) => {
                    var vecUnificadoP2 = [  ]
                    if ( idAgrupar === 2 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = `SEM${new Moment (e.fechaFundicion).add(1 , 'd').week()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 3 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = `${new Moment (e.fechaFundicion).add( 1 , 'd' ).add( 1, 'months' ).month()}/${new Moment (e.fechaFundicion).year()}`
                        } )
                    }
                    else if ( idAgrupar === 4 ) {
                        vecP2.forEach ( ( e , i ) => {
                            vecP2[i].fechaFundicion = new Moment (e.fechaFundicion).year()
                        } )
                    }
                    vecP2.forEach ( ( items , i ) => {
                        var newItems = {
                            fechaFundicion : null ,
                            idPlanta : 2 ,
                            idMaquina : undefined ,
                            nombreMaquina : null ,
                            idPieza : undefined ,
                            nombrePieza : null ,
                            idMolde : undefined ,
                            nombreMolde : null ,
                            piezasXhora : items.piezasXhora ,
                            produccion : null ,
                            pmMatrizeria : null ,
                            pmMantenimiento : null ,
                            pmProduccion : null ,
                            pmOtros : null ,
                            totalPNP : null ,
                            pmProgramada : null ,
                            setup : null ,
                            totalrechazosPlanta2 : 0 ,
                            totalrechazosPlanta1 : null ,
                            minTotal : null
                        }
                        var encontro = false
                        if ( Array.isArray ( vecUnificadoP2 ) && vecUnificadoP2.length > 0 ) {
                        vecUnificadoP2.forEach ( ( e , i ) => {
                            if ( items.fechaFundicion === e.fechaFundicion && items.idMaquina === e.idMaquina &&
                                items.idPieza === e.idPieza && items.idMolde === e.idMolde ) {
                                    encontro = true
                                }
                        } ) }
                        if ( encontro === false  ) {
                            var vecFiltrado = vecP2
                            vecFiltrado = vecFiltrado.filter ( d => ( items.fechaFundicion === d.fechaFundicion && items.idMaquina === d.idMaquina
                                && items.idPieza === d.idPieza && items.idMolde === d.idMolde  ) )
                            newItems.fechaFundicion = items.fechaFundicion
                            newItems.idMaquina = items.idMaquina
                            newItems.nombreMaquina = items.nombreMaquina
                            newItems.idPieza = items.idPieza
                            newItems.nombrePieza = items.nombrePieza
                            newItems.idMolde = items.idMolde
                            newItems.nombreMolde = items.nombreMolde
                            vecFiltrado.forEach ( ( elem , i ) => {
                                newItems.totalrechazosPlanta2 += elem.totalrechazosPlanta2 === null ? 0 : parseInt ( elem.totalrechazosPlanta2 )
                            })
                            vecUnificadoP2.push ( newItems )
                        }
                    } )
                    return vecUnificadoP2
                }
                const unificadorP1conP2 = ( vecPlantaUno , vecPlantaDos ) => {
                    var vecFinal = vecPlantaUno
                    vecPlantaDos.forEach ( ( p2 , i ) => {
                        vecPlantaUno.forEach ( ( p1 , index ) => {
                            if ( p2.fechaFundicion === p1.fechaFundicion  && p2.idPieza === p1.idPieza && p2.idMolde === p1.idMolde ) {
                                vecFinal[index].totalrechazosPlanta2 += p2.totalrechazosPlanta2 === null ? 0 : parseInt ( p2.totalrechazosPlanta2 )
                            }
                        } )
                    } )
                    var vecNoEncontrados =[ ]
                    // vecPlantaDos.forEach ( ( p2 , i ) => {
                    //     var element = vecPlantaUno.find ( e => ( p2.fechaFundicion === e.fechaFundicion && e.idMaquina === e.idMaquina && p2.idPieza === e.idPieza && p2.idMolde === e.idMolde ) )
                    //     if ( element === undefined ) {
                    //         if ( p2.totalrechazosPlanta2 > 0 ) {
                    //             vecNoEncontrados.push ( p2 )
                    //         }
                    //     }
                    // } )
                    vecPlantaDos.forEach ( ( p2 , i ) => {
                        var elemento = undefined
                        vecPlantaUno.forEach ( ( p1 , indexp1 ) => {
                            if ( p2.fechaFundicion === p1.fechaFundicion  && p2.idPieza === p1.idPieza && p2.idMolde === p1.idMolde ) {
                                elemento = p2
                            }
                        } )
                        if ( elemento === undefined ) {
                            if ( p2.totalrechazosPlanta2 > 0 ) {
                                vecNoEncontrados.push ( p2 )
                            }
                        }
                    } )
                    vecFinal = vecFinal.concat ( vecNoEncontrados )
                    return vecFinal
                }
                var vecP1MasvecP2 = unificadorP1conP2 ( unificadorVecP1( vecP1 ) , unificadorVecP2( vecP2 ) )
                var newItems2 = {
                    fechaFundicion : null ,
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
                    pmOtros : 0 ,
                    totalPNP : 0 ,
                    pmProgramada : 0 ,
                    setup : 0 ,
                    totalrechazosPlanta2 : 0 ,
                    totalrechazosPlanta1 : 0 ,
                    minTotal : 0 ,
                    minNoCalidad : 0 ,
                    minPorPiezaProducidas : 0
                }
                vecP1MasvecP2.forEach ( ( e , i ) => {
                    if ( e.idPlanta === 1  ) {
                        newItems2.produccion += parseInt ( e.produccion )
                        newItems2.pmMatrizeria += parseInt ( e.pmMatrizeria )
                        newItems2.pmMantenimiento += parseInt ( e.pmMantenimiento )
                        newItems2.pmProduccion += parseInt ( e.pmProduccion )
                        newItems2.pmOtros += parseInt ( e.pmOtros )
                        newItems2.totalPNP += parseInt ( e.totalPNP )
                        newItems2.pmProgramada += parseInt ( e.pmProgramada )
                        newItems2.setup += parseInt ( e.setup )
                        newItems2.minTotal += parseInt ( e.minTotal )
                        newItems2.totalrechazosPlanta1 += parseInt ( e.totalrechazosPlanta1 )
                        vecP1MasvecP2[i].minNoCalidad = ( parseInt ( e.totalrechazosPlanta2 ) + parseInt ( e.totalrechazosPlanta1 ) ) * 60 / parseInt ( e.piezasXhora )
                        vecP1MasvecP2[i].minPorPiezaProducidas = ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                        newItems2.minPorPiezaProducidas += ( parseInt ( e.produccion ) * 60 / parseInt ( e.piezasXhora ) )
                    }
                    else {
                        vecP1MasvecP2[i].minNoCalidad = 0
                    }
                    newItems2.minNoCalidad += ( parseInt ( e.totalrechazosPlanta2 === null ? 0 : e.totalrechazosPlanta2 ) + parseInt ( e.totalrechazosPlanta1 === null ? 0 : e.totalrechazosPlanta1 ) ) * 60 / parseInt ( e.piezasXhora )
                    newItems2.totalrechazosPlanta2 += parseInt ( e.totalrechazosPlanta2 === null ? 0 : e.totalrechazosPlanta2 )
                } )
                if ( vecP1MasvecP2.length > 0 ) {
                vecP1MasvecP2.push ( newItems2 )
                }
                setVecDatosOee ( vecP1MasvecP2 )
                setLoading ( false )
            }
        }
        getListaOee (  )
    }  , [ fechaFundicionDesde , fechaFundicionHasta , idMaquina , idPieza ,  idMolde , idAgrupar ]  )
    const vecAgrupar = [
        { idAgrupar : 1 , nombreAgrupar : 'DIA'} ,
        { idAgrupar : 2 , nombreAgrupar : 'SEMANA'} ,
        { idAgrupar : 3 , nombreAgrupar : 'MES'} ,
        { idAgrupar : 4 , nombreAgrupar : 'AÑO'} ,
    ]
    return (
        <div>
            <Typography style = { { marginTop : 15 , marginBottom : 20 } }  variant ='h3'>OEE Fundicion</Typography>
            <div>
                <MyComponent.fecha id = 'fechaDesde' label = 'Fecha Fundicion Desde' value = { fechaFundicionDesde } onChange = { e => setFechaFundicionDesde ( e ) } />
                <MyComponent.fecha id = 'fechaHasta' label = 'Fecha Fundicion Hasta' value = { fechaFundicionHasta } onChange = { e => setFechaFundicionHasta ( e ) } />
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
                            <th>Rech P1</th>
                            <th>Rech P2</th>
                            <th>PM matri</th>
                            <th>PM mante</th>
                            <th>PM produc</th>
                            <th>PM otros</th>
                            <th>Total PNP</th>
                            <th>Total PM prog</th>
                            <th>Setup</th>
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
                                <td colSpan ={ 22 }  >
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
                                <td colSpan ={ 22 }  >
                                    <img src = { NoFound } alt = 'imgNoFound' />
                                </td>
                        </tr>
                        }
                    </tbody>
                </Table>
            </div>
            <div className = 'contenedorGrafico'>
                        <GraficoOeeFun/>
            </div>
        </div>
    )
}

export default OeeFundicion