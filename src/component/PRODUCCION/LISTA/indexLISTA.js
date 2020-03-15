import React , { useEffect , useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PlanillaProduccion from './planillaProduccion'
import Moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'


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
    const [ fechaDesdeProduccion , setFechaDesdeProduccion] = useState ( null )
    const [ fechaHastaProduccion , setFechaHastaProduccion] = useState ( null )
    const [ fechaDesdeFundicion , setFechaDesdeFundicion] = useState ( null )
    const [ fechaHastaFundicon , setFechaHastaFundicon] = useState ( null )
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
    return (
        <div>
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
                    <div style = {{height:500,overflow:'scroll',overflowX: 'hidden' , width : '60%' , float : "left"}} >
                        <table border={1}>
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
                                        return < PlanillaProduccion  filtraPlanilla = { filtraPlanilla }  planilla = { planilla }  key = { indexPlanilla } />
                                    } )
                                    :
                                    <tr><td colSpan = { 10 } style={{textAlign:'center' , padding : 10 }}>Sin Registros</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style = { { width : '40%' , float : "right" , background : 'blue'}}>
                        {
                            planillaSeleccionada ?
                                <div>
                                        <div>
                                            <table>
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
                                                </table>
                                        </div>
                                        <div>
                                            <table>
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
                                            </table>
                                        </div>
                                        {
                                            planillaSeleccionada.vecOperarios.map ( ( o , i ) => {
                                                return (
                                                    <div key = { i }>
                                                        <div>
                                                            <h6>{ ` ${ o.apellidoTrabajador } ${ o.nombreTrabajador }` }</h6>
                                                        </div>
                                                        <div>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>TURNO</th>
                                                                        <th>HS INICIO</th>
                                                                        <th>HS FIN</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ o.turnoTrabajador }</td>
                                                                        <td>{ o.horaInicio }</td>
                                                                        <td>{ o.horaFin }</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        {
                                                            o.vecRechazo.map ( ( r , indexRechazo ) => {
                                                                return (
                                                                    <div key = { indexRechazo }>
                                                                                                                                    <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>TURNO</th>
                                                                        <th>HS INICIO</th>
                                                                        <th>HS FIN</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ o.turnoTrabajador }</td>
                                                                        <td>{ o.horaInicio }</td>
                                                                        <td>{ o.horaFin }</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            } )
                                        }
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