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
import GraficoOeeGra from './graficoOeeGra'

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
            idPieza === '' ? null : idPieza ,  idMolde === '' ? null : idMolde , fechaProduccionDesde , fechaProduccionHasta , idAgrupar  )
            if(listaOee) {
                if (listaOee.vecOeeGranallado && Array.isArray(listaOee.vecOeeGranallado) ) {
                    setVecDatosOee(listaOee.vecOeeGranallado)
                    setLoading(false)
                }
            }
        }
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
            <div>
                <GraficoOeeGra/>
            </div>
        </div>
    )
}

export default OeeGranallado