import React , { useState , useEffect  } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Servicios from './serviceClientes'
import { Alert } from 'react-bootstrap'
import $ from 'jquery'

const Cliente = ( props ) => {
    const [modo , setModo ] = useState ('normal')
    const [id,setId] = useState ( props.cliente.idCliente )
    const [nombre , setNombre ] = useState ( props.cliente.nombreCliente )
    const [razonSocial , setRazonSocial ] = useState ( props.cliente.razonSocialCliente )
    const updateCliente = ( info , e  ) => {
        const updateCli = async (  ) => {
            const mensaje = await Servicios.updateCliente ( parseInt ( id ) , nombre , razonSocial )
            if ( mensaje ) {
                setModo ( 'normal' )
                props.actualizaLista (  )
            }
        }
        if ( nombre !== '' && razonSocial !== '' ) { updateCli (  ) }
        else {
            const alert = $('#myAlert')
            setTimeout ( (  ) => { alert.slideToggle (  ) } , 3000 )
            alert.html ( `Complete los dos campos ${nombre === '' ? 'Nombre' : ''} ${razonSocial === '' ? 'razonSocial' : ''}` )
            alert.slideToggle (  )
        }
    }
    const deleteCliente = ( info ,e ) => {
        const deleteCli = async (  ) => {
            const mensaje = await Servicios.deleteCliente ( parseInt ( id ) )
            if ( mensaje ) {
                setModo ( 'normal' )
            props.actualizaLista (  )
            }
        }
        deleteCli (  )
    }
    useEffect ( (  ) => {
        setId ( props.cliente.idCliente )
        setNombre ( props.cliente.nombreCliente )
        setRazonSocial ( props.cliente.razonSocialCliente)
    }  , [ props ] )
    return(
        <>
        {
            modo === 'normal' ?
            <tr>
                <td>{ id }</td>
                <td>{ nombre }</td>
                <td>{ razonSocial }</td>
                <td><MyComponent.botonUpdate onClick = { ( info , e ) => { setModo ( 'update' ) } }   texto = 'Update Cliente'   /></td>
                <td><MyComponent.botonDelete onClick = { ( info ,e ) => { setModo ( 'delete' ) } } texto = 'Delete Cliente' /></td>
            </tr>
            :
            <tr>
                {
                    modo === 'update' ?
                    <td colSpan = { 5 }>
                        <>
                        <MyComponent.numero value = { parseInt ( id ) } label = 'Id' />
                        <MyComponent.texto value = {  nombre  } label = 'Nombre'  onChange = { e => { setNombre ( e.target.value ) } } />
                        <MyComponent.texto value = {  razonSocial  } label = 'Razon Social' onChange = { e => { setRazonSocial ( e.target.value ) } } />
                        <MyComponent.botonAcept onClick = { updateCliente } texto = 'Acept' />
                        <MyComponent.botonCancel onClick = { ( info , e ) => { setModo ( 'normal' ) ; setNombre ( props.cliente.nombreCliente ) ; setRazonSocial ( props.cliente.razonSocialCliente ) } } texto = 'Cancel' />
                        <Alert id = 'myAlert' style = { { display : 'none' , marginTop : 10 } } variant = 'danger' ></Alert>
                        </>
                    </td>
                    :
                    <td colSpan = { 5 }>
                        <>
                        {`¿ Esta seguro de queres eliminar a ${nombre} ?`}
                        <MyComponent.botonDelete onClick = {  deleteCliente } texto = 'Delete Cliente' />
                        <MyComponent.botonCancel onClick = { ( info , e ) => { setModo ( 'normal' ) } } texto = 'Cancel' />
                        </>
                    </td>
                }
            </tr>
        }
        </>
    )
}
export default Cliente