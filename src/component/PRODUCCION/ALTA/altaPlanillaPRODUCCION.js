import React from 'react'
import {Form,Col,Row,Button,Table} from 'react-bootstrap'
import './styleAltaPlanillaPRODUCCION.css'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles'
import {TextField} from '@material-ui/core';
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
            idTurno:undefined,
            HoraInicioProduccion:undefined,
            HoraFinProduccion:undefined,
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
    // cambioOperacion = e => {this.setState({idOperacion:e.target.value}) };
    addOperario = e =>{
        let Op = {
            idOperario:undefined,
            nombre:undefined,
            apellido:undefined,
            horaInicio:undefined,
            horaFin:undefined,
            produccion:undefined,
            calorias:undefined,
            vecRechazo:[]
        }
        let newVecOperarios = [...this.state.vecOperarios,Op]
        console.log(newVecOperarios[0])
        this.setState({vecOperarios:newVecOperarios})
    }
    addRechazo = e =>{
        let indexOperario = parseInt(e.target.name)
        let newRechazo = {
            idRechazo:undefined,
            nombreRechazo:undefined,
            tipo:undefined,
            cantidadRechazo:undefined,
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
            var idRechazo = document.getElementById(`idRechazo ${indexOperario} ${indexRechazo}`).value
            var nombreRechazo = document.getElementById(`nombreRechazo ${indexOperario} ${indexRechazo}`).value
            var tipoRechazo = document.getElementById(`tipoRechazo ${indexOperario} ${indexRechazo}`).value
            var cantidadRechazo = document.getElementById(`cantidadRechazo ${indexOperario} ${indexRechazo}`).value
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
                                document.getElementById(`cantidadRechazo ${indexOperario} ${indice}`).value = cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo
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
        if(nombre === 'HoraInicioProduccion'){this.setState({HoraInicioProduccion:value})}
        if(nombre === 'HoraFinProduccion'){this.setState({HoraFinProduccion:value})}
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
            if(nombre.split(' ')[0] === 'idOperario'){ vecOperariosCache[indexOperario].idOperario = value }
            if(nombre.split(' ')[0] === 'nombreOperario'){ vecOperariosCache[indexOperario].nombre = value }
            if(nombre.split(' ')[0] === 'hsInicioOperario'){ vecOperariosCache[indexOperario].horaInicio = value }
            if(nombre.split(' ')[0] === 'hsFinOperario'){ vecOperariosCache[indexOperario].horaFin = value }
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
    componentDidMount(){
        this.getOperaciones()
        this.getParadasMaquina()
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
            <div>
                <h1 id=''>PlanillaProduccion</h1>
                <Form>
                    <Row>
                        <div className={classes.root}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        style={{marginRight:'10px'}}
                                        required={true}
                                        size='small'
                                        variant='standard'
                                        margin="normal"
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
                                        required={true}
                                        size='small'
                                        variant="outlined"
                                        margin="normal"
                                        id="dtp_fechaFundicion"
                                        label="Fecha Fundicion"
                                        format="dd/MM/yyyy"
                                        value={this.state.fechaFundicion}
                                        onChange={this.capturaFechaFundicion}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                    </Row>
                    <Row>
                        <div className='contenedorFechas'>
                            <Form.Group size="sm" style={{width:'120px'}}>
                                <Form.Label size="sm">Turno</Form.Label>
                                <Form.Control size="sm" onChange={this.capturaDatos} name='idTurno'  as="select">
                                    <option value='1'>1 - Mañana</option>
                                    <option value='2'>2 - Tarde</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group size="sm" style={{width:'100px'}}>
                                <Form.Label size="sm">Hora Inicio</Form.Label>
                                <Form.Control size="sm" name='HoraInicioProduccion' type="time" onChange={this.capturaDatos}/>
                            </Form.Group>
                            <Form.Group size="sm" style={{width:'100px'}}>
                                <Form.Label size="sm">Hora Fin</Form.Label>
                                <Form.Control size="sm" name='HoraFinProduccion' onChange={this.capturaDatos} type="time" />
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <div className='contenedorFechas'>
                        <FormControl className={classes.formControl} style={{width:'140px'}}>
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
                                        this.state.vecOperaciones.map((ope,indiceOperacion)=>{
                                            return <MenuItem key={indiceOperacion} value={ope.idOperacion}>{ope.nombreOperacion}</MenuItem>
                                        })
                                    }
                                    </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} style={{width:'140px'}}>
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
                                        this.state.vecMaquinas.map((maq,indiceMaquina)=>{
                                            return <MenuItem key={indiceMaquina} value={maq.idMaquina}>{maq.nombreMaquina}</MenuItem>
                                        })
                                    }
                                    </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} style={{width:'140px'}}>
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
                                        this.state.vecPiezas.map((pie,indicePieza)=>{
                                            return <MenuItem key={indicePieza} value={pie.idPieza}>{pie.nombrePieza}</MenuItem>
                                        })
                                    }
                                    </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} style={{width:'140px'}}>
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
                        </div>
                    </Row>
                    <Row>
                        <div className='contenedorOperarios'>
                            <Form.Group size="sm">
                                <Form.Label size="sm">Operarios</Form.Label>
                                <div style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px'}}>
                                    <Button variant="primary" size="lg" block onClick={this.addOperario}>
                                        Agregar
                                    </Button>
                                    {
                                        this.state.vecOperarios.map((o,i)=>{  // ! RECORRE VEC OPERARIOS
                                            return <div key={i} style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px',marginTop:'10px'}}>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group size="sm">
                                                                    <Form.Label size="sm">Legajo</Form.Label>
                                                                    <Form.Control size="sm" name={`idOperario ${i}`} onChange={this.capturaDatos}  type='number'/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group size="sm">
                                                                    <Form.Label size="sm">Nombre</Form.Label>
                                                                    <Form.Control size="sm" name={`nombreOperario ${i}`} onChange={this.capturaDatos}  as="select">
                                                                        <option>Gracia Carlos</option>
                                                                        <option>Irusta</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group size="sm" style={{width:'100px'}}>
                                                                    <Form.Label size="sm">Hora Inicio</Form.Label>
                                                                    <Form.Control size="sm" name={`hsInicioOperario ${i}`} onChange={this.capturaDatos}  type="time" style={{textAlign:'center'}}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group size="sm" style={{width:'100px'}}>
                                                                    <Form.Label size="sm">Hora Fin</Form.Label>
                                                                    <Form.Control size="sm" name={`hsFinOperario ${i}`} onChange={this.capturaDatos}  type="time" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group size="sm" style={{width:'100px'}}>
                                                                    <Form.Label size="sm">Produccion</Form.Label>
                                                                    <Form.Control size="sm" name={`produccionOperario ${i}`} onChange={this.capturaDatos} type="number" style={{textAlign:'center'}}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group size="sm" style={{width:'100px'}}>
                                                                    <Form.Label size="sm">Calorias</Form.Label>
                                                                    <Form.Control size="sm" name={`caloriasOperario ${i}`} onChange={this.capturaDatos} type="number" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group size="sm">
                                                                    <Form.Label size="sm">Add Rechazos</Form.Label>
                                                                    <Button size="sm" name={i} onClick={this.addRechazo}>
                                                                        Add rechazos
                                                                    </Button>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        { // RECORRE VECTO RECHAZOS
                                                            this.state.vecOperarios[i].vecRechazo ?
                                                            this.state.vecOperarios[i].vecRechazo.map((rech,indexRechazo)=>{
                                                                return <div id={`contenedorRechazosYzonas ${i} ${indexRechazo}`} key={`${i}${indexRechazo}`} className='contenedorRechazosYzonas'>
                                                                        <div className='contenedorRechazos'>
                                                                            <Form.Group size="sm" style={{width:'60px'}}>
                                                                                <Form.Label size="sm">Id rech</Form.Label>
                                                                                <Form.Control
                                                                                    defaultValue={rech.idRechazo}
                                                                                    id={`idRechazo ${i} ${indexRechazo}`}
                                                                                    size="sm"
                                                                                    name={`idRechazo ${i} ${indexRechazo}`}
                                                                                    type='number'
                                                                                    onChange = {this.capturaDatos}
                                                                                    onBlur={this.verificaRechazoCoincidente}
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group size="sm">
                                                                                <Form.Label size="sm">Defecto</Form.Label>
                                                                                <Form.Control
                                                                                    defaultValue={rech.nombreRechazo}
                                                                                    id={`nombreRechazo ${i} ${indexRechazo}`}
                                                                                    size="sm"
                                                                                    name={`nombreRechazo ${i} ${indexRechazo}`}
                                                                                    as='select'
                                                                                    onChange = {this.capturaDatos}
                                                                                    onBlur={this.verificaRechazoCoincidente}
                                                                                >
                                                                                    <option>{undefined}</option>
                                                                                    <option>Rechupe</option>
                                                                                    <option>Fizura</option>
                                                                                </Form.Control>
                                                                            </Form.Group>
                                                                            <Form.Group size="sm">
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
                                                                            </Form.Group>
                                                                            <Form.Group size="sm">
                                                                                <Form.Label size="sm">Cantidad</Form.Label>
                                                                                <Form.Control
                                                                                    defaultValue={rech.cantidadRechazo}
                                                                                    id={`cantidadRechazo ${i} ${indexRechazo}`}
                                                                                    size="sm"
                                                                                    name={`cantidadRechazo ${i} ${indexRechazo}`}
                                                                                    type='number'
                                                                                    onChange = {this.capturaDatos}
                                                                                    onBlur={this.verificaRechazoCoincidente}
                                                                                    style={{width:'65px'}}
                                                                                />
                                                                            </Form.Group>
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
                            </Form.Group>
                        </div>
                    </Row>
                     <Row>  {/* CONTENEDOR PARADAS DE MAQUINA  */}
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
                    </Row>
                </Form>
            </div>
        );
    }
}

export default AltaPlanillaPRODUCCION;