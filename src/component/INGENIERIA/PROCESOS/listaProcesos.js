import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MyComponent from '../../AAprimary/misComponentes'
import { Table } from 'react-bootstrap'
import Loading from '@material-ui/core/CircularProgress'
import noFound from '../../../Imagenes/noFound.png'
import Proceso from './proceso'
import Servicios from '../servicesIngenieria'

const ListaProcesos= (  ) => {
    const [vecProcesos,setVecProcesos] = useState ( [  ] )
    const [loading,setLoading] = useState ( true )

    useEffect ( (  ) => {
        const getListaProcesos = async (  ) => {
            const vecPro = await Servicios.listaProcesos (  )
            if ( vecPro ) {
                setVecProcesos ( vecPro )
                setLoading ( false )
            }
        }
        getListaProcesos (  )
    } , [ loading ] )
    return (
        <div>
            <Typography variant = 'h1'>Listado Procesos</Typography>
            <div>
                <MyComponent.botonAdd fontSize = 'large' size = { 60 } texto = 'Add proceso' />
            </div>
            <div id = 'containerTablaProcesos'>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripcion</th>
                            <th>Pieza</th>
                            <th>Maquina</th>
                            <th>Tipo</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?
                            <tr>
                                <td colSpan = { 7 }>
                                    <div>
                                        <Loading/>
                                    </div>
                                </td>
                            </tr>
                            :
                            Array.isArray ( vecProcesos ) && vecProcesos.length > 0 ?
                                vecProcesos.map ( ( p , i ) => {
                                    return (<Proceso proceso = { p }  key = { i } />)
                                } )
                                :
                                <tr>
                                    <td colSpan = { 7 }>
                                        <div>
                                            <img src = { noFound } alt = 'img no found '></img>
                                        </div>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ListaProcesos