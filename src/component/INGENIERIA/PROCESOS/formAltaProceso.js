import React , { useState , forwardRef, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import useStyles from './styleFormProcesos'
import { Form } from 'react-bootstrap'
import MyComponent from '../../AAprimary/misComponentes'
import ListaPiezasXhora from './listaPiezasXhora'
import Servicios from '../servicesIngenieria'
import Moment from 'moment'
import { withSnackbar } from 'notistack'

const Transition = forwardRef ( function Transition ( props , ref ) {  return <Slide direction = "up" ref = { ref } {...props} /> } )
const FormProcesos =  ( props ) => {
    const classes = useStyles ( )
    const [open, setOpen] = useState ( false )
    const [vecPiezas , setVecPiezas] = useState ( [  ] )
    const [vecMaquinas , setVecMaquinas] = useState ( [  ] )
    const [vecTiposProceso , setVecTiposProceso] = useState ( [  ] )
    const [idPieza , setIdPieza] = useState ( '' )
    const [idMaquina , setIdMaquina] = useState ( '' )
    const [idTipoProceso , setIdTipoProceso] = useState ( '' )
    const [descipcionProceso , setDescipcionProceso] = useState ( '' )
    const [vecPiezasXhora , setVecPiezasXhora] = useState ( [  ] )

    useEffect ( (  ) => {
        const getVecPiezas = async (  ) => {
            const resTipoPro = await Servicios.listaTiposProceso (  )
            const resMaq = await Servicios.listaMaquinas (  )
            const response = await Servicios.listPiezas (  )
            setDescipcionProceso ( props.proceso.descipcionProceso )
            if ( response ) { setVecPiezas ( response ) ; setIdPieza ( props.proceso.idProceso )  }
            if ( resMaq ) { setVecMaquinas ( resMaq ) ; setIdMaquina ( props.proceso.idMaquina )}
            if ( resTipoPro ) { setVecTiposProceso ( resTipoPro ) ; setIdTipoProceso ( props.proceso.idTipoProceso )  }
            if ( props.open ) { setVecPiezasXhora ( props.proceso.vecPiezasXhora ) }
        }
        getVecPiezas (  )
        setOpen ( props.open )
    } , [ props ] )
    const MethodVecPiezaXhoras = ( piezaXhora , index ) => {
        var vec = vecPiezasXhora
        if ( index === 0 ) {
            vec[0] = piezaXhora
            if (vec.length >1) {
                vec[1].desdePiezasXhs = new Moment (  piezaXhora.hastaPiezasXhs ).add ( 1 , 'd' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
            }
        }
        else if ( index === vec.length - 1 ) {
            vec[index] = piezaXhora
            vec[vec.length - 2].hastaPiezasXhs = new Moment (  piezaXhora.desdePiezasXhs ).add ( -1 , 'd' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
        }
        else {
            vec[index] = piezaXhora
            vec[index - 1].hastaPiezasXhs = new Moment (  piezaXhora.desdePiezasXhs ).add ( -1 , 'd' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
            vec[index + 1].desdePiezasXhs = new Moment (  piezaXhora.hastaPiezasXhs ).add ( 1 , 'd' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
        }
        setVecPiezasXhora ( vec )
    }
    const MethodInsertPiezaXhora =  ( piezaXhora ) => {
        var vec = vecPiezasXhora
        if ( vec.length > 0 ) {
            vec[vec.length - 1].hastaPiezasXhs = new Moment (  piezaXhora.desdePiezasXhs ).add ( -1 , 'd' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
        }
        vec = [...vec , piezaXhora ]
        setVecPiezasXhora ( vec )
    }
    const MethodDeletePiezaXhora = ( idPiezasXhs , index ) => {
        console.log ( 'methos DELTE sussecc' , idPiezasXhs , index )
        var vec = vecPiezasXhora
        if ( vec.length === 1 ) { vec.splice ( index , 1 ) }
        else if ( index === 0 && vec.length > 1) {
            vec[1].desdePiezasXhs = new Moment ( vec[index].desdePiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
            vec.splice ( index , 1 )
        }
        else if ( ( vec.length -1 ) === index ) {
            vec[vec.length - 2].hastaPiezasXhs = new Moment ( vec[index].hastaPiezasXhs ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
            vec.splice ( index , 1 )
        }
        else {
            vec[index+1].desdePiezasXhs = new Moment ( vec[index -1].hastaPiezasXhs ).add ( 1 , 'd' ).format ( 'YYYY-MM-DDTHH:MM:ss.sss' )
            vec.splice ( index , 1 )
        }
        setVecPiezasXhora ( vec )
    }
    const mySubmit = e => {
        console.log ( ' prevent default funcionando')
        if ( descipcionProceso === '' || idPieza === '' || idMaquina === '' || idTipoProceso === '') {
            props.enqueueSnackbar(`complete todos los campos`,
            {
                variant: 'error',
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            })
        }
        else if ( vecPiezasXhora.length === 0 ) {
            props.enqueueSnackbar(`Ingrese al menos un tiempo de ciclo`,
            {
                variant: 'error',
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            })
        }
        else {
            props.enqueueSnackbar(`Listo para insertar `,
            {
                variant: 'success',
                preventDuplicate: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }
            })
        }
        e.preventDefault(  )
    }
    return (
    <div>
        <Dialog fullScreen open = { open } onClose = {  e => props.handleClose (  ) } TransitionComponent = { Transition } >
            <AppBar className = { classes.appBar } >
            <Toolbar>
                <Typography variant="h2" className = { classes.title } >
                    Procesos
                </Typography>
                <IconButton  edge="start" color="inherit" onClick = {  e => props.handleClose (  ) } aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            </AppBar>
            <Form onSubmit = { mySubmit } style = { { padding : 20 } }>
                <MyComponent.texto label = 'descripcion' value = { descipcionProceso }  onChange = { e => setDescipcionProceso ( e.target.value ) }/>
                <MyComponent.listaDesplegable value = { idPieza }  onChange = { e => setIdPieza ( e.target.value ) } label = 'pieza' array = { vecPiezas } member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza'} } />
                <MyComponent.listaDesplegable value = { idMaquina }  onChange = { e => setIdMaquina ( e.target.value ) } label = 'maquina' array = { vecMaquinas } member = { { valueMember : 'idMaquina' , displayMember : 'nombreMaquina' } } />
                <MyComponent.listaDesplegable value = { idTipoProceso }  onChange = { e => setIdTipoProceso ( e.target.value ) } label = 'tipo proceso'  array = { vecTiposProceso } member = { { valueMember : 'idTipoProceso' , displayMember : 'nombreTipoProceso' } } />
                <ListaPiezasXhora
                    MethodInsertPiezaXhora = { MethodInsertPiezaXhora }
                    MethodVecPiezaXhoras = { MethodVecPiezaXhoras }
                    MethodDeletePiezaXhora = { MethodDeletePiezaXhora }
                    vecPiezasXhora = { vecPiezasXhora }
                />
                <MyComponent.botonSave />
            </Form>
        </Dialog>
        </div>
    )
}
export default withSnackbar ( FormProcesos )
