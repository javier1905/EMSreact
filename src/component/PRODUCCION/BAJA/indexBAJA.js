import React from 'react'

class indexBAJA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.contoller = new AbortController()

    }
    componentWillUnmount(){
        this.contoller.abort()
    }
    render() {
        return (
            <div>
                <h2>BAJA</h2>
            </div>
        );
    }
}

export default indexBAJA;