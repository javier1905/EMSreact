import React  from 'react'
import Moment from 'moment'
import './styleOeeFun.css'

const Items = ( props ) => {
    var styletr = {}
    var claseTr = ''
    var Dfooter = ''
    var Rfooter = ''
    var Qfooter = ''
    var OEEfooter = ''
    if ( props.ultimo ){
        claseTr = 'footer'
        Dfooter = 'Dfooter'
        Rfooter = 'Rfooter'
        Qfooter = 'Qfooter'
        OEEfooter = 'OEEfooter'

        styletr = { background : '#4141B3' , color : 'white' , boxShadow : '1px 1px  1px grey ' }
    }
    const calculoDisponibilidad= (  ) => {
        if ( props.items) {
            if ( isNaN ( ( ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP ) / (props.items.minTotal - props.items.pmProgramada)  * 100 ).toFixed ( 2 ) )  ) {
                return 0
            }
            else {
                return ( ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP ) / (props.items.minTotal - props.items.pmProgramada)  * 100 ).toFixed ( 2 )
            }
        }
    }
    const calculoRendimiento = (  ) => {
        if ( isNaN ( (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP )* 100  ).toFixed(2) ) ) {
            return 0
        }
        else {
            return (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP )* 100  ).toFixed(2)
        }
    }
    const calculoCalidad = (  ) => {
        if ( isNaN ( ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ))*100).toFixed(2) ) ) {
            return 0
        }
        else if (  ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ))*100) === - Infinity  ) {
            return 0
        }
        else
        {
            return ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ))*100).toFixed(2)
        }
    }
    const calculoOEE = (  ) => {
        var dato =  ( ( ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) / (props.items.minTotal - props.items.pmProgramada)) *
        (props.items.minPorPiezaProducidas / ( props.items.minTotal - props.items.pmProgramada - props.items.totalPNP ) ) *
        ( (1 - ( props.items.minNoCalidad / (props.items.minTotal - props.items.pmProgramada - props.items.totalPNP) ) ) ) * 100 ).toFixed ( 2 )
        if ( isNaN ( dato ) ) {
            return 0
        }
        else {
            return dato
        }
    }
    return (
        <tr className = { claseTr } style = { styletr } >
            <td>{ props.ultimo ? 'Total' : props.idAgrupar === 1 ? new Moment ( props.items.fechaFundicion).add(1 , 'd').format ( 'DD/MM/YYYY' ) : props.items.fechaFundicion}</td>
            <td>{props.items.nombreMaquina}</td>
            <td>{props.items.nombrePieza}</td>
            <td>{props.items.nombreMolde}</td>
            <td>{props.items.piezasXhora}</td>
            <td>{props.items.produccion}</td>
            <td>{props.items.totalrechazosPlanta1}</td>
            <td>{props.items.totalrechazosPlanta2}</td>
            <td>{props.items.pmMatrizeria}</td>
            <td>{props.items.pmMantenimiento}</td>
            <td>{props.items.pmProduccion}</td>
            <td>{props.items.totalPNP}</td>
            <td>{props.items.pmProgramada}</td>
            <td>{props.items.idPlanta === 2 ? '' : props.items.minTotal - props.items.pmProgramada - props.items.totalPNP}  </td>
            <td>{props.items.idPlanta === 2 ? '' : props.items.minTotal - props.items.pmProgramada}</td>
            <td>{props.items.minTotal}</td>
            <td className = { Dfooter }>{props.items.idPlanta === 2 ? '' : `${calculoDisponibilidad (  )}%` }</td>
            <td className = { Rfooter }>{props.items.idPlanta === 2 ? '' : `${ calculoRendimiento (  ) }%`}</td>
            <td className = { Qfooter } >{props.items.idPlanta === 2 ? '' : `${calculoCalidad (  )}%`}</td>
            <td className = { OEEfooter }>{props.items.idPlanta === 2 ? '' : `${ calculoOEE (  ) }%` }</td>
        </tr>
    )
}
export default Items