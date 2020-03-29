import React , { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import FormAltaPiezas from './formAltaPieza'
import { SnackbarProvider } from 'notistack'
import { Table } from 'react-bootstrap'
import Pieza from './pieza'
import CircularProgress from '@material-ui/core/CircularProgress'
import noFound from '../../../Imagenes/noFound.png'
import Servicios from '../servicesIngenieria'

const ListaPiezas = ( props ) => {
    const [loadingVpiezas , setLoadingVpiezas] = useState ( true )
    const [vecPiezas , setVecPiezas] = useState ( [  ] )

    useEffect ( (  ) => {
        const getListPiezas = async (  ) => {
            const response = await Servicios.listPiezas (  )
            if ( response ) {
                console.log ( response )
                setVecPiezas ( response )
                setLoadingVpiezas ( false )
            }
        }
        getListPiezas (  )
    } ,  [ loadingVpiezas  ])

    return (
        <div>
            <Typography variant = 'h1'>Listado Piezas</Typography>
            <div className = 'altaPiezas'>
                <SnackbarProvider maxSnack = { 3 } >
                    <FormAltaPiezas/>
                </SnackbarProvider>
                <div id = 'listadoPiezas'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Cliente</th>
                                <th>TipoMaterial</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loadingVpiezas === true ?
                                    <tr style = { { width : '100%' , marginLeft : 'auto' , marginRight : 'auto ' , padding : 30} } >
                                        <td colSpan = { 6 }  >
                                            <CircularProgress  />
                                            </td>
                                    </tr>
                                    :
                                    Array.isArray ( vecPiezas  ) && vecPiezas.length > 0 ?
                                    vecPiezas.map ( ( p , i ) => {
                                        return (<Pieza key = { i } pieza = { p } vecPiezas = { vecPiezas }/>)
                                    } )
                                        :
                                        <tr >
                                            <td colSpan = { 6 }  >
                                                <img style = { { width : '100%' , padding : 30 } } src = { noFound } alt = 'No foung ' ></img>
                                            </td>
                                        </tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    )
}
export default ListaPiezas