import { ScrollView, Text, View, Image, ImageBackground } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios'
import {connect} from 'react-redux'

const fondo = require('../assets/delicate.png')

const noItineraries = require('../assets/noitineraries.jpg')
const boy = require('../assets/hombrecito.png')
const girl= require('../assets/icono2.png')

const Itineraries =(props) => {
const [itineraries, setItineraries] = useState([])
const cityId = props.route.params.idCity
console.log(itineraries)
useEffect(()=> {
    fetch('https://tureo-mytinerary.herokuapp.com/api/itineraries/'+cityId)
    .then(res => res.json())
    .then(data => setItineraries(data.response)) 
},[])
    return(
        <View style={styles.containerCitiesViewsPrincipal}>
            <ImageBackground style={styles.backgroundItineraries} source={fondo}>
                <ScrollView style={styles.dont}>           
                    <ImageBackground source={{uri: `${props.route.params.cityPic}`}} style={styles.cityImage}>      
                    </ImageBackground>
                    <View style={styles.nameCity}>
                        <Text style={styles.tituloCiudad}>{props.route.params.cityName}</Text>
                    </View>
                    {(itineraries.length === 0) ? <ImageBackground source={noItineraries} style={styles.imagenOops}><Text style={{backgroundColor:"rgba(231, 145, 114, 0.836))",width:"100%", textAlign:"center", paddingBottom:"2%", paddingTop:"2%",color:"white"}}>Oops! We don't have itineraries yet. Come Back Soon!</Text></ImageBackground> 
                    : itineraries.map(itinerary => (
                                <View  style={styles.containerRender}>
                                <View style={styles.containerTitleBox}>
                                    <Text style={styles.textoTitulo}>{itinerary.titleItinerary}</Text>
                                </View>
                                        {itinerary.activities.map(activity => (
                                            <View style={styles.containerActivities}>
                                                <View style={styles.activityInfo}>
                                                    <Text style={styles.activityTitle}>{activity.activityTitle}</Text>
                                                </View>
                                                <View>
                                                    <Image style={styles.photoActivity} source={{uri: `${activity.activityPic}`}} />
                                                </View>
                                            </View>
                                        ))}
                                        <View style={styles.cajaInfoUser}>
                                            <Text style={styles.info}>{`Duration: ${itinerary.duration} hours`}</Text>
                                            <Text style={styles.info}>Price: {Array(itinerary.price).fill('$')}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.textoInformation}>Itinerary created by</Text>
                                        </View>
                                        <View style={styles.activityInfo}>
                                            <Text style={styles.userName}>{itinerary.userNameCreator}</Text>
                                            {itinerary.userName === "travelerBoy" ? <Image style={styles.fotoUser} source={boy}/>: itinerary.userName === "travelerGirl"?<Image style={styles.fotoUser} source={girl}/>: <Image style={styles.fotoUser} source={{uri: `${itinerary.userPicCreator}`}}/>}
                                        </View>
                                        <Image style={styles.separator} source={{uri: 'http://1.bp.blogspot.com/-Cx_XHHblTrM/Vj_lw1YaPKI/AAAAAAAAAAg/iU99TVFCjJQ/s1600/separador.png'}}/> 
                                </View>
                    ))}
                    <View style={{width:"100%",alignItems:"center"}}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonHome}  onPress={()=> props.navigation.navigate('Home')}>Back to Home</Text>
                        </View>  
                    </View>      
                </ScrollView>  
            </ImageBackground>       
        </View>
    )
}
const styles ={
    textCategoria:{
        fontWeight: 'bold',
        backgroundColor:'black',
        paddingLeft:10,
        paddingRight:10,
        color:'violet',
        borderColor:'white',
        borderWidth: 1,
        borderRadius:25,
    },
    imagenOops:{
        height:150,
        width:'100%',
        marginTop:"5%",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:"10%"  
    },

    activityTitle:{
        marginBottom:"3%",
        fontWeight:'bold',
        color:'rgb(66, 90, 143)',
        textAlign:"center",
        fontStyle: 'italic'
    },
    cajaInfoUser:{
        flexDirection:'column',
        justifyContent:'center',
        marginBottom: '7%'
    },
   containerRender:{
       width:'100%',
       alignItems:'center',
       paddingBottom:'7%'
   },
    cajaHashtags:{
        flexDirection:'row',
        paddingTop:10
    },
    info:{
        fontSize: RFValue(15, 580),
        textAlign: 'center',
        marginTop:20,
        paddingLeft:10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor:'rgb(66, 90, 143)',
        borderRadius:3,
        color:'black',
        backgroundColor: 'rgba(125, 125, 125, 0.4)',
    },
    userName:{
        fontSize: RFValue(18, 580),
        textTransform:'uppercase',
        marginTop: 3,
        color:'white',
        backgroundColor:'#ff9800',
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
    textoInformation:{
        fontSize: RFValue(17, 580),
        color:'black'
    },
    textoTitulo:{
        fontSize: RFValue(18, 580),
        fontWeight: 'bold',
        textTransform:'capitalize',
        alignItems:'center',
        color:'black'
    },
    containerTitleBox:{
        alignItems:'center',
        width:'100%',
        backgroundColor: 'rgba(125, 125, 125, 0.2)',
        paddingBottom: 8,
        paddingTop: 8
    },
    activityInfo:{
        alignItems:'center',
        marginBottom: 10
    },
    fotoUser:{  
        width:200,
        height:200,
        marginTop:15,
        borderRadius:25,
        borderWidth: 1,
    },
    cajaCategorias:{  
        flexDirection:'row',
        justifyContent: 'space-around',
        paddingTop:5,
    }, 
    containerActivities:{
        width:'80%',
    },
    photoActivity:{  
        height: 180,
        marginBottom: 10,
        borderRadius: 5
    },
    nameCity:{
        alignItems:'center',
        paddingBottom: 8,
        paddingTop: 8,
        marginBottom:"2%",
    },
    tituloCiudad:{
        color:'#ff7f00',
        borderRadius:20,
        textTransform:'capitalize',
        fontSize: RFValue(35, 580),
        fontWeight: 'bold',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: 2, height: -2},
        textShadowRadius: 10
    },
    cityImage:{
        width:'100%',
        height:300,  
    },
    
    containerCitiesViewsPrincipal:{
        flex: 1,  
    },
    backgroundItineraries: {
        flex: 1,
        resizeMode: 'cover',
      },
      buttonHome:{
          color: 'white',
          fontWeight:"bold",
          fontSize:20
      },
      buttonContainer:{
          backgroundColor:'#ff7f00',
          alignItems:'center',
          justifyContent:'center',
          height:50,
          marginTop:"4%",
          marginBottom: '10%',
          width: 150,
          borderRadius: 5,
          borderWidth: 1,
          borderColor:'black'
        },  
    separator: {
        width: '100%',
        height: 25
    },
}

const mapStateToProps =state=>{
    return {
        loggedUser: state.auth.loggedUser
    }
}

export default connect(mapStateToProps)(Itineraries)