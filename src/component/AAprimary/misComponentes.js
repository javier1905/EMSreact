import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider , KeyboardDatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import clsx from 'clsx'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'
import Tooltip from '@material-ui/core/Tooltip'
import AddlIcon from '@material-ui/icons/Add'

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
        margin: theme.spacing(0),
    },
    textField: {
        width: '25ch',
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
componente.password = React.forwardRef ( ( props , ref ) => {
    const classes = useStyles (  )
    const [values, setValues] = React.useState ( {
        amount : '',
        weight : '',
        weightRange : '',
        showPassword : false
    })
    const handleClickShowPassword = (  ) => { setValues ( { ...values , showPassword : !values.showPassword } )  }
    const handleMouseDownPassword = e => { e.preventDefault (  ) }

    return ( <FormControl className = { clsx(classes.margin, classes.textField)} style = { { width : props.width ? props.width : '100%' } } >
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
            className = { props.className ? props.className : 'pass' }
            required = { props.required ? true : false }
            style = { { width : props.width ? props.width : '100%'   } }
            name = { props.name ? props.name : 'myPass' }
            ref = { ref }
            id = { props.id ? props.id : 'txt_password' }
            type = {values.showPassword ? 'text' : 'password'}
            value = { props.value ? props.value : '' }
            onChange = { props.onChange }
            endAdornment = {
                <InputAdornment position = "end">
                <IconButton
                    aria-label = "toggle password visibility"
                    onClick = { handleClickShowPassword }
                    onMouseDown = { handleMouseDownPassword }
                >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                </InputAdornment>
            }
        />
    </FormControl> )
} )
componente.texto = React.forwardRef ( ( props , ref ) => {
    return ( <TextField
        className = { props.className ? props.className : 'text' }
        ref = { ref }
        required = { props.required ? true : false }
        style = { { width : props.width ? props.width : '105px' } }
        id = { props.id ? props.id : 'txt_number' }
        type = 'text'
        label = { props.label ? props.label : 'label' }
        name = { props.name ? props.name : 'text' }
        onChange = { props.onChange }
        onBlur = { props.onBlur }
        value = { props.value ? props.value : '' }
    /> )
} )

componente.botonUpdate = React.forwardRef ( ( props , ref ) => {
    const [info] = React.useState (props.info ? props.info : '')
    return ( <Tooltip title="Update">
    <IconButton
            className = { props.className ? props.className : 'text' }
            ref = { ref }
            name = { props.name ? props.name : 'updateIcon' }
            id = { props.id ? props.id : 'btnUpdate' }
            style ={ { padding : 0 , margin : 0 } }
            onClick =   {  e => { props.MetodUpdate ( info ) } }
            aria-label="update" >
        <UpdateIcon />
    </IconButton>
</Tooltip> )
} )
componente.botonDelete = React.forwardRef ( ( props , ref ) => {
    const [info] = React.useState (props.info ? props.info : '')
    return ( <Tooltip title="Delete">
    <IconButton
            className = { props.className ? props.className : 'text' }
            ref = { ref }
            name = { props.name ? props.name : 'deleteIcon' }
            id = { props.id ? props.id : 'btnUpdate' }
            style ={ { padding : 0 , margin : 0 } }
            onClick =   {  e => { props.MetodDelete ( info ) } }
            aria-label="Delete" >
        <DeleteIcon />
    </IconButton>
</Tooltip> )
} )
componente.botonAdd = React.forwardRef ( ( props , ref ) => {
    const [info] = React.useState (props.info ? props.info : '')
    return ( <Tooltip title = { props.texto ? props.texto : "Update"}>
    <IconButton
            className = { props.className ? props.className : 'text' }
            ref = { ref }
            name = { props.name ? props.name : 'updateIcon' }
            id = { props.id ? props.id : 'btnUpdate' }
            style ={ { padding : 0 , margin : 0 } }
            onClick =   {  e => { props.MetodAdd ( info ) } }
            aria-label={ props.texto ? props.texto : "Update"} >
        <AddlIcon />
    </IconButton>
</Tooltip> )
} )
export default componente