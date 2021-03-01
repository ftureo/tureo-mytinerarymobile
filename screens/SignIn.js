import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React, {useRef, useState, useEffect} from 'react';

import {Button,TextInput,Image, ImageBackground, StyleSheet, Text, View, ToastAndroid, Alert } from 'react-native';
import authActions from '../redux/actions/authActions'
import {connect} from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';


const SignIn =(props) => {
    const fondo = require('../assets/fotoGrande2.jpg')
    const logo = require('../assets/logo.png')
    const [newValue, setNewValue] = useState({})
    const[errores, setErrores] = useState([])
    const inputLogin = (name, value) => {
      setNewValue({
            ...newValue,
            [name]: value
        })
    }
    
    const enviarInfo = async e => {
      e.preventDefault()
      if(newValue.email === '' || newValue.password === '') {
          Alert.alert('Complete Los Datos')
          return false
      }
      setErrores([])
      const respuesta = await props.signIn(newValue)
      if(respuesta && !respuesta.success){
         setErrores([respuesta.mensaje])
        errores.map(error => Alert.alert("All the fields must be filled"))   
      } else {
        Alert.alert('Welcome to Mytinerary!')     
        props.navigation.navigate("Cities")
      }
  }
  return(
    <View style={styles.cajaGrande}>
       <ImageBackground source={fondo} style={styles.image}>
        <Image source={logo} style={styles.stretch} />
        <ScrollView style={{marginTop:"10%"}}>
          <View style={styles.prueba}>
              <View style={styles.cajaRegister}>
                <Text style={styles.texto}>Sign In</Text> 
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Email"
                  onChangeText={(value) => inputLogin("email", value)}    
              />
              <TextInput
                  secureTextEntry
                  style={[styles.input, styles.textArea]}
                  placeholder='Password'
                  onChangeText={(value) => inputLogin("password", value)}      
              />
                <View style={styles.boton}>
                  <Button
                    style={styles.pruebita}
                    title="Sign In"
                    color="rgb(103, 132, 194)"
                    onPress=
                      {enviarInfo}          
                  />
                </View>      
         <Text style={styles.register} onPress={()=> props.navigation.navigate('SignUp')}>Don't have an account? Touch here!</Text>
              </View>  


        </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}
const styles = {
  register:{
    color:'white',
    fontSize: 18,
    marginTop:"5%",
    paddingLeft:"2%",
    paddingRight:"2%"
  },
  social:{
    paddingLeft:25,
    paddingRight:25,
    marginTop:"15%",
  },
  texto:{
    color:'rgb(103, 132, 194)',
    fontSize: RFValue(24, 580), 
  },
  boton:{
    width:"40%",
    paddingTop:10,
    borderRadius:40
  },
  textArea:{
    height: 40,
    width:"80%",
    paddingLeft:10,
  },
  input:{
    height:40,
    borderColor: 'rgb(103, 132, 194)',
    backgroundColor:"white",
    borderWidth: 2,
    marginBottom: 5,
    marginTop:20,
    borderRadius:25,
    borderWidth: 1, 
  },
  prueba:{
    flex:1,
    width:'100%',
    alignItems:'center',
    mariginTop:"20%",
  },
  cajaRegister:{ 
    backgroundColor: 'rgb(250, 193, 173)',
    paddingBottom:10,
    width:'100%',
    borderRadius:25,
    borderWidth: 3,
    borderColor: 'rgb(231, 145, 114)',
    alignItems:'center',
  },
  cajaGrande: {
    flex: 1,
    justifyContent:'center'
  },
  stretch: {
    justifyContent:"center",
    resizeMode: "contain",
    marginTop:"3.5%",
    /* marginRight:"1%", */
    marginLeft:"1%",
    width:"67%",
    height:"44.8%",
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    alignItems:'center',
  },

}
const mapStateToProps = state => {
  return {
      loggedUser: state.auth.loggedUser,
      userName:state.auth.userName
  }
}
const mapDispatchToProps = { 
  signIn: authActions.signIn
  
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);