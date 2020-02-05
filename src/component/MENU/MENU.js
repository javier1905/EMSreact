import React from 'react'
import {Navbar,Nav,NavDropdown,SplitButton,ButtonToolbar,Dropdown,Card} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import './styleMENU.css'
import logo from '../../Imagenes/logo.png'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#" onClick={e=>{this.props.history.push('/home')}}>Index</Navbar.Brand>
                    <Navbar.Brand href="#" onClick={e=>{this.props.history.push('/home/produccion')}}>Produccion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Produccion" id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={e=>{this.props.history.push('/home')}} >Planillas</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav   id='DropdownContainerMenuUser'>
                            <ButtonToolbar>
                                <SplitButton
                                    drop='left'
                                    variant="secondary"
                                    title='Management User'
                                    id='dropdown-button-drop-left'
                                >
                                    <div id='containerTargetUser'>
                                        {
                                            this.props.user.userName?
                                            <div>
                                                <Card id='targetaUser'  style={{ width: '250px',height:'auto'}}>
                                                    <Card.Img variant="top" src={logo} />
                                                    <Card.Body>
                                                        <Card.Title>Welcome {this.props.user.userName} !</Card.Title>
                                                        <Card.Text>
                                                            <span id='bodytargetaUser'>
                                                                <span id='listaUser'>
                                                                    <li>Perfil: {this.props.user.perfil}</li>
                                                                    <li>Nombre: {this.props.user.nombre}</li>
                                                                    <li>apellido: {this.props.user.apellido}</li>
                                                                </span>
                                                            </span>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>:
                                            <div></div>
                                        }
                                    </div>
                                    <Dropdown.Item
                                        onClick={e=>{this.props.history.push(`/usuario`)}}
                                        eventKey="2"
                                    >
                                        Management User
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item id='btn_cerrarSesion' eventKey="4">Cerrar Sesion</Dropdown.Item>
                                </SplitButton>
                            </ButtonToolbar>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(Menu);