import React from 'react'
import {withRouter} from 'react-router-dom'

class indexLOGIN extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div>
                <h2>LOGIN</h2>
                <button onClick={e=>{ this.props.history.push('/home')}}>home</button>
            </div>
        );
    }
}

export default withRouter(indexLOGIN);