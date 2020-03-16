import React ,{ useState } from 'react'
import Moment from 'moment'
import { Button } from 'react-bootstrap'
const PlanillaProduccion = ( props ) => {
    const [ modeDelete , setModeDelete ] = useState ( false )
    const deletePlanillaProduccion = ( idPlanilla ) => {
        console.log( idPlanilla )
        setModeDelete( false )
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
                        <td><Button onClick={ e => setModeDelete( true ) }>Editar</Button></td>
                        <td><Button onClick={ e => setModeDelete( true ) }>Eliminar</Button></td>
                    </>
                    :
                    <td colSpan = { 10 }>
                        <div>¿Esta seguro de eliminar esta planilla ?</div>
                        <Button variant = 'primary' onClick={ e => deletePlanillaProduccion( props.planilla.idPlanilla ) } >eliminar</Button>
                        <Button variant = 'secondary' onClick={ e=> setModeDelete ( false ) } > cancelar </Button>
                    </td>
            }
        </tr>
    )
}
export default PlanillaProduccion