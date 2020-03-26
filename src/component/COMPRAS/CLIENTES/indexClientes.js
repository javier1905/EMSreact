import React from 'react'
import ListaClientes from './listaClientes'
import Typography from '@material-ui/core/Typography'
import { useHistory , useRouteMatch ,Route } from 'react-router-dom'

const IndexClientes = ( props ) => {

    const match = useRouteMatch (  )
    const history = useHistory (  )
    return (<div>
            <Typography variant = 'h1'>Clientes</Typography>
            <button onClick = { e => {  history.push ( `${match.path}/ABMclientes` ) } }>Gestionar Clientes </button>
            <>
                <Route path = {`${match.path}/ABMclientes`}>
                    <ListaClientes />
            </Route>
            </>
        </div>
    )
}

export default IndexClientes