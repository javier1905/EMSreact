export const type = 'findListaUsuarios'

const listaUsuarios = (  ) => {
    return dispatch => {
        fetch ( "https://ems-node-api.herokuapp.com/api/usuarios" )
        .then ( res => { return res.json (  ) } )
        .then ( json => { dispatch ( { type , payload : json } ) } )
        .catch ( e => { dispatch ( { type , payload : [  ] } ) } )
    }
}
export default listaUsuarios