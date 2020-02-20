import React from 'react'
import {Form,Row,Button,Table} from 'react-bootstrap'
import './styleAltaPlanillaPRODUCCION.css'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles'
import {TextField,Box} from '@material-ui/core';
// import ButtonN from '@material-ui/core/Button'
import { Autocomplete } from '@material-ui/lab'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { format } from 'date-fns'

class AltaPlanillaPRODUCCION extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
            fechaProduccion:new Date(),
            fechaFundicion:undefined,
            idTurno:'',
            HoraInicioProduccion:'',
            HoraFinProduccion:'',
            idOperacion:'',
            idMaquina:'',
            idPieza:'',
            idMolde:'',
            vecOperarios:[],
            vecOperaciones:[],
            vecMaquinas:[],
            vecPiezas:[],
            vecMoldes:[],
            vecParadasMaquina:[],
            vecTurnos:[],
            vecDefectos:[{idDefecto:'1',nombreDefecto:'Agarre'},{idDefecto:2,nombreDefecto:'Rechupe'}],
            vecTipoRechazo:[{idTipoRechazo:'1',nombreTipoRechazo:'Rechazo'},{idTipoRechazo:2,nombreTipoRechazo:'Scrap'}],
            vecOperariosCombo:[{idOperario:1,nombreOperario:'Gracia Carlos'},{idOperario:2,nombreOperario:'Irusta Miguel'}],
            paradaMaquinaSeleccionada:undefined,
        }
        this.inputLabel = React.createRef()
        this.cbx_paradasMaquina = React.createRef()
        this.cbx_operacion = React.createRef()
        this.cbx_maquina = React.createRef()
        this.cbx_pieza = React.createRef()
        this.cbx_molde = React.createRef()
    }
    handleDateChange = date => { this.setState({fechaProduccion:date})}
    capturaFechaFundicion = date => { this.setState({fechaFundicion:date})} 
    getHoraInicioProduccion = e =>{this.setState({HoraInicioProduccion:e.target.value})}
    getHoraFinProduccion = e =>{this.setState({HoraFinProduccion:e.target.value})}
    getHoraInicioOperario = e =>{
        var vecOperariosTemp = this.state.vecOperarios
        var indexOperario = e.target.name.split(' ')[1]
        vecOperariosTemp[indexOperario].horaInicio = e.target.value
        this.setState({vecOperarios:vecOperariosTemp})     
    }
    getHoraFinOperario = e =>{
        var vecOperariosTemp = this.state.vecOperarios
        var indexOperario = e.target.name.split(' ')[1]
        vecOperariosTemp[indexOperario].horaFin = e.target.value
        this.setState({vecOperarios:vecOperariosTemp})     
    }
    addOperario = e =>{
        let Op = {
            idOperario:'',
            nombre:'',
            apellido:'',
            horaInicio:'',
            horaFin:'',
            produccion:'',
            calorias:'',
            vecRechazo:[]
        }
        let newVecOperarios = [...this.state.vecOperarios,Op]
        console.log(newVecOperarios[0])
        this.setState({vecOperarios:newVecOperarios})
    }
    addRechazo = e =>{
        let indexOperario = parseInt(e.target.name)
        let newRechazo = {
            idRechazo:'',
            nombreRechazo:'',
            tipo:'',
            cantidadRechazo:'',
            vecZonas:[]
        }
        if(this.state.vecOperarios[indexOperario]){
            let newVecOperarios = this.state.vecOperarios
            newVecOperarios[indexOperario].vecRechazo = [...newVecOperarios[indexOperario].vecRechazo,newRechazo]
            this.setState({vecOperarios:newVecOperarios})
        }
    }
    addZona = e =>{
        var letra,numero,cantidad;
        var cacheVecOperario = this.state.vecOperarios
        try{
            let indexOperario = parseInt(e.target.name.split(' ')[1])
            let indexRechazo = parseInt(e.target.name.split(' ')[2])
            letra = document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`).value
            numero = document.getElementById(`numeroZona ${indexOperario} ${indexRechazo}`).value
            cantidad = document.getElementById(`cantidadZona ${indexOperario} ${indexRechazo}`).value
            var vecZONA = cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas
            if(vecZONA.length === 0){
                var newZona = { letra,numero,cantidad }
                cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas = [...cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas,newZona]
                this.setState({vecOperarios:cacheVecOperario})
            }
            else{
                if(vecZONA.find(z=>(z.letra === letra && z.numero === numero))){
                    if(vecZONA.find(z=>z.numero === numero)){
                        var indexZona = vecZONA.findIndex(z => (z.letra === letra && z.numero === numero) )
                        cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas[indexZona].cantidad = parseInt(cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas[indexZona].cantidad)+parseInt(cantidad)
                        this.setState({vecOperarios:cacheVecOperario})
                    }
                }
                else{
                    var newZonaS = { letra,numero,cantidad }
                    cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas = [...cacheVecOperario[indexOperario].vecRechazo[indexRechazo].vecZonas,newZonaS]
                    this.setState({vecOperarios:cacheVecOperario})
                }
            }
        }
        catch(e){}
    }
    verificaRechazoCoincidente = e => {
        var cacheVecOp = this.state.vecOperarios
        try{
            let indexOperario = parseInt(e.target.name.split(' ')[1])
            let indexRechazo = parseInt(e.target.name.split(' ')[2])
            // var idRechazo = document.getElementById(`idRechazo ${indexOperario} ${indexRechazo}`).value
            var idRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].idRechazo
            // var nombreRechazo = document.getElementById(`nombreRechazo ${indexOperario} ${indexRechazo}`).value
            var nombreRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].nombreRechazo
            // var tipoRechazo = document.getElementById(`tipoRechazo ${indexOperario} ${indexRechazo}`).value
            var tipoRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].tipo
            // var cantidadRechazo = document.getElementById(`cantidadRechazo ${indexOperario} ${indexRechazo}`).value ; console.log(document.getElementById(`nombreRechazo ${indexOperario} ${indexRechazo}`).target.value)
            var cantidadRechazo = this.state.vecOperarios[indexOperario].vecRechazo[indexRechazo].cantidadRechazo
            if(idRechazo && nombreRechazo && tipoRechazo && cantidadRechazo){ // VERIFICO QUE TODOS LOS CAMPOS DE DEL RECHAZO ANALIZADO ESTEN COMPLETOS
                cacheVecOp[indexOperario].vecRechazo.map((rech,indice) => {// RECORRO EL VEC RECHAZOS DE ESE OPERARIO
                    if(rech.idRechazo !== undefined && rech.nombreRechazo !== undefined && rech.tipo !== undefined && rech.cantidadRechazo !== undefined){
                        if(indice !== indexRechazo){ // indice { coincidencia } indexRechazo { analizado }
                            if(rech.idRechazo === idRechazo && rech.tipo === tipoRechazo){ // COINCIDENCIA ENTRE EL RECHAZO ANALIZADO Y EL VEC RECHAZO DE ESE OPERARIO
                                if(cacheVecOp[indexOperario].vecRechazo[indexRechazo].vecZonas.length){ // SI EL RECHAZO QUE ESTOY  ANALIZO TIENE CARAGAS ZONAS
                                    cacheVecOp[indexOperario].vecRechazo[indexRechazo].vecZonas.map((zona,indiceZona)=>{ // RECORRO EL VECTOR DE ZONAS EL RECHAZO ANALIZADO
                                        if(cacheVecOp[indexOperario].vecRechazo[indice].vecZonas.find(zo=>(zo.letra === zona.letra && zo.numero === zona.numero))){ // SI COINCIDE las ZONAS
                                            var indiceCOINCIDENCIA = cacheVecOp[indexOperario].vecRechazo[indice].vecZonas.findIndex(zo=>(zo.letra === zona.letra && zo.numero === zona.numero))
                                            cacheVecOp[indexOperario].vecRechazo[indice].vecZonas[indiceCOINCIDENCIA].cantidad = parseInt(cacheVecOp[indexOperario].vecRechazo[indice].vecZonas[indiceCOINCIDENCIA].cantidad) + parseInt(zona.cantidad) // sumo las cantidades
                                        }
                                        else{ // SI NO COINCIDEN LAS ZONAS SE LA AGREGO
                                            cacheVecOp[indexOperario].vecRechazo[indice].vecZonas = [...cacheVecOp[indexOperario].vecRechazo[indice].vecZonas,zona]
                                        }
                                        return <React.Fragment></React.Fragment>
                                    })
                                }
                                // sumar cantidad de rechazo
                                console.log(cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo,'cantidad original ',cantidadRechazo, ' cantidad a sumar')
                                cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo = parseInt(cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo) + parseInt(cantidadRechazo)
                                cacheVecOp[indexOperario].vecRechazo.splice(indexRechazo,1)
                                // document.getElementById(`cantidadRechazo ${indexOperario} ${indice}`).value = cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo
                                this.setState({vecOperarios:cacheVecOp})
                                return undefined
                            }
                        }
                    }
                    return undefined
                })
            }
        }
        catch(e){ console.log(e)}
    }
    capturaDatos = e =>{
            let nombre = e.target.name
            let value = e.target.value
        if(nombre === 'idTurno'){this.setState({idTurno:value})}
        if(nombre === 'idOperacion'){
            this.setState({idOperacion:value})
            this.getMaquinasXoperacion(value)
            this.setState({idMaquina:'',idPieza:'',idMolde:''})
        }
        if(nombre === 'idMaquina'){
            this.setState({idMaquina:value})
            this.getPiezasXmaquina(value)
            this.setState({idPieza:'',idMolde:''})
        }
        if(nombre === 'idPieza'){this.setState({idPieza:value});this.getMoldesXpieza(value)}
        if(nombre === 'idMolde'){this.setState({idMolde:value})}
        var indexOperario
        if(nombre.split(' ')[1]){indexOperario = parseInt(nombre.split(' ')[1])}
        var indexRechazo
        if(nombre.split(' ')[2]){indexRechazo = parseInt(nombre.split(' ')[2]) }
        var vecOperariosCache = this.state.vecOperarios
        try{
            if(nombre.split(' ')[0] === 'idOperario'){ vecOperariosCache[indexOperario].idOperario = value; vecOperariosCache[indexOperario].nombre = value }
            if(nombre.split(' ')[0] === 'nombreOperario'){ vecOperariosCache[indexOperario].nombre = value; vecOperariosCache[indexOperario].idOperario = parseInt(value) }
            // if(nombre.split(' ')[0] === 'hsInicioOperario'){ vecOperariosCache[indexOperario].horaInicio = value }
            // if(nombre.split(' ')[0] === 'hsFinOperario'){ vecOperariosCache[indexOperario].horaFin = value }
            if(nombre.split(' ')[0] === 'produccionOperario'){ vecOperariosCache[indexOperario].produccion = value }
            if(nombre.split(' ')[0] === 'caloriasOperario'){ vecOperariosCache[indexOperario].calorias = value }
            if(nombre.split(' ')[0] === 'idRechazo'){vecOperariosCache[indexOperario].vecRechazo[indexRechazo].idRechazo = value}
            if(nombre.split(' ')[0] === 'nombreRechazo'){vecOperariosCache[indexOperario].vecRechazo[indexRechazo].nombreRechazo = value}
            if(nombre.split(' ')[0] === 'tipoRechazo'){
                vecOperariosCache[indexOperario].vecRechazo[indexRechazo].tipo = value
                var div = document.getElementById(`contenedorRechazosYzonas ${parseInt(nombre.split(' ')[1])} ${parseInt(nombre.split(' ')[2])}`)
                if(value === 'Scrap'){div.setAttribute('class','Scrap') }
                else if( value === 'Rechazo'){ div.setAttribute('class','Rechazo') }
                else{ div.setAttribute('class','contenedorRechazosYzonas') }
            }
            if(nombre.split(' ')[0] === 'cantidadRechazo'){vecOperariosCache[indexOperario].vecRechazo[indexRechazo].cantidadRechazo = value}
            this.setState({vecOperarios:vecOperariosCache})
        }
        catch(e){console.log(e)}
    }
    getOperaciones = () =>{
        fetch('https://ems-node-api.herokuapp.com/api/operaciones',{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{
            return this.setState({vecOperaciones:json,idOperacion:''})
        })
    }
    getMaquinasXoperacion = idOperacion =>{
        fetch(`https://ems-node-api.herokuapp.com/api/maquinas/xoperacion/${idOperacion}`,{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{
            this.setState({vecMaquinas:json,vecPiezas:[],vecMoldes:[],idMaquina:''})
        })
    }
    getPiezasXmaquina = idMaquina =>{
        fetch(`https://ems-node-api.herokuapp.com/api/piezas/xmaquina/${idMaquina}`,{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{ return dato.json() })
        .then(json=>{ return this.setState({vecPiezas:json,vecMoldes:[],idMolde:'',idPieza:''}) })
    }
    getMoldesXpieza = idPieza =>{
        fetch(`https://ems-node-api.herokuapp.com/api/moldes/xpieza/${idPieza}`,{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{ return dato.json() })
        .then(json=>{ return this.setState({vecMoldes:json,idMolde:''}) })
    }
    getParadasMaquina = () =>{
        fetch('https://ems-node-api.herokuapp.com/api/paradasMaquina',{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{
            this.setState({vecParadasMaquina:json})
            try{
                return this.cbx_paradasMaquina.current.value = undefined
            }
            catch(e){}
        })
    }
    getTurnos = () =>{
        fetch(`https://ems-node-api.herokuapp.com/api/turnos`,{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{ this.setState({vecTurnos:json,idTurno:''}) })
    }
    componentDidMount(){
        this.getOperaciones()
        this.getParadasMaquina()
        this.getTurnos()
    }
    cerrarModal = () => {
        this.setState({show:false})
    }
    useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }))
    render() {
        const classes = this.useStyles
        return (
            <Box  boxShadow={1}  bgcolor="background.default"  m={0} p={3}>
                <Form>
                        <div className={classes.root}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}> {/* INICIO CONTENEDOR FECHAS PRODUCCION Y FUNDICION */}
                                        <h2 style={{marginTop:'10px'}}>PlanillaProduccion</h2>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'160px'}}
                                                required={true}
                                                size='small'
                                                variant='standard'
                                                margin="none"
                                                id="dtp_fechaProduccion"
                                                label="Fecha Produccion"
                                                format="dd/MM/yyyy"
                                                value={this.state.fechaProduccion}
                                                onChange={this.handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'160px'}}
                                                required={true}
                                                size='small'
                                                variant="outlined"
                                                margin="none"
                                                id="dtp_fechaFundicion"
                                                label="Fecha Fundicion"
                                                format="dd/MM/yyyy"
                                                value={this.state.fechaFundicion}
                                                onChange={this.capturaFechaFundicion}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid> {/* FIN CONTENEDOR FECHAS PRODUCCION Y FUNDICCION*/}
                                    <Grid item xs={12}> {/* INICIO TURNO Y HORA DE INICIO Y FIN  DE LA PLANILLA */}
                                        <FormControl className={classes.formControl} style={{width:'100px',marginRight:'10px'}}>
                                        <InputLabel id='idTurnoLabel'>Turno</InputLabel>
                                        <Select
                                            labelId='idTurnoLabel'
                                            onChange={this.capturaDatos}
                                            id='idTurno'
                                            value={this.state.idTurno}
                                            name='idTurno'
                                        >
                                            {
                                                this.state.vecTurnos ?
                                                this.state.vecTurnos.map((tur,indiceTurno)=>{
                                                return <MenuItem key={indiceTurno} value={tur.idTurno}>{tur.descripcionTurno}</MenuItem>
                                                })
                                                :
                                                <div></div>
                                            }
                                        </Select>
                                        </FormControl>
                                        <TextField
                                            style={{width:'100px',marginRight:'10px'}}
                                            id="idHoraIniciuoProduccion"
                                            label="Desde"
                                            name='hsInicioOperario'
                                            type="time"
                                            
                                            onChange={this.getHoraInicioProduccion}
                                            value ={this.state.horaInicio}
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}                                                                                                            
                                        />
                                        <TextField
                                            style={{width:'100px',marginRight:'10px'}}
                                            id="idHoraFinProduccion"
                                            label="Hasta"
                                            name='hsFinOperario'
                                            type="time"
                                            onChange={this.getHoraFinProduccion}
                                            value ={this.state.HoraFinProduccion}
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}                                                                 
                                         />                                 
                                    </Grid> {/* FIN TURNO Y HORA DE INICIO Y FIN  DE LA PLANILLA */}
                                    <Grid item xs={12}> {/* INICIO OPERACION MAQUINA PIEZA Y MOLDE */}
                                        <FormControl className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                                            <InputLabel id="demo-simple-select-label">Operacion</InputLabel>
                                            <Select
                                                ref={this.cbx_operacion}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.idOperacion}
                                                name='idOperacion'
                                                onChange={this.capturaDatos}
                                            >
                                            {
                                                this.state.vecOperaciones ?
                                                    this.state.vecOperaciones.map((ope,indiceOperacion)=>{
                                                    return <MenuItem key={indiceOperacion} value={ope.idOperacion}>{ope.nombreOperacion}</MenuItem>
                                                     }) :<MenuItem></MenuItem>                                                
                                            }
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                                            <InputLabel id="idMaquina">Maquina</InputLabel>
                                            <Select
                                                ref={this.cbx_maquina}
                                                labelId="IdMaquina"
                                                id="demo-simple-select"
                                                value={this.state.idMaquina}
                                                name='idMaquina'
                                                onChange={this.capturaDatos}
                                            >
                                            {
                                                this.state.vecMaquinas ?
                                                this.state.vecMaquinas.map((maq,indiceMaquina)=>{
                                                    return <MenuItem key={indiceMaquina} value={maq.idMaquina}>{maq.nombreMaquina}</MenuItem>
                                                })
                                                :
                                                <MenuItem></MenuItem>
                                            }
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                                            <InputLabel id="idPieza">Pieza</InputLabel>
                                            <Select
                                                ref={this.cbx_pieza}
                                                labelId="idPieza"
                                                id="demo-simple-select"
                                                value={this.state.idPieza}
                                                name='idPieza'
                                                onChange={this.capturaDatos}
                                            >
                                            {
                                                this.state.vecPiezas ?
                                                this.state.vecPiezas.map((pie,indicePieza)=>{
                                                    return <MenuItem key={indicePieza} value={pie.idPieza}>{pie.nombrePieza}</MenuItem>
                                                })
                                                :
                                                <MenuItem></MenuItem>
                                            }
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                                            <InputLabel id="idMolde">Molde</InputLabel>
                                            <Select
                                                ref={this.cbx_molde}
                                                labelId="idMolde"
                                                id="cbx_molde"
                                                value={this.state.idMolde}
                                                name='idMolde'
                                                onChange={this.capturaDatos}
                                            >
                                                {
                                                    this.state.vecMoldes.map((mol,indiceMolde)=>{
                                                        return <MenuItem key={indiceMolde} value={mol.idMolde}>{mol.nombreMolde}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>  {/* FIN OPERACION MAQUINA PIEZA Y MOLDE */}
                                    <Grid item xs={12}> {/* INICIO OPERARIOS*/}
                                        <h2>Operarios</h2>
                                        <div style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px'}}>
                                            <Button variant="primary" size="lg" block onClick={this.addOperario}>
                                                Agregar
                                            </Button>
                                            {
                                                this.state.vecOperarios.map((o,i)=>{  // ! RECORRE VECTOR OPERARIOS
                                                    return <div key={i} style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px',marginTop:'10px'}}>
                                                                <Row>
                                                                        <TextField
                                                                            style={{width:'70px',marginRight:'10px'}}
                                                                            id="standard-basic"
                                                                            label="Legajo"
                                                                            type='number'
                                                                            name={`idOperario ${i}`}
                                                                            onChange={this.capturaDatos}                                                                            
                                                                            value={this.state.vecOperarios[i].idOperario}
                                                                        />
                                                                        <FormControl className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                                                                            <InputLabel id="idNombre">Nombre</InputLabel>
                                                                            <Select
                                                                                labelId="idNombre"
                                                                                id="cbx_operarios"
                                                                                value={this.state.vecOperarios[i].nombre}
                                                                                name={`nombreOperario ${i}`}
                                                                                onChange={this.capturaDatos}
                                                                            >
                                                                                {
                                                                                    this.state.vecOperariosCombo.map((op,indiceOperario)=>{
                                                                                        return <MenuItem key={indiceOperario} value={op.idOperario}>{op.nombreOperario}</MenuItem>
                                                                                    })
                                                                                }
                                                                            </Select>
                                                                        </FormControl>
                                                                        <TextField
                                                                            style={{width:'100px',marginRight:'10px'}}
                                                                            id="time"
                                                                            label="Desde"
                                                                            name={`hsInicioOperario ${i}`}
                                                                            type="time"
                                                                            onChange={this.getHoraInicioOperario}
                                                                            value ={this.state.vecOperarios[i].horaInicio}
                                                                            className={classes.textField}
                                                                            InputLabelProps={{
                                                                            shrink: true,
                                                                            }}
                                                                            inputProps={{
                                                                            step: 300, // 5 min
                                                                            }}                                                                            
                                                                        />
                                                                        <TextField
                                                                            style={{width:'100px',marginRight:'10px'}}
                                                                            id="hsFinOperario"
                                                                            label="Hasta"
                                                                            name={`hsFinOperario ${i}`}
                                                                            type="time"
                                                                            onChange={this.getHoraFinOperario}
                                                                            value ={this.state.vecOperarios[i].horaFin}
                                                                            className={classes.textField}
                                                                            InputLabelProps={{
                                                                            shrink: true,
                                                                            }}
                                                                            inputProps={{
                                                                            step: 300, // 5 min
                                                                            }}
                                                                        />
                                                                        <TextField
                                                                            style={{width:'105px',marginRight:'10px'}}
                                                                            id="standard-basic"
                                                                            label="Produccion"
                                                                            type='number'
                                                                            name={`produccionOperario ${i}`}
                                                                            onChange={this.capturaDatos}                                                                            
                                                                            value={this.state.vecOperarios[i].produccion}
                                                                        />
                                                                        <TextField
                                                                            style={{width:'80px',marginRight:'10px'}}
                                                                            id="txt_calorias"
                                                                            label="Calorias"
                                                                            type='number'
                                                                            name={`caloriasOperario ${i}`}
                                                                            onChange={this.capturaDatos}                                                                            
                                                                            value={this.state.vecOperarios[i].calorias}
                                                                        />                                               
                                                                        {/* <ButtonN variant="outlined" color="primary" type='button' onClickCapture={this.addRechazo} name={i}  >Add Rechazos</ButtonN> */}
                                                                        <Button size="sm" name={i} onClick={this.addRechazo}> Add rechazos </Button>                                                          
                                                                </Row>
                                                                { // !RECORRE VECTOR RECHAZOS
                                                                    this.state.vecOperarios[i].vecRechazo ?
                                                                    this.state.vecOperarios[i].vecRechazo.map((rech,indexRechazo)=>{
                                                                        return <div id={`contenedorRechazosYzonas ${i} ${indexRechazo}`} key={`${i}${indexRechazo}`} className='contenedorRechazosYzonas'>
                                                                                <div className='contenedorRechazos'>
                                                                                    <TextField
                                                                                        style={{width:'105px',marginRight:'10px'}}
                                                                                        id={`idRechazo ${i} ${indexRechazo}`}
                                                                                        label="Id rech"
                                                                                        type='number'
                                                                                        name={`idRechazo ${i} ${indexRechazo}`}
                                                                                        onChange={this.capturaDatos}                                                                            
                                                                                        value={this.state.vecOperarios[i].vecRechazo[indexRechazo].idRechazo}
                                                                                        onBlur={this.verificaRechazoCoincidente}
                                                                                    /> 
                                                                                    <FormControl className={classes.formControl}  style={{width:'140px',marginRight:'10px'}}>
                                                                                        <InputLabel id='lbl_defecto'>Defecto</InputLabel>
                                                                                        <Select 
                                                                                            id={`nombreRechazo ${i} ${indexRechazo}`}
                                                                                            labelId='lbl_defecto'
                                                                                            value={this.state.vecOperarios[i].vecRechazo[indexRechazo].nombreRechazo}
                                                                                            name={`nombreRechazo ${i} ${indexRechazo}`}
                                                                                            onChange = {this.capturaDatos}
                                                                                            onBlur={this.verificaRechazoCoincidente}
                                                                                        >
                                                                                            {
                                                                                                this.state.vecDefectos ?
                                                                                                this.state.vecDefectos.map((def,indexDefecto)=>{
                                                                                                    return <MenuItem key={indexDefecto} value={def.idDefecto}>{def.nombreDefecto}</MenuItem>
                                                                                                })
                                                                                                :
                                                                                                <MenuItem></MenuItem>
                                                                                            }                                                                                            
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <FormControl className={classes.formControl}  style={{width:'140px',marginRight:'10px'}}>
                                                                                        <InputLabel id='lbl_TipoRecha'>Tipo Rech</InputLabel>
                                                                                        <Select 
                                                                                            id={`tipoRechazo ${i} ${indexRechazo}`}
                                                                                            labelId='lbl_TipoRecha'
                                                                                            value={this.state.vecOperarios[i].vecRechazo[indexRechazo].tipo}
                                                                                            name={`tipoRechazo ${i} ${indexRechazo}`}
                                                                                            onChange = {this.capturaDatos}
                                                                                            onBlur={this.verificaRechazoCoincidente}
                                                                                        >
                                                                                            {
                                                                                                this.state.vecTipoRechazo ?
                                                                                                this.state.vecTipoRechazo.map((tr,indexTipoRechazo)=>{
                                                                                                    return <MenuItem key={indexTipoRechazo} value={tr.idTipoRechazo}>{tr.nombreTipoRechazo}</MenuItem>
                                                                                                })
                                                                                                :
                                                                                                <MenuItem></MenuItem>
                                                                                            }                                                                                            
                                                                                        </Select>
                                                                                    </FormControl>                                      
                                 
                                                                                    {/* <Form.Group size="sm">
                                                                                        <Form.Label size="sm">Tipo Rech</Form.Label>
                                                                                        <Form.Control
                                                                                            defaultValue={rech.tipo}
                                                                                            id={`tipoRechazo ${i} ${indexRechazo}`}
                                                                                            size="sm"
                                                                                            name={`tipoRechazo ${i} ${indexRechazo}`}
                                                                                            as='select'
                                                                                            onChange = {this.capturaDatos}
                                                                                            onBlur={this.verificaRechazoCoincidente}
                                                                                        >
                                                                                            <option>{undefined}</option>
                                                                                            <option>Rechazo</option>
                                                                                            <option>Scrap</option>
                                                                                        </Form.Control>
                                                                                    </Form.Group> */}
                                                                                    <TextField
                                                                                        style={{width:'105px',marginRight:'10px'}}
                                                                                        id={`cantidadRechazo ${i} ${indexRechazo}`}
                                                                                        label="Cantidad"
                                                                                        type='number'
                                                                                        name={`cantidadRechazo ${i} ${indexRechazo}`}
                                                                                        onChange={this.capturaDatos}                                                                            
                                                                                        value={this.state.vecOperarios[i].vecRechazo[indexRechazo].cantidadRechazo}
                                                                                        onBlur={this.verificaRechazoCoincidente}
                                                                                    />                        
                                                                                </div>
                                                                                <div className='contenedorFormZonas'>
                                                                                    <Form.Group size="sm">
                                                                                        <Form.Label size="sm">Letra</Form.Label>
                                                                                        <Form.Control size="sm" id={`letraZona ${i} ${indexRechazo}`} className='zona' type='text'/>
                                                                                    </Form.Group>
                                                                                    <Form.Group size="sm">
                                                                                        <Form.Label size="sm">Numero</Form.Label>
                                                                                        <Form.Control size="sm" id={`numeroZona ${i} ${indexRechazo}`} className='zona' type='number'/>
                                                                                    </Form.Group>
                                                                                    <Form.Group size="sm">
                                                                                        <Form.Label size="sm">Cantidad</Form.Label>
                                                                                        <Form.Control size="sm" id={`cantidadZona ${i} ${indexRechazo}`} className='zona' type='number'/>
                                                                                    </Form.Group>
                                                                                    <Form.Group size="sm">
                                                                                        <Button size="sm" name={`btnAddZona ${i} ${indexRechazo}`} onClick={this.addZona}>Add</Button>
                                                                                    </Form.Group>
                                                                                    <Table size="sm">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <td>Letra</td>
                                                                                                <td>Numero</td>
                                                                                                <td>Cantidad</td>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                this.state.vecOperarios[i].vecRechazo[indexRechazo].vecZonas.map((z,indexZona)=>{
                                                                                                    return <tr key={indexZona}>
                                                                                                        <td>{z.letra}</td>
                                                                                                        <td>{z.numero}</td>
                                                                                                        <td>{z.cantidad}</td>
                                                                                                    </tr>
                                                                                                })
                                                                                            }
                                                                                        </tbody>
                                                                                    </Table>
                                                                                </div>
                                                                            </div>
                                                                    })
                                                                    :
                                                                    <div></div>
                                                                }
                                                            </div>
                                                })
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>  {/* CONTENEDOR PARADAS DE MAQUINA  */}
                                        <div className='contenedorParadasMaquina'>
                                            <h2>Paradas de Maquina</h2>
                                            <div className='contenedorFormPardasMaquina'>
                                                <Autocomplete
                                                    ref={this.inputLabel}
                                                    onInputChange={(a,e,i)=>{console.log(e)}}
                                                    renderOption={option => (
                                                        <React.Fragment>
                                                            {option.idParadaMaquina} {option.nombreParadaMaquina}
                                                        </React.Fragment>
                                                    )}
                                                    id="combo-box-demo"
                                                    options={this.state.vecParadasMaquina}
                                                    getOptionLabel={option =>`${option.idParadaMaquina} ${option.nombreParadaMaquina}`}
                                                    style={{ width: 300 }}
                                                    renderInput={params => (
                                                        <TextField {...params} label="Paradas de Maquina" variant="outlined" fullWidth />
                                                    )}
                                                />
                                                <Form.Group style={{width:'80px',display:'inlineBlock'}}>
                                                    <Form.Label size='sm'>Desde</Form.Label>
                                                    <Form.Control type='time' size='sm'/>
                                                </Form.Group>
                                                <Form.Group style={{width:'80px'}}>
                                                    <Form.Label size='sm'>Hasta</Form.Label>
                                                    <Form.Control type='time' size='sm'/>
                                                </Form.Group>
                                                <Form.Group style={{width:'(80px'}}>
                                                    <Form.Label size='sm'></Form.Label>
                                                    <Button size='sm' style={{display:'block'}}>Cargar</Button>
                                                </Form.Group>
                                            </div>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Nombre</th>
                                                        <th>Desde</th>
                                                        <th>Hasta</th>
                                                        <th>Duracion</th>
                                                        <th>Tipo</th>
                                                        <th>Editar</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Grid>
                                </Grid>
                        </div>
                </Form>
            </Box>
        );
    }
}

export default AltaPlanillaPRODUCCION;