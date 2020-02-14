import React from 'react'
import {Modal,Button} from 'react-bootstrap'

class indexPARADASMAQUINA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={()=>this.props.cerrarModal()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Selecione la PM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>this.props.cerrarModal()}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={()=>this.props.cerrarModal()}>
                        Seleccionar
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


export default indexPARADASMAQUINA;