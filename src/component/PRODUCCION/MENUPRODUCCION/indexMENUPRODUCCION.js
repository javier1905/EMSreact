import React from 'react'
import {ListGroup,Nav} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import './styleMENUPRODUCCION.css'

class indexMENUPRODUCCION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    adminRUTAS = e =>{
        const rutaOrigen = this.props.match.path
        if(e.target.name === 'alta') this.props.history.push(`${rutaOrigen}/alta`)
        if(e.target.name === 'baja') this.props.history.push(`${rutaOrigen}/baja`)
        if(e.target.name === 'lista') this.props.history.push(`${rutaOrigen}/lista`)
     
    }
    render() {
        const styleItems = {paddingTop:'0px',paddingBottom:'0px'}
        const styleItemsSUBTITLE = {paddingTop:'2px',paddingBottom:'2px'}
        return (
            <div id='contenedorMENU'>
                <ListGroup>
                    <ListGroup.Item><Nav.Link disabled><h4>Produccion</h4></Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItemsSUBTITLE}><Nav.Link disabled><h6>Planillas Op</h6></Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='alta' onClick={this.adminRUTAS}>Alta</Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='baja' onClick={this.adminRUTAS}>Baja</Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='lista' onClick={this.adminRUTAS}>Listar</Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItemsSUBTITLE}><Nav.Link disabled><h6>Reportes</h6></Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='otros' onClick={this.adminRUTAS}>Otros</Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='alta' onClick={this.adminRUTAS}>About</Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='alta' onClick={this.adminRUTAS}>Client</Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='alta' onClick={this.adminRUTAS}>Susee</Nav.Link></ListGroup.Item>
                    <ListGroup.Item style={styleItems}><Nav.Link name='alta' onClick={this.adminRUTAS}>Alta</Nav.Link></ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default withRouter(indexMENUPRODUCCION);