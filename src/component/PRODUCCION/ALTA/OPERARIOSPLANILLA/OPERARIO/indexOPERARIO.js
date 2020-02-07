import React from 'react' 
import {Row,Col,Form,Button} from 'react-bootstrap'

class indexOPERARIO extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px',marginTop:'10px'}}>
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
        );
    }
}


export default indexOPERARIO;