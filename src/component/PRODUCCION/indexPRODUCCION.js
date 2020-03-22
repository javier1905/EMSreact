import React from 'react'
import { withRouter , Route } from 'react-router-dom'
import MenuPRODUCCION from './MENUPRODUCCION/indexMENUPRODUCCION'
import Alta from './ALTA/indexALTA'
import Baja from './BAJA/indexBAJA'
import Lista from './LISTA/indexLISTA'
import { SnackbarProvider } from 'notistack'

class indexPRODUCCION extends React.Component {
    constructor ( props ) {
        super ( props )
        this.state = {
            ancho : window.innerWidth
        }
        window.addEventListener ( 'resize' , (  ) => { this.setState ( { ancho : window.innerWidth } ) } )
        this.controller = new AbortController ( )
    }
    componentWillUnmount (  ) {
        this.controller.abort( )
    }
    render (  ) {
        return (<div style = { { width : '100%' } } >
                        <div style = { { width : '180px' , float : 'left' , boxSizing : 'border-box' } } >
                            <MenuPRODUCCION/>
                        </div>
                        <div style = { { width :  this.state.ancho - 200 , float : 'right' , boxSizing : 'border-box' } } >
                            <Route path = {`${this.props.match.path}/alta`} >
                                <SnackbarProvider maxSnack = { 3 }>
                                    <Alta/>
                                </SnackbarProvider>
                            </Route>
                            <Route path = {`${this.props.match.path}/baja`} >
                                <Baja/>
                            </Route>
                            <Route path = {`${this.props.match.path}/lista`} >
                                <SnackbarProvider maxSnack = { 3 } >
                                    <Lista/>
                                </SnackbarProvider>
                            </Route>
                        </div>
                        <div style = { { clear : 'both' } } ></div>
                    </div>
        )
    }
}

export default withRouter ( indexPRODUCCION )