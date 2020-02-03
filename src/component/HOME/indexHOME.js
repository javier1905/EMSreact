import React from 'react'
import {withRouter,Route} from 'react-router-dom'
import Usuarios from '../USUARIOS/indexUSUARIOS'
import Produccion from '../PRODUCCION/indexPRODUCCION'
import Menu from '../MENU/indexMENU'

class indexHOME extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const rutaPadre = this.props.match.path
        return (
            <div>
                <h2>HOME</h2>
                <Menu/>
                <>
                    <Route path={`${rutaPadre}/usuarios`} >
                        <Usuarios/>
                    </Route>
                    <Route path={`${rutaPadre}/produccion`}>
                        <Produccion/>
                    </Route>
                </>
            </div>
        );
    }
}

export default withRouter(indexHOME);