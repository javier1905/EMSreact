import React from 'react'
import ListarUsuarios from './ListarUsuarios'
import {connect} from 'react-redux'
import FindListaUSUARIOS from '../../Redux/Actions/findListaUSUARIOS'

class IndexUSUARIOS extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){ this.props.FindListaUSUARIOS() }
    render() {
        return (
            <div>
                <ListarUsuarios listadoUser={this.props.UsuariosLISTA}/>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        UsuariosLISTA:state.UsuariosLISTA
    }
}
const mapDispatchToProps = {
    FindListaUSUARIOS
}
const wrapper = connect(mapStateToProps,mapDispatchToProps)
const component = wrapper(IndexUSUARIOS)
export default component;

