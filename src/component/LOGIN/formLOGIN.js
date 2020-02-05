import React from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

class FormLOGIN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:undefined,
            password:undefined,
            bandera:false,
            mensaje:''
        };
    }
    caturaUser = e =>{
        if(e.target.name ==='userName'){
            this.setState({userName:e.target.value})
        }
        if(e.target.name === 'password'){
            this.setState({password:e.target.value})
        }
    }
    miSubmit = e => {
        const {userName,password} = this.state
        const d = {userName,password}
        fetch('https://ems-node-api.herokuapp.com/api/logueo',{
            method: 'POST',
            body: JSON.stringify(d),
            headers:{
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            }
        })
        .then(json => json.json())
        .then(dato =>{
            if(dato.token) {
                sessionStorage.setItem('token',dato.token)
                this.props.history.push('/home')
            }
            else if (dato.mensaje){
                setTimeout(()=>{this.setState({bandera:false,mensaje:''})},4000)
                this.setState({bandera:true,mensaje:dato.mensaje})
            }
        })
        e.preventDefault()
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.miSubmit}>
                    <h1>Inicio de Sesion</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control
                            name="userName"
                            onChange={this.caturaUser}
                            placeholder="UserName"
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            name="password"
                            onChange={this.caturaUser}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </Form.Group>
                    <Button
                        id='buttonIniciarSesion'
                        variant="primary"
                        type="submit"
                    >
                        Iniciar Sesion
                    </Button>
                </Form>
                <div>
                </div>
                {this.state.bandera && <Alert id='mensaje' variant='danger'>
                    {this.state.mensaje}
                </Alert>}
            </div>
        );
    }
}
export default withRouter(FormLOGIN);