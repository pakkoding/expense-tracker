import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducer
import { authReducer } from './reducers/authReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

// middleware
import thunk from 'redux-thunk'
import interceptError from '../middleware/intercept-error'
import interceptMessenger from '../middleware/intercept-messenger'

const rootReducer = combineReducers({
  auth: authReducer,
  toastr: toastrReducer
})
const initialState = {}
const middleware = [thunk, interceptError, interceptMessenger]

const index = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default index
