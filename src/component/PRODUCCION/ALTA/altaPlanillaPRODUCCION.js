import React from 'react'
import {Form,Button,Table,} from 'react-bootstrap'
import './styleAltaPlanillaPRODUCCION.css'
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles'
import {TextField,Box} from '@material-ui/core'
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import ButtonN from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Alert from '@material-ui/lab/Alert'
// import IconButton from '@material-ui/core/IconButton'
// import DeleteIcon from '@material-ui/icons/Delete'
import ModalPM from './MODALPARADASDEMAQUINA/modalPARADASDEMAQUINA'
import { withSnackbar } from 'notistack'

class AltaPlanillaPRODUCCION extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
            fechaProduccion:null,
            fechaFundicion:null,
            HoraInicioProduccion:'',
            HoraFinProduccion:'',
            idOperacion:'',
            idMaquina:'',
            idPieza:'',
            idMolde:'',
            idTipoProceso:'',
            vecOperarios:[],
            vecOperaciones:[],
            vecMaquinas:[],
            vecPiezas:[],
            vecMoldes:[],
            vecTiposProceso:[],
            vecParadasMaquina:undefined,
            vecTurnos:undefined,
            vecDefectos:undefined,
            vecTipoRechazo:[{idTipoRechazo:false,nombreTipoRechazo:'Rechazo'},{idTipoRechazo:true,nombreTipoRechazo:'Scrap'}],
            vecOperariosCombo:undefined,
            campoParadaMaquina:'',
            campoDesdeParadaMaquina:'',
            campoHastaParadaMaquina:'',
            vecParadasMaquinaSeleccionada:[],
            showAlert:'none',
            mensajeAlertZona:'',
            campoIdParaMaquina:'',
            campoNombreParadaMaquina:'',
            showModalPM:false
        }
        this.inputLabel = React.createRef()
        this.cbx_paradasMaquina = React.createRef()
        this.cbx_operacion = React.createRef()
        this.cbx_maquina = React.createRef()
        this.cbx_pieza = React.createRef()
        this.cbx_molde = React.createRef()
        this.alertPM = React.createRef()
        this.autoCompletePM =React.createRef()
        this.txt_campoIdParadaMaquina = React.createRef()
        this.controller = new AbortController()
    }
    capturaParaMaquina = e =>{
        const {HoraInicioProduccion, HoraFinProduccion,vecParadasMaquinaSeleccionada , campoIdParaMaquina,campoNombreParadaMaquina, campoDesdeParadaMaquina, campoHastaParadaMaquina,vecParadasMaquina} = this.state
        var val = true
        var ul = document.createElement('ul')
        var paradaDeMaquinaSeleccionada
        var direrenciaEnMinutos = (horaInicio,horaFin) => {
            var hDesde = new Date(`1995-12-17T03:${horaInicio}`)
            var hHasta = new Date(`1995-12-17T03:${horaFin}`)
            if(horaInicio === '06:00' && horaFin === '06:00'){  return 24 * 60  }
            else if((hHasta-hDesde)/1000 < 0){ return (hHasta-hDesde)/1000 + 1440 }
            else{ return (hHasta-hDesde)/1000 }
        }
        var minTotalesPM = 0
        if( HoraInicioProduccion === '' || HoraFinProduccion === ''){
            var li8 = document.createElement('li')
            li8.innerHTML = 'Ingrese primero la hora de inicio y produccion antes'
            ul.append(li8)
            val=false
        }
        else{
            vecParadasMaquinaSeleccionada.forEach(pmSelect =>{
                minTotalesPM +=  parseInt(pmSelect.duracionParadaMaquina)
            })
            minTotalesPM += direrenciaEnMinutos(campoDesdeParadaMaquina,campoHastaParadaMaquina)
            if(minTotalesPM >  direrenciaEnMinutos(HoraInicioProduccion, HoraFinProduccion) ){
                var li0 = document.createElement('li')
                li0.innerHTML = 'El tiempo de parada de maquina exede al tiempo de produccion'
                ul.append(li0)
                val=false
            }
        }
        if(campoDesdeParadaMaquina === ''){
            var li2 = document.createElement('li')
            li2.innerHTML = 'Seleccione la Hora Desde'
            ul.append(li2)
            val=false
        }
        if(campoHastaParadaMaquina === ''){
            var li3 = document.createElement('li')
            li3.innerHTML = 'Seleccione la Hora Hasta'
            ul.append(li3)
            val=false
        }
        try{
            paradaDeMaquinaSeleccionada = {
                idParadaMaquina:campoIdParaMaquina,
                nombreParadaMaquina:campoNombreParadaMaquina,
                desdeParadaMaquina:campoDesdeParadaMaquina,
                hastaParadaMaquina:campoHastaParadaMaquina,
                duracionParadaMaquina:direrenciaEnMinutos(campoDesdeParadaMaquina,campoHastaParadaMaquina),
                tipoParadaMaquina:vecParadasMaquina.find(pm=>pm.idParadaMaquina === parseInt(campoIdParaMaquina)).tipoParadaMaquina
            }
        }catch(e){
            var li4 = document.createElement('li')
            li4.innerHTML = 'Parada de maquina inexistente'
            ul.append(li4)
            val=false
        }
        if(val){
            this.setState({vecParadasMaquinaSeleccionada:[...this.state.vecParadasMaquinaSeleccionada,paradaDeMaquinaSeleccionada],campoDesdeParadaMaquina:'',campoHastaParadaMaquina:'',campoIdParaMaquina:'',campoNombreParadaMaquina:''})
            document.getElementById('txt_idParadaMquina').focus()
        }
        else{
            setTimeout(()=>{
                this.alertPM.current.removeChild(ul)
                this.setState({showAlert:'none'})
            },3000)
            this.alertPM.current.append(ul)
            this.setState({showAlert:'block'})
        }
    }
    handleDateChange = date => { this.setState({fechaProduccion:date})}
    capturaFechaFundicion = date => { this.setState({fechaFundicion:date})}
    getHoraInicioProduccion = e =>{this.setState({HoraInicioProduccion:e.target.value})}
    getHoraFinProduccion = e =>{this.setState({HoraFinProduccion:e.target.value})}
    getHoraInicioOperario = e =>{
        var vecOperariosTemp = this.state.vecOperarios
        var indexOperario = e.target.name.split(' ')[1]
        if(e.target.value !== '06:00' && vecOperariosTemp[indexOperario].horaFin !== '06:00' && e.target.value === vecOperariosTemp[indexOperario].horaFin){
            vecOperariosTemp[indexOperario].horaInicio = ''
        }
        else{
            vecOperariosTemp[indexOperario].horaInicio = e.target.value
        }
        this.setState({vecOperarios:vecOperariosTemp})
    }
    getHoraFinOperario = e =>{
        var vecOperariosTemp = this.state.vecOperarios
        var indexOperario = e.target.name.split(' ')[1]
        if(e.target.value !== '06:00' && vecOperariosTemp[indexOperario].horaInicio !== '06:00' && e.target.value === vecOperariosTemp[indexOperario].horaInicio){
            vecOperariosTemp[indexOperario].horaFin = ''
        }
        else{
            vecOperariosTemp[indexOperario].horaFin = e.target.value
        }
        this.setState({vecOperarios:vecOperariosTemp})
    }
    addOperario = e =>{
        let Op = {
            idOperario:'',
            nombre:'',
            apellido:'',
            idTurno:'',
            horaInicio:'',
            horaFin:'',
            produccion:'',
            calorias:'',
            vecRechazo:[]
        }
        if(Array.isArray(this.state.vecTurnos)){
            if(this.state.vecTurnos.length === 0 ){
                this.getTurnos()
            }
        }
        if(Array.isArray(this.state.vecOperariosCombo)){
            if(this.state.vecOperariosCombo.length === 0 ){
                this.getTrabajadores()
            }
        }
        let newVecOperarios = [...this.state.vecOperarios,Op]
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
        let indexOperario = parseInt(e.target.name.split(' ')[1])
        let indexRechazo = parseInt(e.target.name.split(' ')[2])
        var txt_letra = document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`)
        var txt_numero = document.getElementById(`numeroZona ${indexOperario} ${indexRechazo}`)
        var txt_cantidad = document.getElementById(`cantidadZona ${indexOperario} ${indexRechazo}`)
        var alertZona = document.getElementById(`alert ${indexOperario} ${indexRechazo}`)
        var regexLETRA = new RegExp('[A-Z]','i')
        if(txt_letra.value.length === 0 || txt_letra.value.length >1 || !regexLETRA.test(txt_letra.value)){
            setTimeout(()=>{ this.setState({mensajeAlertZona:''}); alertZona.setAttribute('style','display:none') },3000)
            this.setState({mensajeAlertZona:'Recuerde que es una sola LETRA'})
            alertZona.setAttribute('style','display:block')
            txt_letra.focus()
            txt_letra.select()
            return
        }
        var nu
        try{ nu = parseInt(txt_numero.value) } catch(e){ }
        if(txt_numero.value.length === 0 || nu <= 0 || txt_numero.value.length > 2 || isNaN(txt_numero.value) || isNaN(parseInt(txt_numero.value)) ){
            setTimeout(()=>{ this.setState({mensajeAlertZona:''});  alertZona.setAttribute('style','display:none') },3000)
            this.setState({mensajeAlertZona:'El numero no cumple con las condiciones necesarias'})
            alertZona.setAttribute('style','display:block')
            txt_numero.focus()
            txt_numero.select()
            return
        }
        var ca
        try{ ca = parseInt(txt_cantidad.value) } catch(e){ }
        if(txt_cantidad.value.length === 0 || ca<= 0 || txt_cantidad.value.length > 4 || isNaN(txt_cantidad.value) || isNaN(parseInt(txt_cantidad.value)) ){
            setTimeout(()=>{ this.setState({mensajeAlertZona:''}); alertZona.setAttribute('style','display:none') },3000)
            this.setState({mensajeAlertZona:'La cantidad no cumple con las condiciones'})
            alertZona.setAttribute('style','display:block')
            txt_cantidad.focus()
            txt_cantidad.select()
            return
        }
        var letra,numero,cantidad;
        var cacheVecOperario = this.state.vecOperarios
        try{
            letra = String(txt_letra.value).toLocaleUpperCase();
            numero = txt_numero.value
            cantidad = txt_cantidad.value
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
            document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`).focus()
            document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`).value = ''
            document.getElementById(`numeroZona ${indexOperario} ${indexRechazo}`).value = ''
            document.getElementById(`cantidadZona ${indexOperario} ${indexRechazo}`).value = ''
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
                                // console.log(cacheVecOp[indexOperario].vecRechazo[indice].cantidadRechazo,'cantidad original ',cantidadRechazo, ' cantidad a sumar')
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
        if(nombre === 'idTipoProceso'){
            this.setState({idTipoProceso:value})
        }
        if(nombre === 'idOperacion'){
            this.setState({idOperacion:value})
            this.getMaquinasXoperacion(value)
            this.setState({idMaquina:'',idPieza:'',idMolde:'',idTipoProceso:'',vecTiposProceso:[]})
        }
        if(nombre === 'idMaquina'){
            this.setState({idMaquina:value})
            this.getPiezasXmaquina(value)
            this.setState({idPieza:'',idMolde:'',idTipoProceso:'',vecTiposProceso:[]})
        }
        if(nombre === 'idPieza'){
            this.setState({idPieza:value,idTipoProceso:'',vecTiposProceso:[]})
            this.getMoldesXpieza(value)
            this.getTipoProcesoXpiezaMaquina(value,this.state.idMaquina)
        }
        if(nombre === 'idMolde'){this.setState({idMolde:value})}
        var indexOperario
        if(nombre.split(' ')[1]){indexOperario = parseInt(nombre.split(' ')[1])}
        var indexRechazo
        if(nombre.split(' ')[2]){indexRechazo = parseInt(nombre.split(' ')[2]) }
        var vecOperariosCache = this.state.vecOperarios
        try{
            if(nombre.split(' ')[0] === 'idOperario'){
                if(String (value).length !== 0 &&  this.state.vecOperariosCombo.find(o => o.idTrabajador === parseInt(value)) === undefined  ){
                    vecOperariosCache[indexOperario].idOperario = ''
                    vecOperariosCache[indexOperario].nombre = ''
                }
                else{
                    vecOperariosCache[indexOperario].idOperario = value
                    vecOperariosCache[indexOperario].nombre = value
                }
            }
            if(nombre.split(' ')[0] === 'idTurno'){ 
                var turno
                if( Array.isArray (this.state.vecTurnos) ){
                turno = this.state.vecTurnos.find( t =>  t.idTurno === parseInt(value) )
                }
                if(turno.hsInicioTurno){
                    vecOperariosCache[indexOperario].horaInicio = String(turno.hsInicioTurno).substring(11,16)
                    vecOperariosCache[indexOperario].horaFin =  String(turno.hsFinTurno).substring(11,16)
                    vecOperariosCache[indexOperario].idTurno=value
                }
            }
            if(nombre.split(' ')[0] === 'nombreOperario'){ vecOperariosCache[indexOperario].nombre = value; vecOperariosCache[indexOperario].idOperario = parseInt(value) }
            if(nombre.split(' ')[0] === 'produccionOperario'){ vecOperariosCache[indexOperario].produccion = value }
            if(nombre.split(' ')[0] === 'caloriasOperario'){
                if(value > 12){
                    vecOperariosCache[indexOperario].calorias = ''
                }
                else{
                    vecOperariosCache[indexOperario].calorias = value
                }
            }
            if(nombre.split(' ')[0] === 'idRechazo'){
                if(String (value).length !== 0 &&  this.state.vecDefectos.find(d => d.idDefecto === parseInt(value)) === undefined  ){
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].idRechazo = ''
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].nombreRechazo = ''
                }
                else{
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].idRechazo = value
                    vecOperariosCache[indexOperario].vecRechazo[indexRechazo].nombreRechazo = value
                }
            }
            if(nombre.split(' ')[0] === 'nombreRechazo'){
                vecOperariosCache[indexOperario].vecRechazo[indexRechazo].nombreRechazo = value
                vecOperariosCache[indexOperario].vecRechazo[indexRechazo].idRechazo=value
            }
            if(nombre.split(' ')[0] === 'tipoRechazo'){
                vecOperariosCache[indexOperario].vecRechazo[indexRechazo].tipo = value
                var div = document.getElementById(`contenedorRechazosYzonas ${parseInt(nombre.split(' ')[1])} ${parseInt(nombre.split(' ')[2])}`)
                if(value === 'Scrap'){div.setAttribute('style','border: solid red 1px') }
                else if( value === 'Rechazo'){ div.setAttribute('style','border: solid yelow 1px') }
                else{ div.setAttribute('style','border: none') }
            }
            if(nombre.split(' ')[0] === 'cantidadRechazo'){vecOperariosCache[indexOperario].vecRechazo[indexRechazo].cantidadRechazo = value}
            this.setState({vecOperarios:vecOperariosCache})
        }
        catch(e){console.log(e)}
    }
    getOperaciones = () =>{
        fetch('https://ems-node-api.herokuapp.com/api/operaciones',{signal:this.controller.signal},{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{ return this.setState({vecOperaciones:json,idOperacion:''})  })
        .catch(e=>{
            if(e.name === 'AbortError') return
            throw Error
        })
    }
    getMaquinasXoperacion = idOperacion =>{
        fetch(`https://ems-node-api.herokuapp.com/api/maquinas/xoperacion/${idOperacion}`,{signal:this.controller.signal},{
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
        .catch(e=>{  })
    }
    getPiezasXmaquina = idMaquina =>{
        fetch(`https://ems-node-api.herokuapp.com/api/piezas/xmaquina/${idMaquina}`,{signal:this.controller.signal},{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{ return dato.json() })
        .then(json=>{ return this.setState({vecPiezas:json,vecMoldes:[],idMolde:'',idPieza:''}) })
        .catch(e=>{  })
    }
    getMoldesXpieza = idPieza =>{
        fetch(`https://ems-node-api.herokuapp.com/api/moldes/xpieza/${idPieza}`,{signal:this.controller.signal},{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{ return dato.json() })
        .then(json=>{ return this.setState({vecMoldes:json,idMolde:''}) })
        .catch(e=>{  })
    }
    getParadasMaquina = () =>{
        fetch('https://ems-node-api.herokuapp.com/api/paradasMaquina',{signal:this.controller.signal},{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{
            this.setState({vecParadasMaquina:json})
            try{  return this.cbx_paradasMaquina.current.value = undefined }
            catch(e){}
        })
        .catch(e=>{  })
    }
    getTurnos = () =>{
        fetch(`https://ems-node-api.herokuapp.com/api/turnos`,{signal:this.controller.signal},{
            method:'GET',
            headers: new Headers({
                'Accept': 'Applitaction/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{ this.setState({vecTurnos:json,idTurno:''}) })
        .catch(e=>{ this.setState({vecTurnos:[],idTurno:''}) })
    }
    getDefectos = () =>{
        fetch('https://ems-node-api.herokuapp.com/api/defectos',{signal:this.controller.signal},{
            method: 'GET',
            headers: new Headers({
                'Accept':'Application/json',
                'Content-Type': 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{this.setState({vecDefectos:json})})
        .catch(e=>{    })
    }
    getTrabajadores = () =>{
        fetch('https://ems-node-api.herokuapp.com/api/trabajadores',{signal:this.controller.signal},{
            method:'GET',
            headers: new Headers({
                'Accept' : 'Application/json',
                'Content-Type' : 'Application/json'
            })
        })
        .then(dato=>{return dato.json()})
        .then(json=>{this.setState({vecOperariosCombo:json})})
        .catch(err=>{ this.setState({vecOperariosCombo:[]}) })
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
        margin: {
            margin: theme.spacing(1),
        }
    }))
    eventClose = e => {
        var nomParadaMaquina
        try{
            nomParadaMaquina = this.state.vecParadasMaquina.find(pm=>pm.idParadaMaquina===parseInt(e)).nombreParadaMaquina
        }
        catch(e){
            nomParadaMaquina = ''
        }
        var campoPM
        if(e === undefined){
            campoPM=''
        }
        else{
            campoPM = parseInt(e)
        }
        if(nomParadaMaquina === '' || campoPM === ''){
            this.setState({showModalPM:false})
        }
        else{
            this.setState({showModalPM:false,campoIdParaMaquina:campoPM,campoNombreParadaMaquina:nomParadaMaquina})
        }
    }
    miSubmit = e =>{
        const  { fechaProduccion , fechaFundicion  , HoraInicioProduccion , HoraFinProduccion , idOperacion , idMaquina , idPieza, idMolde, idTipoProceso , vecOperarios  , vecParadasMaquinaSeleccionada } = this.state
        var  dato = {
            fechaProduccion,
            fechaFundicion ,
            HoraInicioProduccion,
            HoraFinProduccion,
            idOperacion, idMaquina,
            idPieza,  idMolde, idTipoProceso,
            vecOperarios,
            vecParadasMaquinaSeleccionada
        }
        const validacion = () => {
            var dtp_fechaProduccion = document.getElementById('dtp_fechaProduccion')
            if(fechaProduccion === null){
                this.props.enqueueSnackbar('Ingrese la fecha de Procesado ', { variant: 'error',preventDuplicate: true})
                dtp_fechaProduccion.focus()
                dtp_fechaProduccion.select()
                return false
            }
            if(fechaFundicion === null){
                this.props.enqueueSnackbar('Ingrese la fecha de Fundicion ', { variant: 'error',preventDuplicate: true})
                var dtp_fechaFundicion = document.getElementById('dtp_fechaFundicion')
                dtp_fechaFundicion.focus()
                dtp_fechaFundicion.select()
                return false
            }
            if(HoraInicioProduccion === ''){
                this.props.enqueueSnackbar('Ingrese la hora de inicio de produccion ', { variant: 'error',preventDuplicate: true})
                var dtp_horaInicioProduccion = document.getElementById('idHoraIniciuoProduccion')
                dtp_horaInicioProduccion.focus()
                dtp_horaInicioProduccion.select()
                return false
            }
            if(HoraFinProduccion === ''){
                this.props.enqueueSnackbar('Ingrese la hora de fin de produccion ', { variant: 'error',preventDuplicate: true})
                var dtp_horaFinProduccion = document.getElementById('idHoraFinProduccion')
                dtp_horaFinProduccion.focus()
                dtp_horaFinProduccion.select()
                return false
            }
            const comparaIgualdadFechas = ( fechaUno, FechaDos ) => {
                var fe_uno = `${fechaUno.getDate()}${fechaUno.getMonth()+1}${fechaUno.getFullYear()}`
                var fe_dos = `${FechaDos.getDate()}${FechaDos.getMonth()+1}${FechaDos.getFullYear()}`
                if(fe_uno === fe_dos) { return true} else { return false}
            }
            if(!comparaIgualdadFechas(fechaProduccion, fechaFundicion )){
                if((fechaProduccion - fechaFundicion) < 0 ){
                    this.props.enqueueSnackbar('Verifique que la fecha de Produccion sea Posterior o igual a la de fundicion', { variant: 'error'})
                    dtp_fechaProduccion.focus()
                    dtp_fechaProduccion.select()
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })
                    // dtp_fechaProduccion.scrollLeft = 0
                    return false
                }
            }
            else  if(HoraInicioProduccion !== '06:00' && HoraFinProduccion !== ' 06:00' && HoraInicioProduccion === HoraFinProduccion) {
                var dtp_idHoraIniciuoProduccion = document.getElementById('idHoraIniciuoProduccion')
                dtp_idHoraIniciuoProduccion.focus()
                dtp_idHoraIniciuoProduccion.select()
                this.props.enqueueSnackbar('No puede tener horas de inicio y fin  iguales', { variant: 'error'})
                return false
            }
            if(idOperacion === '' ){
                this.props.enqueueSnackbar('Seleccione una operacion  ', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idMaquina === '' ){
                this.props.enqueueSnackbar('Selecciones una maquina', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idPieza === '' ){
                this.props.enqueueSnackbar('Seleccione una pieza ', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idMolde === '' ){
                this.props.enqueueSnackbar('Seleccione un molde ', { variant: 'error',preventDuplicate: true})
                return false
            }
            if(idTipoProceso === '' ){
                this.props.enqueueSnackbar('Seleccione el tipo de  proceso ', { variant: 'error',preventDuplicate: true})
                return false
            }
            else if (vecOperarios.length <= 0) {
                this.props.enqueueSnackbar('Debe ingresar al menos un operario', { variant: 'error'})
                return false
            }
            var vecOP = true
            vecOperarios.forEach((o,indexOperario)=>{
                if(vecOP === false) { return true}
                var cantRechazo = 0
                if(o.idOperario === ''){
                    var cbx_idOperario = document.getElementById(`idOperario ${indexOperario}`)
                    cbx_idOperario.focus()
                    cbx_idOperario.click()
                    this.props.enqueueSnackbar('Ingrese algun Operario  ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.idTurno === ''){
                    var cbx_idTurno = document.getElementById(`idTurno ${indexOperario}`)
                    cbx_idTurno.focus()
                    cbx_idTurno.click()
                    this.props.enqueueSnackbar('Seleccione el turno ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.horaInicio === ''){
                    var txt_horaInicio = document.getElementById(`hsInicioOperario ${indexOperario}`)
                    txt_horaInicio.focus()
                    txt_horaInicio.click()
                    this.props.enqueueSnackbar('Seleccione la hora de Inicio ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.horaFin === ''){
                    var txt_horaFin = document.getElementById(`hsFinOperario ${indexOperario}`)
                    txt_horaFin.focus()
                    txt_horaFin.click()
                    this.props.enqueueSnackbar('Seleccione la hora de Fin ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.produccion === ''){
                    var txt_produccionOperario = document.getElementById(`txt_produccionOperario ${indexOperario}`)
                    txt_produccionOperario.focus()
                    txt_produccionOperario.click()
                    this.props.enqueueSnackbar('Ingrese la cantidad Producida ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                if(o.calorias === ''){
                    var txt_caloriasOperario = document.getElementById(`txt_caloriasOperario ${indexOperario}`)
                    txt_caloriasOperario.focus()
                    txt_caloriasOperario.click()
                    this.props.enqueueSnackbar('Ingrese la calorias ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
                var vecRE = true
                if(o.vecRechazo.length>0){
                    o.vecRechazo.forEach((r,indexRechazo)=>{
                        if(vecRE === false) {return}
                        if(r.idRechazo === ''){
                            var txt_idRechazo = document.getElementById(`idRechazo ${indexOperario} ${indexRechazo}`)
                            txt_idRechazo.focus()
                            this.props.enqueueSnackbar('Selecione algun Rechazo ', { variant: 'error',preventDuplicate: true})
                            vecOP=false
                            vecRE = false
                            return false
                        }
                        if(r.tipo === ''){
                            var cbx_tipoRechazo = document.getElementById(`tipoRechazo ${indexOperario} ${indexRechazo}`)
                            cbx_tipoRechazo.focus()
                            this.props.enqueueSnackbar('Selecione el tipo de rachazo ', { variant: 'error',preventDuplicate: true})
                            vecOP=false
                            vecRE = false
                            return false
                        }
                        if(r.cantidadRechazo === ''){
                            var txt_cantidadRechazo = document.getElementById(`cantidadRechazo ${indexOperario} ${indexRechazo}`)
                            txt_cantidadRechazo.focus()
                            this.props.enqueueSnackbar('Ingrese la cantidad de rechazos ', { variant: 'error',preventDuplicate: true})
                            vecOP=false
                            vecRE = false
                            return false
                        }
                        cantRechazo += parseInt(r.cantidadRechazo)
                        if(r.vecZonas.length === 0){
                            var letraZona = document.getElementById(`letraZona ${indexOperario} ${indexRechazo}`)
                            letraZona.focus()
                            letraZona.select()
                            this.props.enqueueSnackbar('Verifique que todos los rechazos tengan al menos una zona cargada ', { variant: 'error',preventDuplicate: true})
                            vecOP = false
                            vecRE = false
                            return false
                        }
                    })
                    if(vecRE === false) {return false}
                }
                if(cantRechazo > parseInt(o.produccion)){
                    this.props.enqueueSnackbar('Revise los rechazos porque hay mas que la cantidad producida ', { variant: 'error',preventDuplicate: true})
                    vecOP = false
                    return false
                }
            })
            if(vecOP === false) { return }
            fetch('https://ems-node-api.herokuapp.com/api/planillasProduccion',{
                // fetch('http://localhost:5000/api/planillasProduccion',{
                    method: 'POST',
                    body: JSON.stringify(dato),
                    headers:  new Headers ({
                        'Accept': 'Application/json',
                        'Content-Type': 'Application/json'
                    })
                })
                .then(dato => { return dato.json() })
                .then(json =>{
                    this.props.enqueueSnackbar(`${json.mensaje}`,
                    {
                        variant: 'success',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                    this.setState({
                        fechaProduccion:null,
                        fechaFundicion:null,
                        HoraInicioProduccion:'',
                        HoraFinProduccion:'',
                        idOperacion:'',
                        idMaquina:'',
                        idPieza:'',
                        idMolde:'',
                        idTipoProceso:'',
                        vecOperarios:[],
                        vecMaquinas:[],
                        vecPiezas:[],
                        vecMoldes:[],
                        vecTiposProceso:[],
                        campoParadaMaquina:'',
                        campoDesdeParadaMaquina:'',
                        campoHastaParadaMaquina:'',
                        vecParadasMaquinaSeleccionada:[],
                        campoIdParaMaquina:'',
                        campoNombreParadaMaquina:''
                    })
                    console.log(json)
                })
                .catch(e => {
                    this.props.enqueueSnackbar(`${e.mensaje}`,
                    {
                        variant: 'error',
                        preventDuplicate: true,
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        }
                    })
                })
        }
        validacion()
        e.preventDefault()
    }
    getTipoProcesoXpiezaMaquina( idPieza , idMaquina ){
        const dato = {
            idPieza,
            idMaquina
        }
        fetch(`https://ems-node-api.herokuapp.com/api/tiposProceso`, {
            method: 'POST',
            body: JSON.stringify(dato),
            headers: {
                'Accept' : 'Application/json',
                'Content-Type' : 'Application/json'
            }
        })
        .then(dato=>{return dato.json()})
        .then(json => { this.setState( { vecTiposProceso:json } ) } )
        .catch(e=>{ })
    }
    componentDidMount(){
        this.getOperaciones()
        this.getParadasMaquina()
        this.getTurnos()
        this.getDefectos()
        this.getTrabajadores()
    }
    componentWillUnmount(){
        this.controller.abort()
    }
    render() {
        const classes = this.useStyles
        return (
            <Box  boxShadow={1}  bgcolor="background.default"  m={0} p={3}>
                <Form onSubmit={this.miSubmit}>
                        <div className={classes.root}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}> {/* INICIO CONTENEDOR FECHAS PRODUCCION Y FUNDICION */}
                                        <h2 style={{marginTop:'10px'}}>PlanillaProduccion</h2>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'180px'}}
                                                size='small'
                                                variant='standard'
                                                margin="none"
                                                id="dtp_fechaProduccion"
                                                label="Fecha Procesado"
                                                format="dd/MM/yyyy"
                                                value={this.state.fechaProduccion}
                                                onChange={this.handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardDatePicker
                                                style={{marginRight:'10px',width:'180px'}}
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
                                        <TextField
                                            style={{width:'100px',marginRight:'10px'}}
                                            id="idHoraIniciuoProduccion"
                                            label="Desde"
                                            name='hsInicioOperario'
                                            type="time"
                                            onChange={this.getHoraInicioProduccion}
                                            value ={this.state.HoraInicioProduccion}
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
                                        <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
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
                                                Array.isArray( this.state.vecOperaciones )?
                                                    this.state.vecOperaciones.map((ope,indiceOperacion)=>{
                                                    return <MenuItem  key={indiceOperacion} value={ope.idOperacion}>{ope.nombreOperacion}</MenuItem>
                                                    })
                                                    :
                                                    <MenuItem></MenuItem>
                                            }
                                            </Select>
                                        </FormControl>
                                        <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
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
                                                Array.isArray(  this.state.vecMaquinas )?
                                                this.state.vecMaquinas.map((maq,indiceMaquina)=>{
                                                    return <MenuItem key={indiceMaquina} value={maq.idMaquina}>{maq.nombreMaquina}</MenuItem>
                                                })
                                                :
                                                <MenuItem></MenuItem>
                                            }
                                            </Select>
                                        </FormControl>
                                        <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
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
                                                Array.isArray(  this.state.vecPiezas )?
                                                this.state.vecPiezas.map((pie,indicePieza)=>{
                                                    return <MenuItem key={indicePieza} value={pie.idPieza}>{pie.nombrePieza}</MenuItem>
                                                })
                                                :
                                                <MenuItem></MenuItem>
                                            }
                                            </Select>
                                        </FormControl>
                                        <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
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
                                                    Array.isArray(  this.state.vecMoldes )?
                                                    this.state.vecMoldes.map((mol,indiceMolde)=>{
                                                        return <MenuItem key={indiceMolde} value={mol.idMolde}>{mol.nombreMolde}</MenuItem>
                                                    })
                                                    :
                                                    <MenuItem></MenuItem>
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl  className={classes.formControl} style={{width:'140px',marginRight:'10px'}}>
                                            <InputLabel id="idTipoProceso">Tipo Proceso</InputLabel>
                                            <Select
                                                ref={this.cbx_tipoProceso}
                                                labelId="idTipoProceso"
                                                id="cbx_molde"
                                                value={this.state.idTipoProceso}
                                                name='idTipoProceso'
                                                onChange={this.capturaDatos}
                                            >
                                                {
                                                    Array.isArray(  this.state.vecTiposProceso )?
                                                    this.state.vecTiposProceso.map((tpro,indiceTipoProceso)=>{
                                                        return <MenuItem key={indiceTipoProceso} value={tpro.idTipoProceso}>{tpro.nombreTipoProceso}</MenuItem>
                                                    })
                                                    :
                                                    <MenuItem></MenuItem>
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>  {/* FIN OPERACION MAQUINA PIEZA Y MOLDE */}
                                    <Grid item xs={12}> {/* INICIO OPERARIOS*/}
                                        <h2>Operarios</h2>
                                        <div style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px'}}>
                                            <Button variant="primary"  onClick={this.addOperario}>
                                                Agregar Operario
                                            </Button>
                                            {
                                                this.state.vecOperarios.map((o,i)=>{  // ! RECORRE VECTOR OPERARIOS
                                                    return <div key={i} style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px',marginTop:'10px'}}>
                                                                <Grid container spacing={1}  id='contenedorOperaio'>
                                                                        <TextField
                                                                            style={{width:'70px',marginRight:'10px'}}
                                                                            id={`idOperario ${i}`}
                                                                            label="Legajo"
                                                                            type='number'
                                                                            name={`idOperario ${i}`}
                                                                            onChange={this.capturaDatos}
                                                                            value={this.state.vecOperarios[i].idOperario}
                                                                        />
                                                                        <FormControl  className={classes.formControl} style={{width:'180px',marginRight:'10px'}}>
                                                                            <InputLabel id="idNombre">Nombre</InputLabel>
                                                                            <Select
                                                                                style={{width:'180px',marginRight:'10px'}}
                                                                                labelId="idNombre"
                                                                                id="cbx_operarios"
                                                                                value={this.state.vecOperarios[i].nombre}
                                                                                name={`nombreOperario ${i}`}
                                                                                onChange={this.capturaDatos}
                                                                            >
                                                                                {
                                                                                    Array.isArray(  this.state.vecOperariosCombo )?
                                                                                    this.state.vecOperariosCombo.map((op,indiceOperario)=>{
                                                                                    return <MenuItem key={indiceOperario} value={op.idTrabajador}>{op.nombreTrabajador} { op.apellidoTrabajador }</MenuItem>
                                                                                    })
                                                                                    :
                                                                                    <MenuItem></MenuItem>
                                                                                }
                                                                            </Select>
                                                                        </FormControl>
                                                                        <FormControl  className={classes.formControl} style={{width:'130px',marginRight:'10px'}} >
                                                                        <InputLabel  id='idTurnoLabel'>Turno</InputLabel>
                                                                            <Select
                                                                                labelId='idTurnoLabel'
                                                                                onChange={this.capturaDatos}
                                                                                id={`idTurno ${i}`}
                                                                                value={this.state.vecOperarios[i].idTurno}
                                                                                name={`idTurno ${i}`}
                                                                            >
                                                                                {
                                                                                    Array.isArray( this.state.vecTurnos )?
                                                                                    this.state.vecTurnos.map((tur,indiceTurno)=>{
                                                                                    return <MenuItem key={indiceTurno} value={tur.idTurno}>{tur.descripcionTurno}</MenuItem>
                                                                                    })
                                                                                    :
                                                                                    <MenuItem value=''></MenuItem>
                                                                                }
                                                                            </Select>
                                                                        </FormControl>
                                                                        <TextField
                                                                            style={{width:'100px',marginRight:'10px'}}
                                                                            id={`hsInicioOperario ${i}`}
                                                                            label="Desde"
                                                                            name={`hsInicioOperario ${i}`}
                                                                            type="time"
                                                                            onChange={this.getHoraInicioOperario}
                                                                            value ={this.state.vecOperarios[i].horaInicio}
                                                                            className={classes.textField}
                                                                            InputLabelProps={{
                                                                            shrink: true,
                                                                            }}
                                                                        />
                                                                        <TextField
                                                                            style={{width:'100px',marginRight:'10px'}}
                                                                            id={`hsFinOperario ${i}`}
                                                                            label="Hasta"
                                                                            name={`hsFinOperario ${i}`}
                                                                            type="time"
                                                                            onChange={this.getHoraFinOperario}
                                                                            value ={this.state.vecOperarios[i].horaFin}
                                                                            className={classes.textField}
                                                                            InputLabelProps={{
                                                                            shrink: true,
                                                                            }}
                                                                        />
                                                                        <TextField
                                                                            style={{width:'105px',marginRight:'10px'}}
                                                                            id={`txt_produccionOperario ${i}`}
                                                                            label="Produccion"
                                                                            type='number'
                                                                            name={`produccionOperario ${i}`}
                                                                            onChange={this.capturaDatos}
                                                                            value={this.state.vecOperarios[i].produccion}
                                                                        />
                                                                        <TextField
                                                                            style={{width:'80px',marginRight:'10px'}}
                                                                            id={`txt_caloriasOperario ${i}`}
                                                                            label="Calorias"
                                                                            type='number'
                                                                            name={`caloriasOperario ${i}`}
                                                                            onChange={this.capturaDatos}
                                                                            value={this.state.vecOperarios[i].calorias}
                                                                        />
                                                                        {/* <ButtonN variant="outlined" color="primary" type='button' onClickCapture={this.addRechazo} name={i}  >Add Rechazos</ButtonN> */}
                                                                        <Button size="sm" name={i} onClick={this.addRechazo}> Add rechazos </Button>
                                                                        <Button
                                                                            aria-label="delete"
                                                                            id={`${i} id_Operario`}
                                                                            className={classes.margin}
                                                                            style={{margin:'0px',padding:'0px',display:'block',width:'70px',float:'right'}}
                                                                            onClick={
                                                                                e=>{
                                                                                    var vecOP = this.state.vecOperarios
                                                                                    vecOP.splice(parseInt(e.target.id.split(' ')[0]),1)
                                                                                    this.setState({vecOperarios:vecOP})
                                                                                }
                                                                            }
                                                                        >
                                                                            Eliminar
                                                                        </Button>
                                                                </Grid>
                                                                { // !RECORRE VECTOR RECHAZOS
                                                                    Array.isArray( this.state.vecOperarios[i].vecRechazo) ?
                                                                    this.state.vecOperarios[i].vecRechazo.map((rech,indexRechazo)=>{
                                                                        return <Box className='contenedorRechazo'  boxShadow={3}  bgcolor="background.default"  m={1} p={3} id={`contenedorRechazosYzonas ${i} ${indexRechazo}`} key={`${i}${indexRechazo}`} >
                                                                            <Grid container spacing={1}>
                                                                                <Grid item xs={12} className='contenedorRechazos'>
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
                                                                                    <FormControl  className={classes.formControl}  style={{width:'140px',marginRight:'10px'}}>
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
                                                                                                Array.isArray(  this.state.vecDefectos )?
                                                                                                this.state.vecDefectos.map((def,indexDefecto)=>{
                                                                                                    return <MenuItem key={indexDefecto} value={def.idDefecto}>{def.nombreDefecto}</MenuItem>
                                                                                                })
                                                                                                :
                                                                                                <MenuItem></MenuItem>
                                                                                            }
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                    <FormControl  className={classes.formControl}  style={{width:'140px',marginRight:'10px'}}>
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
                                                                                                Array.isArray(  this.state.vecTipoRechazo )?
                                                                                                this.state.vecTipoRechazo.map((tr,indexTipoRechazo)=>{
                                                                                                    return <MenuItem key={indexTipoRechazo} value={tr.idTipoRechazo}>{tr.nombreTipoRechazo}</MenuItem>
                                                                                                })
                                                                                                :
                                                                                                <MenuItem></MenuItem>
                                                                                            }
                                                                                        </Select>
                                                                                    </FormControl>
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
                                                                                    <Button
                                                                                        aria-label="delete"
                                                                                        id={`${i} ${indexRechazo} id_rechazo`}
                                                                                        className={classes.margin}
                                                                                        style={{margin:'0px',padding:'0px',display:'block',width:'70px',float:'right'}}
                                                                                        onClick={
                                                                                            e=>{
                                                                                                var vecRE = this.state.vecOperarios
                                                                                                vecRE[i].vecRechazo.splice(parseInt(e.target.id.split(' ')[1]),1)
                                                                                                this.setState({vecOperarios:vecRE})
                                                                                            }
                                                                                        }
                                                                                    >
                                                                                        Eliminar
                                                                                    </Button>
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <TextField
                                                                                        style={{width:'60px',marginRight:'10px'}}
                                                                                        label='Letra'
                                                                                        id={`letraZona ${i} ${indexRechazo}`}
                                                                                        type='text'
                                                                                    >
                                                                                    </TextField>
                                                                                    <TextField
                                                                                        style={{width:'60px',marginRight:'10px'}}
                                                                                        label='Num'
                                                                                        id={`numeroZona ${i} ${indexRechazo}`}
                                                                                        type='number'
                                                                                    >
                                                                                    </TextField>
                                                                                    <TextField
                                                                                        style={{width:'60px',marginRight:'10px',marginBottom:'10px'}}
                                                                                        label='Cant'
                                                                                        id={`cantidadZona ${i} ${indexRechazo}`}
                                                                                        type='number'
                                                                                    >
                                                                                    </TextField>
                                                                                    <Button size="sm" name={`btnAddZona ${i} ${indexRechazo}`} onClick={this.addZona}>Add</Button>
                                                                                    <Alert id={`alert ${i} ${indexRechazo}`} style={{display:'none'}} severity="error">
                                                                                        {this.state.mensajeAlertZona}
                                                                                    </Alert>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Table size="sm">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <td>Letra</td>
                                                                                                <td>Numero</td>
                                                                                                <td>Cantidad</td>
                                                                                                <td>Eliminar</td>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                this.state.vecOperarios[i].vecRechazo[indexRechazo].vecZonas.map((z,indexZona)=>{
                                                                                                    return <tr key={indexZona}>
                                                                                                        <td>{z.letra}</td>
                                                                                                        <td>{z.numero}</td>
                                                                                                        <td>{z.cantidad}</td>
                                                                                                        <td>
                                                                                                            <Button
                                                                                                                aria-label="delete"
                                                                                                                id={`${indexZona} id_txtZona`}
                                                                                                                className={classes.margin}
                                                                                                                style={{margin:'0px',padding:'0px'}}
                                                                                                                onClick={
                                                                                                                    e=>{
                                                                                                                        var vecZN = this.state.vecOperarios
                                                                                                                        vecZN[i].vecRechazo[indexRechazo].vecZonas.splice(parseInt(e.target.id.split(' ')[0]),1)
                                                                                                                        this.setState({vecOperarios:vecZN})
                                                                                                                    }
                                                                                                                }
                                                                                                            >
                                                                                                                Eliminar
                                                                                                            </Button>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                })
                                                                                            }
                                                                                        </tbody>
                                                                                    </Table>
                                                                                </Grid>
                                                                            </Grid>
                                                                            </Box>
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
                                        <div className=''>
                                            <h2>Paradas de Maquina</h2>
                                            <div className='contenedorFormPardasMaquina'>
                                                <TextField
                                                style={{width:'65px',marginRight:'10px'}}
                                                id='txt_idParadaMquina'
                                                ref={this.txt_campoIdParadaMaquina}
                                                label='Cod PM'
                                                type='number'
                                                value={this.state.campoIdParaMaquina}
                                                onChange={
                                                    e=>{
                                                        var PMselect=''
                                                        try{ PMselect =this.state.vecParadasMaquina.find(pm=>pm.idParadaMaquina===parseInt(e.target.value)).nombreParadaMaquina }
                                                        catch(e){ this.setState({campoNombreParadaMaquina:''}) }
                                                        this.setState({campoIdParaMaquina:e.target.value})
                                                        if(PMselect !== ''){ this.setState({campoNombreParadaMaquina:PMselect})  }
                                                    }
                                                }
                                                >
                                                </TextField>
                                                <TextField
                                                style={{width:'300px',marginRight:'10px'}}
                                                disabled={true}
                                                label='Paradas de Mq'
                                                type='text'
                                                value={this.state.campoNombreParadaMaquina}
                                                >
                                                </TextField>
                                                <Button  size='sm' variant='secondary' onClick={e=>this.setState({showModalPM:true})}>Buscar</Button>
                                                <ModalPM eventClose={this.eventClose} show={this.state.showModalPM} vecParadasMaquina={this.state.vecParadasMaquina}/>
                                                <TextField
                                                    style={{width:'100px',marginRight:'10px'}}
                                                    id="txt_horaDesdeParadaMaquina"
                                                    label="Desde"
                                                    name="txt_horaDesdeParadaMaquina"
                                                    type="time"
                                                    onChange={e=>{
                                                        if(e.target.value !== '06:00' && this.state.campoHastaParadaMaquina !== '06:00' && e.target.value === this.state.campoHastaParadaMaquina){
                                                            this.setState({campoDesdeParadaMaquina:''})
                                                        }
                                                        else{
                                                            this.setState({campoDesdeParadaMaquina:e.target.value})
                                                        }
                                                    }}
                                                    value ={this.state.campoDesdeParadaMaquina}
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
                                                    id="txt_horaHastaParadaMaquina"
                                                    label="Hasta"
                                                    name='txt_horaHastaParadaMaquina'
                                                    type="time"
                                                    onChange={e=>{
                                                        if(e.target.value !== '06:00' && this.state.campoDesdeParadaMaquina !== '06:00' && e.target.value === this.state.campoDesdeParadaMaquina){
                                                            this.setState({campoHastaParadaMaquina:''})
                                                        }
                                                        else{
                                                            this.setState({campoHastaParadaMaquina:e.target.value})
                                                        }
                                                    }}
                                                    value ={this.state.campoHastaParadaMaquina}
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    inputProps={{
                                                    step: 300, // 5 min
                                                    }}
                                                />
                                                <Button onClick={this.capturaParaMaquina} >Cargar</Button>
                                            </div>
                                            <Alert ref={this.alertPM} style={{display:this.state.showAlert}} severity="error">
                                                <h6 id='h6Alert'>Error !</h6>
                                                <div style={{display:this.state.showAlert}} ></div>
                                            </Alert>
                                            <Table style={{marginTop:'10px'}}>
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
                                                        Array.isArray(  this.state.vecParadasMaquinaSeleccionada )?
                                                            this.state.vecParadasMaquinaSeleccionada.map((parMaq,indexParadaMaq)=>{
                                                                return <tr key={indexParadaMaq}>
                                                                    <td>{parMaq.idParadaMaquina}</td>
                                                                    <td>{parMaq.nombreParadaMaquina}</td>
                                                                    <td>{parMaq.desdeParadaMaquina}</td>
                                                                    <td>{parMaq.hastaParadaMaquina}</td>
                                                                    <td>{parMaq.duracionParadaMaquina + ' min'}</td>
                                                                    <td>{parMaq.tipoParadaMaquina ? 'No programa' : 'programada'}</td>
                                                                    <td>
                                                                        <Button
                                                                                variant='secondary'
                                                                                id={`${indexParadaMaq} id_PMseleccionada`}
                                                                                aria-label="update"
                                                                                className={classes.margin}
                                                                                style={{margin:'0px',padding:'0px'}}
                                                                                onClick={
                                                                                e=>{
                                                                                    var index = parseInt(String(e.target.id).split(' ')[0])
                                                                                    var idPM = this.state.vecParadasMaquinaSeleccionada[index].idParadaMaquina
                                                                                    var nombrePM = this.state.vecParadasMaquinaSeleccionada[index].nombreParadaMaquina
                                                                                    var desdePM = this.state.vecParadasMaquinaSeleccionada[index].desdeParadaMaquina
                                                                                    var hastaPM = this.state.vecParadasMaquinaSeleccionada[index].hastaParadaMaquina
                                                                                    var vecPM = this.state.vecParadasMaquinaSeleccionada
                                                                                    vecPM.splice(parseInt(index),1)
                                                                                    this.setState({vecParadasMaquinaSeleccionada:vecPM,campoIdParaMaquina:idPM,campoNombreParadaMaquina:nombrePM,campoDesdeParadaMaquina:desdePM,campoHastaParadaMaquina:hastaPM})
                                                                                }
                                                                            }
                                                                        >
                                                                            Update
                                                                        </Button>
                                                                    </td>
                                                                    <td>
                                                                    <Button
                                                                        aria-label="delete"
                                                                        id={indexParadaMaq}
                                                                        className={classes.margin}
                                                                        style={{margin:'0px',padding:'0px'}}
                                                                        onClick={
                                                                            e=>{
                                                                                var vecPM = this.state.vecParadasMaquinaSeleccionada
                                                                                vecPM.splice(parseInt(e.target.id),1)
                                                                                this.setState({vecParadasMaquinaSeleccionada:vecPM})
                                                                            }
                                                                        }
                                                                    >
                                                                        Eliminar
                                                                    </Button>
                                                                    </td>
                                                                </tr>
                                                            })
                                                            :
                                                            <td></td>
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Grid>
                                </Grid>
                        </div>
                        <div>
                            <Button
                                variant='primary'
                                size='lg'
                                block
                                type='submit'
                            >
                                Guardar Planilla de Produccion
                            </Button>
                        </div>
                </Form>
            </Box>
        );
    }
}

export default withSnackbar(AltaPlanillaPRODUCCION)