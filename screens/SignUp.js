import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React, {useRef, useState, useEffect} from 'react';
import SelectPicker from 'react-native-form-select-picker';
import {Button,TextInput,Image, ImageBackground, StyleSheet, Text, View, Alert } from 'react-native';
import authActions from '../redux/actions/authActions'
import {connect} from 'react-redux'
import { ScrollView } from "react-native-gesture-handler";

const SignUp =(props) => {
  const fondo = require('../assets/fotoGrande2.jpg')
  const logo = require('../assets/logo.png')
  const [countries, setCountries] = useState([]);
  const [newValue, setNewValue] = useState({})
  const[errores, setErrores] = useState([])

  const inputLogin = (name, value) => {
    setNewValue({
          ...newValue,
          [name]: value
      })
  }
  
  const enviarInfo = async ()=> {
    /* e.preventDefault()  */
    if(newValue.userName === '' || newValue.password === '') {
        Alert.alert('completar campos')
        return false
    }
    setErrores([])
    const respuesta = await props.newUser(newValue)
    if(respuesta && !respuesta.success){
      respuesta.errors.map(error => Alert.alert("All the fields must be filled"))
    } else {
      Alert.alert('Welcome to Mytinerary') 
      props.navigation.navigate("Home") 
    }
}
  const fetchCountries = async () => {
    const api = await fetch ('https://restcountries.eu/rest/v2/all');
    const responseCountries = await api.json();
    setCountries(responseCountries)
  }
  useEffect(() => {
    fetchCountries();
  },[])
  return(
    <View style={styles.cajaGrande}>
       <ImageBackground source={fondo} style={styles.image}>
          <Image source={logo} style={styles.stretch} />
      <ScrollView style={{flex:1, width:"90%", marginBottom:"2%"}}>
        <View style={styles.prueba}>
          <View style={styles.cajaRegister}>
            <Text style={styles.texto}>Sign Up</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Name"
              placeholderTextColor="rgb(103, 132, 194)"
              onChangeText={(value) => inputLogin("name", value)} 
          />
          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='LastName'
              placeholderTextColor="rgb(103, 132, 194)"
            onChangeText={(value) => inputLogin("lastname", value)}
          />
          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='UserName'
              placeholderTextColor="rgb(103, 132, 194)"
            onChangeText={(value) => inputLogin("userName", value)}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder='Password'
            placeholderTextColor="rgb(103, 132, 194)"
            onChangeText={(value) => inputLogin("password", value)}
                />
          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='Email'
              placeholderTextColor="rgb(103, 132, 194)"
            onChangeText={(value) => inputLogin("email", value)}
          />
          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder='UserImage'
              placeholderTextColor="rgb(103, 132, 194)"
            onChangeText={(value) => inputLogin("userImage", value)}
          />
          <View style={[styles.input, styles.textArea]}>
            <SelectPicker default='Choose a country' label ='country' placeholder='Country' placeholderStyle={{color:'rgb(103, 132, 194)'}}  >
              {countries.map((country, index) =>{
                return(
                  <SelectPicker.Item label ={country.name} value={country.name} key={country.name} onChangeText={(value) => inputLogin("country", value)}>{country.name} </SelectPicker.Item>
                )
              })}
            </SelectPicker>
          </View>
            <View style={styles.boton}>
              <Button
                style={styles.pruebita}
                title="Sign Up"
                color="rgb(103, 132, 194)"
                onPress=
                {()=> enviarInfo()}        
             />
            </View>  
          </View>        
        </View>  
      </ScrollView>
      </ImageBackground>
    </View>
  )
}
const styles = {
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
    marginTop:5
  },
  textArea:{ 
    height: 40,
    width:"100%",
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
    paddingTop:'5%'
  },
  cajaRegister:{
    paddingBottom:10,
    backgroundColor: 'rgb(250, 193, 173)',
    width:'100%',
    borderRadius:25,
    borderWidth: 3,
    paddingLeft:"2%",
    paddingRight:"2%",
    borderColor: 'rgb(231, 145, 114)',
    alignItems:'center',
  },
  cajaGrande: {
    flex: 1,
  },
  stretch: {
    justifyContent:"center",
    resizeMode: "contain",
    marginTop:"3.5%",
    marginLeft:"1%",
    width:"50%",
    height:"30.8%", 
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems:'center',
  },
}
const mapStateToProps = state => {
  return {
      loggedUser: state.auth.loggedUser
  }
}

const mapDispatchToProps = { 
  newUser: authActions.newUser
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);