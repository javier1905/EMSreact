import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

class modalPARADASDEMAQUINA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false
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
        },
    }))
    static getDerivedStateFromProps(nextProps,nextState){
        return {
            show:nextProps.show
        }
    }
    render() {
        const classes = this.useStyles
        return (
            <div>
                <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.show} onClose={e=>this.props.eventClose()} onKeyPress={e=>{console.log(e.key)}}>
                    <DialogTitle>Fill the form</DialogTitle>
                    <DialogContent>
                    <form className={classes.container}>
                            <h1>Hola mundo </h1>
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