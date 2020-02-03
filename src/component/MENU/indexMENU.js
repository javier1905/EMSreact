import React from 'react'
import {withRouter} from 'react-router-dom'

class indexMENU extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div>
                <ol>
                    <li>
                        <button 
                            onClick={e=>{ this.props.history.push(`${this.props.match.path}/usuarios`)}}
                        >
                            Usuarios
                        </button>
                    </li>
                    <li><button onClick={e=>{ this.props.history.push(`${this.props.match.path}/produccion`)}}>Producion</button></li>
                </ol>
            </div>
        );
    }
}

export default withRouter(indexMENU);