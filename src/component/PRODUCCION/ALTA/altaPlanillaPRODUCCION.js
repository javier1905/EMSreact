import React from 'react'
import {Form,Col,Row,Button} from 'react-bootstrap'
import './styleAltaPlanillaPRODUCCION.css'

class AltaPlanillaPRODUCCION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaProduccion:undefined,
            fechaFundicion:undefined,
            idTurno:undefined,
            HoraInicioProduccion:undefined,
            HoraFinProduccion:undefined,
            idOperacion:undefined,
            idMaquina:undefined,
            idPieza:undefined,
            idMolde:undefined,
            vecOperarios:[]
        };
    }
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
        }
        if(this.state.vecOperarios[indexOperario]){
            let newVecOperarios = this.state.vecOperarios
            newVecOperarios[indexOperario].vecRechazo = [...newVecOperarios[indexOperario].vecRechazo,{newRechazo}]
            this.setState({vecOperarios:newVecOperarios})
        }
    }
    capturaDatos = e =>{
        let nombre = e.target.name
        let value = e.target.value
        if(nombre === 'fechaProduccion'){this.setState({fechaProduccion:value})}
        if(nombre === 'fechaFundicion'){this.setState({fechaFundicion:value})}
        if(nombre === 'idTurno'){this.setState({idTurno:value})}
        if(nombre === 'HoraInicioProduccion'){this.setState({HoraInicioProduccion:value})}
        if(nombre === 'idOperacion'){this.setState({idOperacion:value})}
        if(nombre === 'idMaquina'){this.setState({idMaquina:value})}
        if(nombre === 'idPieza'){this.setState({idPieza:value})}
        if(nombre === 'idMolde'){this.setState({idMolde:value})}
        try{
            if(nombre.split(' ')[0] === 'idOperario'){
                var index = parseInt(nombre.split(' ')[1])
                var listaOperarios = this.state.vecOperarios
                listaOperarios[index].idOperario = value
                this.setState({vecOperarios:listaOperarios})
            }
        }
        catch(e){}
    }
    render() {
        return (
            <div>
                <h1 id='PlanillaProduccion'>PlanillaProduccion</h1>
                <Form>
                    <Row>
                        <Col>
                        <Form.Group controlId="fsdf" style={{width:'180px'}}>
                            <Form.Label>Fecha Produccion</Form.Label>
                            <Form.Control onChange={this.capturaDatos} name='fechaProduccion' type="date" required/>
                        </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGsdfsdridEmail" style={{width:'180px'}}>
                                <Form.Label>Fecha Fundicion</Form.Label>
                                <Form.Control onChange={this.capturaDatos} name='fechaFundicion' type="date" required />
                            </Form.Group>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group  controlId="sdf" style={{width:'140px'}}>
                                <Form.Label>Turno</Form.Label>
                                <Form.Control onChange={this.capturaDatos} name='idTurno'  as="select">
                                    <option value='1'>1 - Mañana</option>
                                    <option value='2'>2 - Tarde</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="fsfdf" style={{width:'100px'}}>
                                <Form.Label>Hora Inicio</Form.Label>
                                <Form.Control name='HoraInicioProduccion' type="time" style={{textAlign:'center'}}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="sdfs" style={{width:'100px'}}>
                                <Form.Label>Hora Fin</Form.Label>
                                <Form.Control onChange={this.capturaDatos} type="time" />
                            </Form.Group>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group  controlId="operacion">
                                <Form.Label>Operacion</Form.Label>
                                <Form.Control name='idOperacion' onChange={this.capturaDatos} as="select">
                                    <option>Granallado</option>
                                    <option>Mecanizado</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group  controlId="maquinas">
                                <Form.Label>Maquina</Form.Label>
                                <Form.Control name='idMaquina' onChange={this.capturaDatos} as="select">
                                    <option>IN20</option>
                                    <option>IN22</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group  controlId="piezas">
                                <Form.Label>Pieza</Form.Label>
                                <Form.Control name='idPieza' onChange={this.capturaDatos} as="select">
                                    <option>107MQB</option>
                                    <option>107B1</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Molde</Form.Label>
                                <Form.Control name='idMolde' onChange={this.capturaDatos}  as="select">
                                    <option>1R1</option>
                                    <option>2R2</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Operarios</Form.Label>
                                <div style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px'}}>
                                <Button variant="primary" size="lg" block onClick={this.addOperario}>
                                    Agregar
                                </Button>
                                {
                                    this.state.vecOperarios.map((o,i)=>{
                                        return <div key={i} style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px',marginTop:'10px'}}>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group>
                                                                <Form.Label>Legajo</Form.Label>
                                                                <Form.Control name={`idOperario ${i}`} onChange={this.capturaDatos}  type='number'/>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group>
                                                                <Form.Label>Nombre</Form.Label>
                                                                <Form.Control name='nombreOperario' onChange={this.capturaDatos}  as="select">
                                                                    <option>Gracia Carlos</option>
                                                                    <option>Irusta</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group style={{width:'100px'}}>
                                                                <Form.Label>Hora Inicio</Form.Label>
                                                                <Form.Control name='hsInicioOperario' onChange={this.capturaDatos}  type="time" style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group style={{width:'100px'}}>
                                                                <Form.Label>Hora Fin</Form.Label>
                                                                <Form.Control name='hsFinOperario' onChange={this.capturaDatos}  type="time" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group style={{width:'100px'}}>
                                                                <Form.Label>Produccion</Form.Label>
                                                                <Form.Control name='produccionOperario' onChange={this.capturaDatos} type="number" style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group style={{width:'100px'}}>
                                                                <Form.Label>Calorias</Form.Label>
                                                                <Form.Control name='caloriasOperario' onChange={this.capturaDatos} type="number" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group>
                                                                <Form.Label>Add Rechazos</Form.Label>
                                                                <Button name={i} onClick={this.addRechazo}>
                                                                    Add rechazos
                                                                </Button>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    {
                                                        this.state.vecOperarios[i].vecRechazo ?
                                                        this.state.vecOperarios[i].vecRechazo.map((rech,indexRechazo)=>{
                                                            return <div key={`${i}${indexRechazo}`} style={{display:'inline-block'}}>
                                                                <Row>
                                                                    <div className='contenedorRechazos'>
                                                                        <Form.Group>
                                                                            <Form.Label>Id rechazo</Form.Label>
                                                                            <Form.Control type='number' name=''/>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label>Nombre rechazo</Form.Label>
                                                                            <Form.Control as='select'>
                                                                                <option>Rechupe</option>
                                                                                <option>Fizura</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                            <div className='tipoRechazo'>
                                                                                <Form.Control  type='checkbox' name=''/>
                                                                            </div>
                                                                        <Button>
                                                                            Add Zonas
                                                                        </Button>
                                                                    </div>
                                                                </Row>
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
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default AltaPlanillaPRODUCCION;