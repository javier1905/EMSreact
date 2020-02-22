import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextField} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class modalPARADASDEMAQUINA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
            buscador:'',
            paradaMQseleccionada:'',
            vecParadasMaquina:[]
        }
    }
    useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
    }))
    static getDerivedStateFromProps(nextProps,nextState){
        var vec = nextProps.vecParadasMaquina
        try{
            var regex = new RegExp(`${nextState.buscador}`,'gi')
            console.log(nextProps.vecParadasMaquina.find(pM=>regex.test(pM.nombreParadaMaquina)))
            if(nextProps.vecParadasMaquina.find(pM=>regex.test(pM.nombreParadaMaquina)) !== undefined && nextState.buscador !== '' ){
                vec =[]
                vec.push(nextProps.vecParadasMaquina.find(pM=>regex.test(pM.nombreParadaMaquina)))
            }
        }catch(e){ vec = nextProps.vecParadasMaquina}
        console.log(vec)
        return {
            show:nextProps.show,
            vecParadasMaquina: vec
        }
    }
    render() {
        const classes = this.useStyles
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.show} onClose={e=>this.props.eventClose()}
                    onKeyUp={
                        e=>{
                            var regex = new RegExp("^[a-zA-Z ]$")
                            if(e.key === 'Enter'){ } //! PREGUNTO SI ES ENTER - QUE NO HAGA NADA
                            else{
                                if(e.key === 'Backspace'){ //! PREGUNTO SI ES BORRA QUE  BORRE Y SALGA
                                    this.setState({buscador:this.state.buscador.substring(0,this.state.buscador.length-1)})
                                }
                                else{
                                    if(! isNaN(e.key)){ // ! PREGUNTO SI ES NUMERO - QUE LO AGREGUE
                                        this.setState({buscador:this.state.buscador+e.key})
                                    }
                                    else if (regex.test(e.key)){ //! PREGUNTO SI ES LETRA QUE LO AGREGUE
                                        this.setState({buscador:this.state.buscador+e.key})
                                    }
                                    else{  } //! SI NO ES LETRA NI  NUMERO O ESPACIO QUE NO AGA NADA
                                }
                            }
                        }
                    }>
                    <DialogTitle>Paradas de maquina</DialogTitle>
                    <DialogContent>
                        <FormControl className={classes.formControl} style={{width:'500px',borderRadius:'7px'}}>
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Paradas de Maquina
                            </InputLabel>
                            <Select
                                style={{height:'300px'}}
                                multiple
                                native
                                value={this.state.paradaMQseleccionada[0]}
                                onChange={e=>this.setState({paradaMQseleccionada:e.target.value[0]})}
                                inputProps={
                                    {  id: 'select-multiple-native',}
                                }
                            >
                            {
                                this.state.vecParadasMaquina !== undefined  ?
                                this.state.vecParadasMaquina.map((pm,indexPM) => (
                                    <option key={indexPM} value={pm.idParadaMaquina}>
                                        {pm.nombreParadaMaquina}
                                    </option>
                                ))
                                :
                                <option></option>
                            }
                            </Select>
                        </FormControl>
                        <form className={classes.container}>
                                <TextField
                                    style={{width:'500px'}}
                                    type='text'
                                    disabled={true}
                                    value={this.state.buscador}
                                >
                                </TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={e=>this.props.eventClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={e=>this.props.eventClose()} color="primary">
                        Ok
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default modalPARADASDEMAQUINA