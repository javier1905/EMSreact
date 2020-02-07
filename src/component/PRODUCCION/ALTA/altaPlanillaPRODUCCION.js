import React from 'react'
import {Form,Col,Row} from 'react-bootstrap'
import './styleAltaPlanillaPRODUCCION.css'
import Operarios from './OPERARIOSPLANILLA/operariosPLANILLA'

class AltaPlanillaPRODUCCION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                            <Form.Control type="date" required/>
                        </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGsdfsdridEmail" style={{width:'180px'}}>
                                <Form.Label>Fecha Fundicion</Form.Label>
                                <Form.Control type="date" required />
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
                                <Form.Control as="select">
                                    <option>1 - Mañana</option>
                                    <option>2 - Tarde</option>
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
                                <Operarios/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default AltaPlanillaPRODUCCION;