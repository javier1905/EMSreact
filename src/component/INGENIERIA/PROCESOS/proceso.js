import React, { useState, useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import FormProceso from './formAltaProceso'
import { SnackbarProvider } from 'notistack'

const Proceso = ( props ) => {
    const [idProceso , setIdProceso] = useState ( '' )
    const [descipcionProceso , setDescipcionProceso] = useState ( '' )
    // const [idPieza , setIdPieza] = useState ( '' )
    const [nombrePieza , setNombrePieza] = useState ( '' )
    // const [idMaquina , setIdMaquina] = useState ( '' )
    const [nombreMaquina , setNombreMaquina] = useState ( '' )
    // const [idTipoProceso , setIdTipoProceso] = useState ( '' )
    const [nombreTipoProceso , setNombreTipoProceso] = useState ( '' )
    const [open , setOpen] = useState ( false )

    useEffect ( (  ) => {
        setIdProceso ( props.proceso.idProceso )
        setDescipcionProceso ( props.proceso.descipcionProceso )
        // setIdPieza ( props.proceso.idPieza )
        setNombrePieza ( props.proceso.nombrePieza )
        // setIdMaquina ( props.proceso.idMaquina )
        setNombreMaquina ( props.proceso.nombreMaquina )
        // setIdTipoProceso ( props.proceso.idTipoProceso )
        setNombreTipoProceso ( props.proceso.nombreTipoProceso )
    } , [ props ] )
    const handleClose = (  ) => {  setOpen ( false ) }
    return (
        <tr>
            <td>{idProceso}</td>
            <td>{descipcionProceso}</td>
            <td>{nombrePieza}</td>
            <td>{nombreMaquina}</td>
            <td>{nombreTipoProceso}</td>
            <td>
                <>
                    <MyComponent.botonUpdate texto = 'Update proceso' onClick = { e => setOpen ( true ) }/>
                    <SnackbarProvider maxSnack = { 3 } >
                        <FormProceso proceso = { props.proceso } handleClose = { handleClose } open = { open } />
                    </SnackbarProvider>
                </>
            </td>
            <td><MyComponent.botonDelete texto = 'Delete proceso' /></td>
        </tr>
    )
}

export default Proceso