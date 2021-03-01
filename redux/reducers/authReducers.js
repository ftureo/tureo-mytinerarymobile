const { default: AsyncStorage } = require("@react-native-async-storage/async-storage")
const initialState = {
    loggedUser: null,
    userName:[]
}
const authReducer =  (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_USER': // new_user action
             /* AsyncStorage.setItem('name', action.payload.name)
             AsyncStorage.setItem('token', action.payload.token)  */
            return {
                ...state,
                loggedUser: action.payload,
                userName: action.payload.response.name
            }
        case 'LOG_OUT':
             /* AsyncStorage.clear(); */
            return {
                ...state,
                loggedUser: null
            }     
        default:
            return state
    }
}
module.exports = authReducer