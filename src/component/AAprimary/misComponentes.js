import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider , KeyboardDatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

var componente = {  }

const useStyles = makeStyles ( theme => ( {
    root: {
        flexGrow: 1
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    }
} ) )

componente.fecha = React.forwardRef ( ( props , ref ) => {
    const classes = useStyles (  )
    return ( <MuiPickersUtilsProvider utils = { DateFnsUtils } className = { classes.formControl } >
            <KeyboardDatePicker
                ref = { ref }
                style = { { marginRight : '10px' , width : '180px' } }
                size = { props.size ? props.size : 'small' }
                variant = { props.variant ? props.variant : 'standard' }
                margin = { props.margin ? props.margin : 'none' }
                id = { props.id ? props.id : 'dtp_fecha' }
                label = { props.label ? props.label : 'label' }
                format = { props.format ? props.format : 'dd/MM/yyyy' }
                value = { props.value ? props.value : null }
                onChange = { props.onChange }
                KeyboardButtonProps = { {
                    'aria-label' : 'change date' ,
                } }
            />
        </MuiPickersUtilsProvider> )
} )
componente.hora = React.forwardRef ( ( props , ref ) => {
    const classes = useStyles (  )
    return ( <TextField
        ref = { ref }
        style = { { width : '100px' , marginRight : '10px' } }
        id = { props.id ? props.id : 'dtp_hora' }
        label = { props.label ? props.label : 'label' }
        name = { props.name ? props.name : 'hora' }
        type = "time"
        value = { props.value ? props.value : '' }
        onChange = { props.onChange }
        className = { classes.textField }
        InputLabelProps = { {
        shrink : true ,
        } }
    /> )
} )
componente.numero = React.forwardRef ( ( props , ref ) => {
    return ( <TextField
        ref = { ref }
        style = { { width : '105px' , marginRight : '10px' } }
        id = { props.id ? props.id : 'txt_number' }
        type = 'number'
        label = { props.label ? props.label : 'label' }
        name = { props.name ? props.name : 'number' }
        onChange = { props.onChange }
        onBlur = { props.onBlur }
        value = { props.value ? props.value : '' }
    /> )
} )
componente.listaDesplegable = React.forwardRef ( ( props , ref ) => {
    const classes = useStyles (  )
    var  el = props.member
    var width = props.width ? props.width : 140
    var valor = props.value ? props.value : ''
    var label = props.label ? props.label : 'label'
    var vec = ( Array.isArray ( props.array ) && props.array ) ? props.array : [  ]
    return ( <FormControl  className = { classes.formControl } style = { { width : `${width}px` , marginRight : '10px' } } >
                    <InputLabel id = "demo-simple-select-label" style = { { width : `${width}px` } } > { label } </InputLabel>
                    <Select
                        style = { { width : `${width}px` } }
                        ref = { ref }
                        labelId = "demo-simple-select-label"
                        id = { props.id ? props.id : 'lista' }
                        value = {
                            Array.isArray( vec ) && vec.find ( x => parseInt ( x[el.valueMember] ) === parseInt ( valor ) ) ?
                            valor
                            :
                            ''
                        }
                        name = { props.name ? props.name : 'lista' }
                        onChange = { props.onChange }
                        onBlur = { props.onBlur }
                    >
                    {
                        Array.isArray ( vec ) ?
                            vec.map ( ( element , i ) => {
                            return <MenuItem  key = { i } value = { element[el.valueMember] } > { element[el.displayMember] } { element[el.displayMember2] ? element[el.displayMember2] : '' } </MenuItem>
                            })
                            :
                            <MenuItem></MenuItem>
                    }
                    </Select>
                </FormControl> )
} )
export default componente