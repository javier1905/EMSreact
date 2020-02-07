import React from 'react'
import {Button} from 'react-bootstrap'
import Operario from './OPERARIO/indexOPERARIO'


class operariosPLANILLA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vecOperarios: []
        }
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
        console.log(newVecOperarios)
        this.setState({vecOperarios:newVecOperarios})
    }
    render() {
        return (
            <div style={{borderRadius:'7px',border:'#D5DBDB solid 1px',padding:'10px'}}>
                    <Button variant="primary" size="lg" block onClick={this.addOperario}>
                        Agregar
                    </Button>
                    {
                        this.state.vecOperarios.map((o,i)=>{
                            return <Operario  key={i} />
                        })
                    }
            </div>
        );
    }
}

export default operariosPLANILLA;