import React from 'react'
import {withRouter} from 'react-router-dom'
import FormLOGIN from './formLOGIN'
import './styleLOGIN.css'

class indexLOGIN extends React.Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    obtieneLargoWindows(){ return window.screen.height }
    render() {
        return (
            <div id='ContenedorLogin'>
                <div id='Slider'>
                </div>
                <div className="FormLogin" style={{height:this.obtieneLargoWindows()+'px'}}>
                    <FormLOGIN/>
                </div>
            </div>
        )
    }
}

export default withRouter(indexLOGIN);