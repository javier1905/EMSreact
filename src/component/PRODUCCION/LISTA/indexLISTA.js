import React from 'react'

class indexLISTA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            miLista:[],
            error:''
        };
    }
    componentDidMount(){
        this.obtenerlista()
    }
    obtenerlista = () => {
        fetch('https://ems-node-api.herokuapp.com/api/getList',{
            method:'GET',
            headers:{
                'Accept':'Application/json',
                'Content-Type':'Application/json'
            }
        })
        .then(res=>res.json())
        .then(lista=>this.setState({miLista:lista}))
        .catch(e=> this.setState({error:e.message}))
    }

    render() {
        return (
            <div>
                <h2>LISTA</h2>
                <ol>
                    {
                        this.state.miLista.map((items,i)=>{
                            return (
                            <li key={i}>{items}</li>
                            )
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default indexLISTA;