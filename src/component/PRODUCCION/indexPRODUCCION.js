import React from 'react'
import {withRouter,Route} from 'react-router-dom'
import MenuPRODUCCION from './MENUPRODUCCION/indexMENUPRODUCCION'
import Alta from './ALTA/indexALTA'
import Baja from './BAJA/indexBAJA'
import Lista from './LISTA/indexLISTA'

class indexPRODUCCION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div id='contenedorMENUPRODUCCION' >
                    <MenuPRODUCCION/>
                </div>
                <div id='dashboardPRODUCCION'>
                    <Route path={`${this.props.match.path}/alta`}>
                        <Alta/>
                    </Route>
                    <Route path={`${this.props.match.path}/baja`}>
                        <Baja/>
                    </Route>
                    <Route path={`${this.props.match.path}/lista`}>
                        <Lista/>
                    </Route>
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        );
    }
}

export default withRouter(indexPRODUCCION);