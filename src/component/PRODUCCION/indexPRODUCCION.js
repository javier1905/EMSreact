import React from 'react'
import {withRouter,Route} from 'react-router-dom'
import MenuPRODUCCION from './MENUPRODUCCION/indexMENUPRODUCCION'
import Alta from './ALTA/indexALTA'
import Baja from './BAJA/indexBAJA'
import Lista from './LISTA/indexLISTA'
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'

class indexPRODUCCION extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    render() {
        // const classes = this.useStyles
        return (
            <div>
            <Grid container racing={12}>
                <Grid item sm={2} xs={6}>
                    <MenuPRODUCCION/>
                </Grid>
                <Grid item sm={10} xs={6}>
                    <Route path={`${this.props.match.path}/alta`}>
                    <SnackbarProvider maxSnack={3}>
                        <Alta/>
                    </SnackbarProvider>
                    </Route>
                    <Route path={`${this.props.match.path}/baja`}>
                        <Baja/>
                    </Route>
                    <Route path={`${this.props.match.path}/lista`}>
                        <Lista/>
                    </Route>
                </Grid>
                <div style={{clear:'both'}}></div>
            </Grid>
            </div>
        );
    }
}

export default withRouter(indexPRODUCCION);