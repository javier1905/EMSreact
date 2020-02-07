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
            legajo:undefined,
            nombre:undefined,
            apellido:undefined,
            horaInicio:undefined,
            horaFin:undefined,
            produccion:undefined,
            calorias:undefined,
            rechazos:[]
        }
        let newVecOperarios = [...this.state.vecOperarios,Op]
        console.log(newVecOperarios[0])
        this.setState({vecOperarios:newVecOperarios})
    }
    capturaDatos = e =>{
        let nombre = e.target.name
        let value =e.target.value
        if(nombre === 'fechaProduccion'){this.setState({fechaProduccion:value})}
        if(nombre === 'fechaFundicion'){this.setState({fechaFundicion:value})}
        if(nombre === 'idTurno'){this.setState({idTurno:value})}
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
                                <Form.Control type="time" style={{textAlign:'center'}}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="sdfs" style={{width:'100px'}}>
                                <Form.Label>Hora Fin</Form.Label>
                                <Form.Control type="time" />
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
                                <Form.Control as="select">
                                    <option>Granallado</option>
                                    <option>Mecanizado</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group  controlId="werw">
                                <Form.Label>Maquina</Form.Label>
                                <Form.Control as="select">
                                    <option>IN20</option>
                                    <option>IN22</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group  controlId="operacwerweion">
                                <Form.Label>Pieza</Form.Label>
                                <Form.Control as="select">
                                    <option>107MQB</option>
                                    <option>107B1</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group  controlId="operwerwacion">
                                <Form.Label>Molde</Form.Label>
                                <Form.Control as="select">
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
                                    return <div key={i}  style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px',marginTop:'10px'}}>
                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="id_operaio">
                                                            <Form.Label>Legajo</Form.Label>
                                                            <Form.Control type='number'/>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="nombre_operario">
                                                            <Form.Label>Nombre</Form.Label>
                                                            <Form.Control as="select">
                                                                <option>Gracia Carlos</option>
                                                                <option>Irusta</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                            <Form.Group controlId="txt_desde" style={{width:'100px'}}>
                                                                <Form.Label>Hora Inicio</Form.Label>
                                                                <Form.Control type="time" style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="txt_hasta" style={{width:'100px'}}>
                                                                <Form.Label>Hora Fin</Form.Label>
                                                                <Form.Control type="time" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="fsfdf" style={{width:'100px'}}>
                                                                <Form.Label>Produccion</Form.Label>
                                                                <Form.Control type="number" style={{textAlign:'center'}}/>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="sdfs" style={{width:'100px'}}>
                                                                <Form.Label>Calorias</Form.Label>
                                                                <Form.Control type="number" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Button>
                                                                Agregar rechazos
                                                            </Button>
                                                        </Col>
                                                </Row>
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