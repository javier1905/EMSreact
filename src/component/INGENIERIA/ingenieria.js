import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useRouteMatch , Route , useHistory } from 'react-router-dom'
import Piezas from './PIEZAS/listaPiezas'
import Procesos from './PROCESOS/listaProcesos'
import ListaDefectos from './DEFECTOS/listaDefectos'
import ListaMoldes from './MOLDES/listaMoldes'
import ListaParadasMaquina from './PARADASMAQUINA/listaParadasMaquina'

const Ingenieria = ( props ) => {
    const match = useRouteMatch (  )
    const history = useHistory (  )
    return (
        <>
            <Typography variant = 'h1' >Ingenieria</Typography>
            <button onClick = { e=> history.push ( `${match.path}/piezas` ) }>Piezas</button>
            <button onClick = { e=> history.push ( `${match.path}/procesos` ) }>Procesos</button>
            <button onClick = { e=> history.push ( `${match.path}/defectos` ) }>Defectos</button>
            <button onClick = { e=> history.push ( `${match.path}/moldes` ) }>Moldes</button>
            <button onClick = { e=> history.push ( `${match.path}/paradasMaquina` ) }>Paradas de Maquina</button>
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
                <Route path = {`${match.path}/moldes`} >
                    <ListaMoldes/>
                </Route>
                <Route path = {`${match.path}/paradasMaquina`} >
                    <ListaParadasMaquina/>
                </Route>
            </>
        </>
    )
}

export default Ingenieria