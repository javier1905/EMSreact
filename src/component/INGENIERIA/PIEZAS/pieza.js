import React, { useState, useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import FormAltaPieza from './formAltaPieza'
import { SnackbarProvider } from 'notistack'

const Pieza = ( props ) => {
    const [modo , setModo ] = useState ( 'editar' )
    const [idPieza] = useState ( props.pieza.idPieza )
    const [nombrePieza , setNombrePieza ] = useState ( '' )
    const [idCliente , setIdCliente ] = useState ( '' )
    const [nombreCliente , setNombreCliente ] = useState ( '' )
    const [idTipoMaterial , setIdTipoMaterial ] = useState ( '' )
    const [nombreTipoMaterial , setNombreTipoMaterial ] = useState ( '' )

    useEffect ( (  ) => {
        setNombrePieza ( props.pieza.nombrePieza )
        setNombreCliente ( props.pieza.nombreCliente )
        setNombreTipoMaterial ( props.pieza.nombreTipoMaterial )
    },[ props ] )

    return (
        modo === 'normal' ?
        <tr >
            <td>{ idPieza }</td>
            <td>{ nombrePieza }</td>
            <td>{ nombreCliente }</td>
            <td>{ nombreTipoMaterial }</td>
            <td><MyComponent.botonUpdate  /></td>
            <td><MyComponent.botonDelete  /></td>
        </tr>
        :
            modo === 'editar' ?
            <tr >
                <td colSpan = { 6 }> 
                <SnackbarProvider maxSnack = { 3 } >
                    <FormAltaPieza pieza = { props.pieza }/>
                </SnackbarProvider>
                </td>
            </tr>
            :
            <tr >
                <td colSpan = { 6 }>eliminar</td>
            </tr>
    )
}
export default Pieza