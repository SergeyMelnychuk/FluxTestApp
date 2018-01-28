import { combineReducers } from 'redux'

const testReducer1 = (state = {}, action) => {
	return state
}
const testReducer2 = (state = {}, action) => {
	return state
}

const indexReducer = combineReducers({
    testReducer1,
    testReducer2

})

export default indexReducer