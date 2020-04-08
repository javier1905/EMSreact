import React , { useState , useEffect } from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import { withSnackbar } from 'notistack'
import $ from 'jquery'
import { Alert } from 'react-bootstrap'
import Servicios from '../servicesIngenieria'

const ParadaMaquina = ( props ) => {
    const [idParadaMaquina , setIdParadaMaquina] = useState ( '' )
    const [nombreParadaMaquina , setNombreParadaMaquina] = useState ( '' )
    const [idArea , setIdArea] = useState ( '' )
    const [nombreArea , setNombreArea] = useState ( '' )
    const [tipoParadaMaquina , setTipoParadaMaquina] = useState ( false )
    const [vecAreas , setVecAreas] = useState ( [  ] )

    useEffect ( (  ) => {
        if ( props.paradaMaquina ) {
            setIdParadaMaquina ( props.paradaMaquina.idParadaMaquina )
            setNombreParadaMaquina ( props.paradaMaquina.nombreParadaMaquina )
            setIdArea ( props.paradaMaquina.idArea )
            setNombreArea ( props.paradaMaquina.nombreArea )
            setTipoParadaMaquina ( props.paradaMaquina.tipoParadaMaquina )
            setVecAreas ( props.vecAreas )
        }
    } , [ props ] )
    const updateParadaMaquina= (  ) => {
        if ( nombreParadaMaquina === '' ) {
            var myAlert = $( '#myAlert' )
            myAlert.html ( 'Complete el campo nombre' )
            setTimeout ( (  ) => {
                myAlert.slideUp (  )
            } , 3000 )
            myAlert.slideDown (  )
        }
        else {
            const updatePM = async (  ) => {
                const result = await Servicios.updateParadaMaquina ( parseInt ( idParadaMaquina ) , nombreParadaMaquina , tipoParadaMaquina , parseInt ( idArea ) )
                if ( result ) {
                    if ( result.status === 200 ) {
                        props.enqueueSnackbar( result.mensaje,
                        {
                            variant: 'success',
                            preventDuplicate: true,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center',
                            }
                        })
                        props.cambiaModo ( 'normal'  , undefined )
                        props.actualizaListaParadasMaquina (  )
                    }
                    else {
                        props.enqueueSnackbar( result.mensaje,
                            {
                                variant: 'error',
                                preventDuplicate: true,
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }
                            })
                    }
                }
            }
            updatePM (  )
        }
    }
    const deleteParadaMaquina = (  ) => {
        const deleteMol = async (  ) => {
            const result = await Servicios.deleteParadaMaquina ( parseInt ( idParadaMaquina ) )
            if (  result ) {
                if ( result.status === 200 ) {
                    props.enqueueSnackbar( result.mensaje,
                    {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                    props.cambiaModo ( 'normal'  , undefined )
                    props.actualizaListaParadasMaquina (  )
                }
                else {
                    props.enqueueSnackbar( result.mensaje,
                    {
                        variant: 'error',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                }
            }
        }
        deleteMol (  )
    }
    return (
        props.modo === 'normal' ?
        <tr>
            <td>{idParadaMaquina}</td>
            <td>{nombreParadaMaquina}</td>
            <td>{tipoParadaMaquina === true ? 'NO PROGRAMADA' : 'PROGRAMADA'}</td>
            <td>{nombreArea}</td>
            <td><MyComponent.botonUpdate texto = 'Update defect'  onClick = { e => props.cambiaModo ( 'update' , props.paradaMaquina ) } /></td>
            <td><MyComponent.botonDelete texto = 'Delete defect' onClick = { e => props.cambiaModo ( 'delete' , props.paradaMaquina ) } /></td>
        </tr>
        :
        props.modo === 'update' ?
        <tr>
            <td colSpan = { 5 } >
                <MyComponent.texto id = { `${idParadaMaquina}` } label = 'Nombre' value = { nombreParadaMaquina } onChange = { e => setNombreParadaMaquina ( e.target.value ) } />
                <MyComponent.boolean label = 'PM no programada' checked = { tipoParadaMaquina } onChange = { e => setTipoParadaMaquina ( e.target.checked ) } />
                <MyComponent.listaDesplegable onChange = { e => setIdArea ( e.target.value ) } value = { idArea }  array = { vecAreas } member = { { valueMember : 'idArea' , displayMember : 'nombreArea' } } label = 'Area' />
                <MyComponent.botonAcept texto = 'Update Parada Maquina'  onClick = { e=> updateParadaMaquina (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
                <Alert id = 'myAlert' variant = 'danger' style = { { display : 'none' , marginTop : 20 } } />
            </td>
        </tr>
        :
        <tr>
            <td colSpan = { 5 } >
                ¿Esta seguro de eliminar el Parada de Maquina { nombreParadaMaquina }
                <MyComponent.botonDelete texto = 'Delete parada de maquina'  onClick = { e=> deleteParadaMaquina (  ) } />
                <MyComponent.botonCancel texto = 'Cancel'  onClick = { e=> props.cambiaModo ( 'normal'  , undefined ) } />
            </td>
        </tr>
    )
}

export default withSnackbar ( ParadaMaquina )