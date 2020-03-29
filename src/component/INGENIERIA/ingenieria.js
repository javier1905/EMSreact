import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useRouteMatch , Route , useHistory } from 'react-router-dom'
import Piezas from './PIEZAS/listaPiezas'

const Ingenieria = ( props ) => {
    const match = useRouteMatch (  )
    const history = useHistory (  )
    return (
        <>
            <Typography variant = 'h1' >Ingenieria</Typography>
            <button onClick = { e=> history.push ( `${match.path}/piezas` ) }>Piezas</button>
            <>
                <Route path = {`${match.path}/piezas`} >
                    <Piezas/>
                </Route>
            </>
        </>
    )
}

export default Ingenieria