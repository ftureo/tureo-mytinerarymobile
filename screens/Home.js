import React /*, {useRef, useState, useEffect} */ from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import authActions from '../redux/actions/authActions'

 function Home(props) {
  const {width: screenWidth} = Dimensions.get('window');
  const backgroundPrincipal = require('../assets/01-MYtineraryLogoTransparency.png')
  
  const signOut = async()=>{
    await props.signOut()
    props.navigation.navigate('Home')
  }

  return (
    <ScrollView>
        <View style={styles.container}>
            <ImageBackground source={require('../assets/01-routeHQ.jpg')} style={styles.image}>
                <ImageBackground source={backgroundPrincipal} style={styles.firstCont}>
                </ImageBackground>
                <Text style={styles.texto}>Ready for your next adventure?</Text>
            </ImageBackground>
            <View style={{width:"100%", alignItems:"center", flexDirection:"row", justifyContent:"center"}}>
            <View style={styles.buttonCities}>
                  {props.loggedUser ? <Text style={styles.textButton}  onPress={()=> props.navigation.navigate('Cities')}>Discover Cities</Text>: <Text style={styles.textButton}  onPress={()=> props.navigation.navigate('SignIn')}>Discover Cities</Text>}
            </View>
            {props.loggedUser && <View style={styles.buttonAccess}>
                   <Text style={styles.textButton}  onPress={()=> signOut()}>Sign Out</Text> 
            </View>}
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:800
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:"center",
    width: Dimensions.get('window').width,
  },
  firstCont:{
    justifyContent:"center",
    resizeMode: "contain",
    width:"85%",
    height:"35%",
  },
  texto: {
    fontSize: 22,
    fontWeight:"bold",
    color: "#ff7f00",
    textAlign: 'center'
  },
  textButton:{
    color: 'rgb(103, 132, 194)',
    fontWeight:"bold",
    fontSize:20
},
  buttonCities:{
    backgroundColor:'#ff7f00',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    marginTop:"-32%",
    marginBottom:50,
    width:'40%',
    borderRadius:15,
    borderWidth: 3,
    borderColor:'rgb(253, 142, 122)'
  },
  buttonAccess:{
    backgroundColor:'#ff7f00',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    marginTop:"-32%",
    marginBottom:50,
    marginLeft:"4%",
    width:'40%',
    borderRadius:15,
    borderWidth: 3,
    borderColor:'rgb(253, 142, 122)'
  }
});

const mapStateToProps = state => {
  return {
      loggedUser: state.auth.loggedUser
  }
} 
const mapDispatchToProps = {
  signOut: authActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);