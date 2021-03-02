import axios from 'axios'
import {Alert} from 'react-native'
const authActions = {
    newUser: (newUser) => {
        return async (dispatch, getState) => {
            const response = await axios.post('https://tureo-mytinerary.herokuapp.com/api/user/signup', newUser)
            if(!response.data.success){
              return response.data
            }
            dispatch({type: 'LOG_USER', payload: response.data})
        }
    },
    signOut: () => {
        return (dispatch, getState) => {
          dispatch({type: 'LOG_OUT'}) 
        }
      },
    signIn: (user) => { // Borra loggeduser del state y se deslogea 
        return async (dispatch, getState) => {
            const response = await axios.post('https://tureo-mytinerary.herokuapp.com/api/user/signin', user)
        if(!response.data.success){
          return response.data
        }
        dispatch({type: 'LOG_USER', payload: response.data})
        }
    },
    logFromAsyncStorage: (token) => {
        return async (dispatch, getState)=>{
            try{
                const respuesta = await axios.post('https://tureo-mytinerary.herokuapp.com/api/user/localstorage', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                if (respuesta.data.success) {
                    console.log(respuesta)
                }
                dispatch({type: 'LOG_USER', payload:{response: {...respuesta.data.response}}})
            } catch (error) {
                if(error.response.status === 401) {
                   Alert.alert('Acceso denegado!')
                      AsyncStorage.clear()
                }
            }
        }
    }, 
}
export default authActions