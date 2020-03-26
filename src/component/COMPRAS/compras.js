import React from 'react'
import {  Route , useRouteMatch , useHistory } from 'react-router-dom'
import Clientes from './CLIENTES/indexClientes'
import Typography from '@material-ui/core/Typography'

const Compras = ( props ) => {
    const match = useRouteMatch (  )
    const history = useHistory (  )
    return (<React.Fragment>
            <Typography variant = 'h1' >Compras</Typography>
            <button onClick = { e => { history.push(`${match.path}/clientes`) }}>Clientes</button>
            <>
            <Route path = {`${match.path}/clientes`} >
                <Clientes />
            </Route>
            </>
        </React.Fragment>
    )
}

export default  Compras