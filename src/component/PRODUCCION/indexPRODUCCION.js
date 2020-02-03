import React from 'react'
import {withRouter,Route} from 'react-router-dom'
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
                <h2>PRODUCCION</h2>
                <p>hola</p>
                <ol>
                    <li>
                        <button
                            onClick={e=>{ this.props.history.push(`${this.props.match.path}/alta`)}}
                        >
                            Alta
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={e=>{ this.props.history.push(`${this.props.match.path}/baja`)}}
                        >
                            Baja
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={e=>{ this.props.history.push(`${this.props.match.path}/lista`)}}
                        >
                            Lista
                        </button>
                    </li>
                </ol>
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
        );
    }
}

export default withRouter(indexPRODUCCION);