import React , { useEffect , useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PlanillaProduccion from './planillaProduccion'
import Moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Table } from 'react-bootstrap'
import ModalAltaPlanilla from './modalALTAPLANILLA'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginTop:'none',
        paddingTop:'none'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    }
}))
const controller = new AbortController()

const ListaPlanilasProduccion = ( props ) => {
    var classes = useStyles()
    const [ vecPlanillasProduccion , setVecPlanillasProduccion ] = useState ( [  ] )
    const [ fechaDesdeProduccion , setFechaDesdeProduccion] = useState ( new Moment (  ).add ( -1 , 'month' ) )
    const [ fechaHastaProduccion , setFechaHastaProduccion] = useState ( new Date(  ) )
    const [ fechaDesdeFundicion , setFechaDesdeFundicion] = useState ( new Moment (  ).add ( -1 , 'month' ) )
    const [ fechaHastaFundicon , setFechaHastaFundicon] = useState ( new Date(  ) )
    const [ planillaSeleccionada , setPlanillaSeleccionada] = useState ( null )
    // const [ idMaquina , setIdMaquina] = useState ( '' )
    // const [ idPieza , setIdPieza] = useState ( '' )
    // const [ idMolde , setIdMolde] = useState ( '' )
    // const [ idTipoProceso , setIdTipoProceso] = useState ( '' )
    // const [ idTipoMaquina , setIdTipoMaquina] = useState ( '' )
    useEffect ( (  ) => {
        const  getPlanillasProduccion = ( ) => {
            const filtros = { fechaDesdeProduccion: new Moment(fechaDesdeProduccion).format("DD/MM/YYYY") ,
            fechaHastaProduccion: new Moment(fechaHastaProduccion).format("DD/MM/YYYY") ,
                fechaDesdeFundicion: new Moment(fechaDesdeFundicion).format("DD/MM/YYYY") ,
                fechaHastaFundicon: new Moment(fechaHastaFundicon).format("DD/MM/YYYY") , idMaquina :null , idPieza:null , idMolde:null , idTipoProceso:null , idTipoMaquina:null  
            }
                // const filtros = { fechaDesdeProduccion , fechaHastaProduccion ,
                //     fechaDesdeFundicion , fechaHastaFundicon , idMaquina , idPieza , idMolde , idTipoProceso , idTipoMaquina  }
                fetch ("https://ems-node-api.herokuapp.com/api/planillasProduccion/listado" ,  {
                method : 'POST' ,
                body : JSON.stringify( filtros ) ,
                headers : new Headers ( {
                    "Accept" : "Application/json" ,
                    "Content-Type" : "Application/json"
                })
            })
            .then ( dato => { return dato.json(  ) } )
            .then ( json => { setVecPlanillasProduccion ( json ) } )
        }
        getPlanillasProduccion( )  }
        , [ fechaDesdeProduccion ,  fechaHastaProduccion , fechaDesdeFundicion , fechaHastaFundicon ]
    )
    useEffect( (  ) => {
        return (  ) => controller.abort(  )
    })
    const filtraPlanilla = id => {
        setPlanillaSeleccionada( vecPlanillasProduccion.find ( pla =>  parseInt ( pla.idPlanilla ) === parseInt ( id ) ) )
        console.log ( planillaSeleccionada )
    }
    const  actualizaListaPlanillas = ( ) => {
        const filtros = { fechaDesdeProduccion: new Moment(fechaDesdeProduccion).format("DD/MM/YYYY") ,
        fechaHastaProduccion: new Moment(fechaHastaProduccion).format("DD/MM/YYYY") ,
            fechaDesdeFundicion: new Moment(fechaDesdeFundicion).format("DD/MM/YYYY") ,
            fechaHastaFundicon: new Moment(fechaHastaFundicon).format("DD/MM/YYYY") , idMaquina :null , idPieza:null , idMolde:null , idTipoProceso:null , idTipoMaquina:null  
        }
            // const filtros = { fechaDesdeProduccion , fechaHastaProduccion ,
            //     fechaDesdeFundicion , fechaHastaFundicon , idMaquina , idPieza , idMolde , idTipoProceso , idTipoMaquina  }
            fetch ("https://ems-node-api.herokuapp.com/api/planillasProduccion/listado" ,  {
            method : 'POST' ,
            body : JSON.stringify( filtros ) ,
            headers : new Headers ( {
                "Accept" : "Application/json" ,
                "Content-Type" : "Application/json"
            })
        })
        .then ( dato => { return dato.json(  ) } )
        .then ( json => { setVecPlanillasProduccion ( json ) } )
        filtraPlanilla (  )
    }
    return (
        <div>
            <ModalAltaPlanilla/>
            <Paper className={classes.root}>
                <div style={{background:'white',padding:20}}>
                    <h2>Listado Planilla Produccion</h2>
                    <h6 style={{marginTop:15}}>Filtros</h6>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl} >
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'220px'}}
                                                size='small'
                                                variant='standard'
                                                margin="none"
                                                id="fechaDesdeProduccion"
                                                label="fechaDesdeProduccion"
                                                format="dd/MM/yyyy"
                                                value={ fechaDesdeProduccion }
                                                onChange={ e => { setFechaDesdeProduccion( e ) } }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'220px'}}
                                                size='small'
                                                variant='standard'
                                                margin="none"
                                                id="fechaHastaProduccion"
                                                label="fechaHastaProduccion"
                                                format="dd/MM/yyyy"
                                                value={ fechaHastaProduccion }
                                                onChange={ e => { setFechaHastaProduccion( e ) } }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'220px'}}
                                                size='small'
                                                variant='standard'
                                                margin="none"
                                                id="fechaDesdeFundicion"
                                                label="fechaDesdeFundicion"
                                                format="dd/MM/yyyy"
                                                value={ fechaDesdeFundicion }
                                                onChange={ e => { setFechaDesdeFundicion( e ) } }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'220px'}}
                                                size='small'
                                                variant='standard'
                                                margin="none"
                                                id="fechaHastaFundicon"
                                                label="fechaHastaFundicon"
                                                format="dd/MM/yyyy"
                                                value={ fechaHastaFundicon }
                                                onChange={ e => { setFechaHastaFundicon( e ) } }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <div style = {{height:500,overflow:'scroll',overflowX: 'hidden' , width : '60%' , float : "left" , boxSizing : 'border-box' , padding : 10}} >
                        <Table responsive  hover>
                            <thead>
                                <tr>
                                    <th style = { { padding : 10 }}>FECHA FUNDICION</th>
                                    <th>FECHA PRODUCCION</th>
                                    <th>MAQUINA</th>
                                    <th>PIEZA</th>
                                    <th>MOLDE</th>
                                    <th>PRODUCCION</th>
                                    <th>RECHAZOS</th>
                                    <th>SCRAP</th>
                                    <th>EDITAR</th>
                                    <th>ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray ( vecPlanillasProduccion ) && vecPlanillasProduccion.length !== 0 ?
                                    vecPlanillasProduccion.map ( ( planilla , indexPlanilla ) => {
                                        return < PlanillaProduccion actualizaListaPlanillas = { actualizaListaPlanillas }  filtraPlanilla = { filtraPlanilla }  planilla = { planilla }  key = { indexPlanilla } />
                                    } )
                                    :
                                    <tr><td colSpan = { 10 } style={{textAlign:'center' , padding : 10 }}>Sin Registros</td></tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div style = { { width : '40%' , float : "right" , background : 'white' , boxSizing : 'border-box' , padding : 10}}>
                        {
                            planillaSeleccionada ?
                                <div>
                                        <div>
                                            <Table responsive size = 'sm'>
                                                    <thead>
                                                        <tr>
                                                            <th>FECHA FUNDICION</th>
                                                            <th>FECHA PRODUCCION </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{ new Moment ( planillaSeleccionada.fechaFundicion ).format ( "DD/MM/YYYY" ) }</td>
                                                            <td>{ new Moment ( planillaSeleccionada.fechaProduccion ).format ( "DD/MM/YYYY" ) }</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                        </div>
                                        <div>
                                            <Table responsive size = 'sm' >
                                                <thead>
                                                    <tr>
                                                        <th>MAQUINA</th>
                                                        <th>PIEZA</th>
                                                        <th>MOLDE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{ planillaSeleccionada.nombreMaquina }</td>
                                                        <td>{ planillaSeleccionada.nombrePieza }</td>
                                                        <td>{ planillaSeleccionada.nombreMolde }</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <h6>Operarios</h6>
                                        {
                                            planillaSeleccionada.vecOperarios.map ( ( o , i ) => {
                                                return (
                                                    <div key = { i } style = { { borderTop : 'grey solid 2px' , paddingTop : '10px' } }>
                                                        <div>
                                                            <h6>{ ` ${ o.apellidoTrabajador } ${ o.nombreTrabajador }` }</h6>
                                                        </div>
                                                        <div>
                                                            <Table responsive size = 'sm'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>TURNO</th>
                                                                        <th>HS INICIO</th>
                                                                        <th>HS FIN</th>
                                                                        <th>PRODUCCION</th>
                                                                        <th>CALORIAS</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ o.turnoTrabajador }</td>
                                                                        <td>{ o.horaInicio }</td>
                                                                        <td>{ o.horaFin }</td>
                                                                        <td>{ o.produccion }</td>
                                                                        <td>{ o.calorias }</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                        <div>
                                                                    {
                                                                        o.vecRechazo.length > 0 &&
                                                                        <div style = { { borderTop : 'grey solid 1px' , paddingTop : 10} }>
                                                                            <h6>Rechazos</h6>
                                                                            {
                                                                                o.vecRechazo.map ( ( r , indexRechazo ) => {
                                                                                    return (
                                                                                        <div key = { indexRechazo } >
                                                                                            <Table responsive size = 'sm' >
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>CAUSA</th>
                                                                                                        <th>TIPO</th>
                                                                                                        <th>CANTIDAD</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                <tr>
                                                                                                    <td>{ r.nombreRechazo }</td>
                                                                                                    <td style = { { color : r.tipo ? 'red' : 'green' } } >{ r.tipo ? 'SCRAP' : 'RECHAZO' }</td>
                                                                                                    <td>{ r.cantidadRechazo }</td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </Table>
                                                                                        <Table responsive size = 'sm' key = { indexRechazo } >
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>ZONA</th>
                                                                                                    <th>CANTIDAD</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {
                                                                                                    r.vecZonas.map ( ( z , indexZona ) => {
                                                                                                        return (
                                                                                                            <tr key = { indexZona }>
                                                                                                                <td>{ `${ z.letra }${ z.numero }` }</td>
                                                                                                                <td>{ z.cantidad }</td>
                                                                                                            </tr>
                                                                                                        )
                                                                                                    } )
                                                                                                }
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    }
                                                        </div>
                                                    </div>
                                                )
                                            } )
                                        }
                                        <div style = { { borderTop : 'grey solid 3px' , paddingTop : '10px' } }>
                                            {
                                                planillaSeleccionada.vecParadasMaquinaSeleccionada.length > 0 &&
                                                <div>
                                                    <h6>Paradas de  maquina</h6>
                                                    <Table responsive size = 'sm' >
                                                        <thead>
                                                            <tr>
                                                                <th>MOTIVO</th>
                                                                <th>DESDE</th>
                                                                <th>HASTA</th>
                                                                <th>TIPO</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                planillaSeleccionada.vecParadasMaquinaSeleccionada.map ( ( pm , indexPm ) => {
                                                                    return(
                                                                                <tr key = { indexPm }>
                                                                                    <td>{ pm.nombreParadaMaquina }</td>
                                                                                    <td>{ pm.desdeParadaMaquina }</td>
                                                                                    <td>{ pm.hastaParadaMaquina }</td>
                                                                                    <td style = { { color : pm.tipoParadaMaquina ? 'red' : 'green'  } }>{ pm.tipoParadaMaquina ? 'NO PROG' : 'PROG' }</td>
                                                                                </tr>
                                                                    )
                                                                } )
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }
                                        </div>
                                </div>
                                :
                                <div>No found</div>
                        }
                    </div>
                    <div style = {{clear : 'both'}}></div>
                </div>
                <div style={{background:'red',padding:20}}>footer</div>
            </Paper>
        </div>
    )
}
export default ListaPlanilasProduccion