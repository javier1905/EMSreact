import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import UsuarioLOGIN from './Reducers/usuarioLOGIN'

const misReducers= combineReducers({
    UsuarioLOGIN,
})

const store = createStore(misReducers,applyMiddleware(thunk),window.STATE_FROM_SERVER)

export default store;
