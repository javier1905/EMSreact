import React , { useEffect , useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PlanillaProduccion from './planillaProduccion'
import Moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Table } from 'react-bootstrap'
import ModalAltaPlanilla from './modalALTAPLANILLA'
import AddlIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
    const [ vecOperaciones , setVecOperaciones ] = useState ( [  ] )
    const [ vecMaquinas , setVecMaquinas ] = useState ( [  ] )
    const [ vecPiezas , setVecPiezas ] = useState ( [  ] )
    const [ vecMoldes , setVecMoldes ] = useState ( [  ] )
    const [ vecTiposProceso , setVecTiposProceso ] = useState ( [  ] )
    const [ fechaDesdeProduccion , setFechaDesdeProduccion] = useState ( new Moment (  ).add ( -1 , 'month' ) )
    const [ fechaHastaProduccion , setFechaHastaProduccion] = useState ( new Date(  ) )
    const [ fechaDesdeFundicion , setFechaDesdeFundicion] = useState ( new Moment (  ).add ( -1 , 'month' ) )
    const [ fechaHastaFundicon , setFechaHastaFundicon] = useState ( new Date(  ) )
    const [ planillaSeleccionada , setPlanillaSeleccionada] = useState ( null )
    const [ show , setShow] = useState ( false )
    const [ idMaquina , setIdMaquina] = useState ( '' )
    const [ idPieza , setIdPieza] = useState ( '' )
    const [ idMolde , setIdMolde] = useState ( '' )
    const [ idTipoProceso , setIdTipoProceso] = useState ( '' )
    const [ idOperacion , setIdOperacion] = useState ( '' )
    useEffect ( (  ) => {
        const  getPlanillasProduccion = ( ) => {
            
            const filtros = { fechaDesdeProduccion: new Moment(fechaDesdeProduccion).format("DD/MM/YYYY") ,
            fechaHastaProduccion: new Moment(fechaHastaProduccion).format("DD/MM/YYYY") ,
                fechaDesdeFundicion: new Moment(fechaDesdeFundicion).format("DD/MM/YYYY") ,
                fechaHastaFundicon: new Moment(fechaHastaFundicon).format("DD/MM/YYYY") ,
                idMaquina: idMaquina === '' ? null : idMaquina , idPieza: idPieza === '' ? null : idPieza ,
                idMolde: idMolde === '' ? null : idMolde , idTipoProceso : idTipoProceso === '' ?null : idTipoProceso  ,
                idOperacion : idOperacion === '' ? null : idOperacion
            }
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
        , [ fechaDesdeProduccion ,  fechaHastaProduccion , fechaDesdeFundicion , fechaHastaFundicon , idMaquina , idPieza , idMolde , idTipoProceso ,  idOperacion]
    )

    const filtraPlanilla = id => {
        setPlanillaSeleccionada( vecPlanillasProduccion.find ( pla =>  parseInt ( pla.idPlanilla ) === parseInt ( id ) ) )
        console.log ( planillaSeleccionada )
    }
    const  actualizaListaPlanillas = ( ) => {
        const filtros = { fechaDesdeProduccion: new Moment(fechaDesdeProduccion).format("DD/MM/YYYY") ,
        fechaHastaProduccion: new Moment(fechaHastaProduccion).format("DD/MM/YYYY") ,
            fechaDesdeFundicion: new Moment(fechaDesdeFundicion).format("DD/MM/YYYY") ,
            fechaHastaFundicon: new Moment(fechaHastaFundicon).format("DD/MM/YYYY") ,
            idMaquina: idMaquina === '' ? null : idMaquina , idPieza: idPieza === '' ? null : idPieza ,
            idMolde: idMolde === '' ? null : idMolde , idTipoProceso : idTipoProceso === '' ?null : idTipoProceso  ,
            idOperacion : idOperacion === '' ? null : idOperacion
        }
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
    const handleClose = (  ) => {
        actualizaListaPlanillas (  )
        setShow ( false )
    }
    useEffect ( (  ) => {
        const getOperaciones = (  ) => {
            fetch('https://ems-node-api.herokuapp.com/api/operaciones', { signal : controller.signal } , {
                method:'GET',
                headers: new Headers({
                    'Accept': 'Applitaction/json',
                    'Content-Type': 'Application/json'
                })
            })
            .then ( dato => { return dato.json (  ) } )
            .then ( json => {
                setVecOperaciones ( json )
            } )
            .catch ( e => {  } )
        }
        getOperaciones (  )
    } , [  ] )
    useEffect ( (  ) => {
        const getMaquinasXoperacion =   (  ) => {
            fetch(`https://ems-node-api.herokuapp.com/api/maquinas/xoperacion/${idOperacion}`, { signal : controller.signal } , {
                method:'GET',
                headers: new Headers ( {
                    'Accept': 'Applitaction/json',
                    'Content-Type': 'Application/json'
                } )
            } )
            .then ( dato => { return dato.json ( ) } )
            .then ( json => {
                setIdPieza ( '' )
                setVecPiezas ( [  ] )
                setIdMolde ( '' )
                setVecMoldes ( '' )
                setIdMaquina ( '' )
                setVecMaquinas ( json )
            })
            .catch ( e => { console.log( e.message ) } )
        }
        getMaquinasXoperacion (  )
    }
    , [ idOperacion ]
    )
    useEffect ( (  ) => {
        const getPiezasXmaquina = (  ) => {
            fetch(`https://ems-node-api.herokuapp.com/api/piezas/xmaquina/${idMaquina}` , { signal : controller.signal } , {
                method:'GET',
                headers: new Headers ( {
                    'Accept': 'Applitaction/json',
                    'Content-Type': 'Application/json'
                } )
            } )
            .then ( dato => { return dato.json (  ) } )
            .then ( json => {
                setIdPieza ( '' )
                setVecMoldes ( [  ] )
                setVecPiezas ( json)
            } )
            .catch ( e => {  } )
        }
        getPiezasXmaquina (  )
    },
    [ idMaquina ]
    )
    useEffect ( (  ) => {
        const getMoldesXpieza = (  ) => {
            fetch(`https://ems-node-api.herokuapp.com/api/moldes/xpieza/${idPieza}` , { signal : controller.signal } , {
                method:'GET',
                headers: new Headers({
                    'Accept': 'Applitaction/json',
                    'Content-Type': 'Application/json'
                })
            })
            .then ( dato => { return dato.json(  ) } )
            .then ( json => { setVecMoldes ( json )  } )
            .catch ( e => {  } )
        }
        getMoldesXpieza (  )
    } ,
    [ idPieza ]
    )

    useEffect ( (  ) => {
        const getTipoProcesoXpiezaMaquina = ( idPieza , idMaquina ) => {
            const dato = {
                idPieza,
                idMaquina
            }
            fetch ( `https://ems-node-api.herokuapp.com/api/tiposProceso`, { signal : controller.signal } , {
                method : 'POST',
                body : JSON.stringify ( dato ) ,
                headers : {
                    'Accept' : 'Application/json' ,
                    'Content-Type' : 'Application/json'
                }
            })
            .then(dato => { return dato.json (  ) } )
            .then( json => { setVecTiposProceso ( json ) } )
            .catch( e =>{ } )
        }
        getTipoProcesoXpiezaMaquina (  )
    },
     [ idPieza ]
    )
    // useEffect( (  ) => {
    //     return (  ) => controller.abort(  )
    // })
    return (
        <div>
            <ModalAltaPlanilla show = { show } handleClose = { handleClose }/>
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
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="demo-simple-select-label">Operacion</InputLabel>
                        <Select
                            // ref={this.cbx_operacion}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ idOperacion }
                            name='idOperacion'
                            onChange = { e => { setIdOperacion ( e.target.value ) } }
                        >
                        {
                            Array.isArray( vecOperaciones )?
                                vecOperaciones.map((ope,indiceOperacion)=>{
                                return <MenuItem  key={indiceOperacion} value={ope.idOperacion}>{ope.nombreOperacion}</MenuItem>
                                })
                                :
                                <MenuItem></MenuItem>
                        }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idMaquina">Maquina</InputLabel>
                        <Select
                            // ref={this.cbx_maquina}
                            labelId = "IdMaquina"
                            id = "demo-simple-select"
                            value = { idMaquina  }
                            name = 'idMaquina'
                            onChange={ e => { setIdMaquina ( e.target.value ) }  }
                        >
                        {
                            Array.isArray( vecMaquinas )?
                                vecMaquinas.map((maq,indiceMaquina)=>{
                                    return <MenuItem key={indiceMaquina} value={maq.idMaquina}>{maq.nombreMaquina}</MenuItem>
                                })
                                :
                                <MenuItem></MenuItem>
                        }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idPieza">Pieza</InputLabel>
                        <Select
                            // ref={this.cbx_pieza}
                            labelId="idPieza"
                            id="demo-simple-select"
                            value={ idPieza  }
                            name='idPieza'
                            onChange={ e => { setIdPieza ( e.target.value ) } }
                        >
                        {
                            Array.isArray(  vecPiezas )?
                            vecPiezas.map ( ( pie , indicePieza ) => {
                                return <MenuItem key={indicePieza} value={pie.idPieza}>{pie.nombrePieza}</MenuItem>
                            })
                            :
                            <MenuItem></MenuItem>
                        }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idMolde">Molde</InputLabel>
                        <Select
                            // ref={this.cbx_molde}
                            labelId="idMolde"
                            id="cbx_molde"
                            value={ idMolde }
                            name='idMolde'
                            onChange = { e => { setIdMolde ( e.target.value ) } }
                        >
                            {
                                Array.isArray (  vecMoldes ) ?
                                vecMoldes.map ( ( mol , indiceMolde ) => {
                                    return <MenuItem key={indiceMolde} value={mol.idMolde}>{mol.nombreMolde}</MenuItem>
                                })
                                :
                                <MenuItem></MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                        <InputLabel id="idTipoProceso">Tipo Proceso</InputLabel>
                        <Select
                            // ref={this.cbx_tipoProceso}
                            labelId = "idTipoProceso"
                            id = "cbx_molde"
                            value = { idTipoProceso }
                            name = 'idTipoProceso'
                            onChange = { e => { setIdTipoProceso ( e.target.value ) } }
                        >
                            {
                                Array.isArray ( vecTiposProceso )?
                                    vecTiposProceso.map ( ( tpro , indiceTipoProceso ) => {
                                        return <MenuItem key = { indiceTipoProceso } value = { tpro.idTipoProceso } >{ tpro.nombreTipoProceso }</MenuItem>
                                    })
                                    :
                                    <MenuItem></MenuItem>
                            }
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Tooltip title="Add">
                        <IconButton onClick={ e => setShow ( true ) } aria-label="delete" >
                            <AddlIcon />
                        </IconButton>
                    </Tooltip>
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