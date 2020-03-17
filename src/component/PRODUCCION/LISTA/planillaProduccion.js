import React ,{ useState } from 'react'
import Moment from 'moment'
// import { Button } from 'react-bootstrap'
import { withSnackbar } from 'notistack'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'
import CancelIcon from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip'

const PlanillaProduccion = ( props ) => {
    const [ modeDelete , setModeDelete ] = useState ( false )
    const deletePlanillaProduccion = ( idPlanilla ) => {
        console.log( idPlanilla )
        const deletePlaPro = (  ) => {
            fetch ( "https://ems-node-api.herokuapp.com/api/planillasProduccion/eliminar"  , {
                method : 'POST' ,
                body : JSON.stringify ( { idPlanilla } ) ,
                headers : new Headers ({
                    'Accept' : 'Application/json' ,
                    'Content-Type' : 'Application/json'
                })
            })
            .then ( dato => { return dato.json (  ) } )
            .then ( json => {
                props.enqueueSnackbar (`${json.mensaje}`,
                    {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                    props.actualizaListaPlanillas (  )
                    setModeDelete( false )
            } )
            .catch ( e => {
                props.enqueueSnackbar(`${e.mensaje}`,
                    {
                        variant: 'error',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
            } )
        }
        deletePlaPro (  )
    }
    const calculaProduccion = (  ) => {
        var totalRechazo = 0
        var totalScrap = 0
        var totalProduccion = 0
        props.planilla.vecOperarios.forEach( op => {
            totalProduccion += parseInt ( op.produccion )
            op.vecRechazo.forEach ( re => {
                if( re.tipo ) {
                    totalScrap += parseInt ( re.cantidadRechazo )
                }
                else {
                    totalRechazo += parseInt ( re.cantidadRechazo )
                }
            })
        })
        return { totalProduccion , totalRechazo , totalScrap }
    }
    return (
        <tr style={ { padding : 20 ,cursor : 'pointer' } } onClick = { e => { props.filtraPlanilla( props.planilla.idPlanilla ) } } >
            {
                ! modeDelete ?
                    <>
                        <td> {`${ new Moment ( props.planilla.fechaFundicion ).format( "DD/MM/YYYY") }`} </td>
                        <td> {`${ new Moment ( props.planilla.fechaProduccion ).format( "DD/MM/YYYY") }`} </td>
                        <td> { props.planilla.nombreMaquina } </td>
                        <td> { props.planilla.nombrePieza  } </td>
                        <td> { props.planilla.nombreMolde } </td>
                        <td> {calculaProduccion().totalProduccion } </td>
                        <td> {calculaProduccion().totalRechazo } </td>
                        <td> {calculaProduccion().totalScrap } </td>
                        {/* <td><Button onClick={ e => setModeDelete( true ) }>Editar</Button></td> */}
                        {/* <td><Button onClick={ e => setModeDelete( true ) }>Eliminar</Button></td> */}
                        <td>
                        <Tooltip title="Update">
                            <IconButton onClick={ e => setModeDelete( true ) } aria-label="update" >
                                <UpdateIcon />
                            </IconButton>
                        </Tooltip>
                        </td>
                        <td>
                        <Tooltip title="Delete">
                            <IconButton onClick={ e => setModeDelete( true ) } aria-label="delete" >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        </td>
                    </>
                    :
                    <td colSpan = { 10 }>
                        ¿ Esta seguro de eliminar esta planilla ?
                        {/* <Button variant = 'primary' onClick={ e => deletePlanillaProduccion( props.planilla.idPlanilla ) } >eliminar</Button> */}
                        <Tooltip title="Delete">
                            <IconButton onClick={ e => deletePlanillaProduccion( props.planilla.idPlanilla ) } aria-label="delete" >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        {/* <Button variant = 'secondary' onClick={ e=> setModeDelete ( false ) } > cancelar </Button> */}
                        <Tooltip title="Cancel">
                            <IconButton onClick={ e=> setModeDelete ( false ) } aria-label="cancel" >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </td>
            }
        </tr>
    )
}
export default  withSnackbar ( PlanillaProduccion )