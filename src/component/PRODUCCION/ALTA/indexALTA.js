import React from 'react'
import AltaPlanillaPRODUCCION from './altaPlanillaPRODUCCION'
import './styleAltaPlanillaPRODUCCION.css'

class indexALTA extends React.Component {
    constructor ( props ) {
        super ( props )
        this.state = {  }
    }
    render (  ) {
        return (
            <div>
                <AltaPlanillaPRODUCCION/>
            </div>
        );
    }
}

export default indexALTA