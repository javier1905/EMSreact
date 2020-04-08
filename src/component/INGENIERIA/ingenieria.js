import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useRouteMatch , Route , useHistory } from 'react-router-dom'
import Piezas from './PIEZAS/listaPiezas'
import Procesos from './PROCESOS/listaProcesos'
import ListaDefectos from './DEFECTOS/listaDefectos'

const Ingenieria = ( props ) => {
    const match = useRouteMatch (  )
    const history = useHistory (  )
    return (
        <>
            <Typography variant = 'h1' >Ingenieria</Typography>
            <button onClick = { e=> history.push ( `${match.path}/piezas` ) }>Piezas</button>
            <button onClick = { e=> history.push ( `${match.path}/procesos` ) }>Procesos</button>
            <button onClick = { e=> history.push ( `${match.path}/defectos` ) }>Defectos</button>
            <>
                <Route path = {`${match.path}/piezas`} >
                    <Piezas/>
                </Route>
                <Route path = {`${match.path}/procesos`} >
                    <Procesos/>
                </Route>
                <Route path = {`${match.path}/defectos`} >
                    <ListaDefectos/>
                </Route>
            </>
        </>
    )
}

export default Ingenieria