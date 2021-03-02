import React, {useRef, useState, useEffect} from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView, Text, View, Image, ImageBackground, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Cities =(props) => {
    console.log(props)
    const backgroundCities = require('../assets/delicate.png')
    const [cities, setCities] = useState([])
    useEffect(()=> {
        fetch('https://tureo-mytinerary.herokuapp.com/api/cities')
        .then(res => res.json())
        .then(data => setCities(data.response))
    },[])
return(

    <View style={styles.cajaPadreCities}>
        <ImageBackground source={backgroundCities} style={styles.containerCities}>
            <View style={{marginTop:"8%", paddingBottom:"3%"}}>
                <Text style={styles.titleCities}>Cities</Text>
            </View>
            <View style={styles.cajaContenedorCities} >
                <ScrollView >
                    {cities.map(city => (
                <TouchableOpacity onPress={() => props.navigation.navigate("Itineraries",{idCity: city._id, cityPic: city.cityPic, cityName: city.cityName})}>
                    <View style={styles.containerViewCitiesRender} key={city._id}>                    
                        <Text style={styles.cityNameTitle}>{city.cityName}</Text>        
                        <Image style={styles.photoCity} source={{uri:`${city.cityPic}`}}/>
                        <Image style={styles.separator} source={{uri: 'http://1.bp.blogspot.com/-Cx_XHHblTrM/Vj_lw1YaPKI/AAAAAAAAAAg/iU99TVFCjJQ/s1600/separador.png'}}/>             
                    </View>
                </TouchableOpacity>
                ))}
                </ScrollView> 
                <View style={{width:"100%",alignItems:"center"}}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonHome}  onPress={()=> props.navigation.navigate('Home')}>Back to Home</Text>
                        </View>  
                    </View>   
            </View>
        </ImageBackground>
    </View> 
)
}
const styles = StyleSheet.create({
    titleCities:{
        fontSize: 50,
        fontWeight:"bold",
        color:"#ff7f00",
        paddingBottom: '5%',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 2, height: -2},
        textShadowRadius: 5

    },
    cajaContenedorCities:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:"-4%",
        paddingBottom:"25%"
    },
    containerCities:{
        flex: 1,
        resizeMode:'cover',
        alignItems:'center',
        width:'100%'
    },
    containerViewCitiesRender:{     
        alignItems:'center'  
    },
    cityNameTitle:{    
        marginTop:"5%",
        marginBottom:"1%",
        color:'black',
        fontWeight:"800",
        fontSize: RFValue(25, 580),
        fontStyle: 'italic'
    },
    photoCity: {
        width: 350,
        height: 250,
        borderRadius:5,
        borderWidth: 1,
      },
    separator: {
        width: '100%',
        height: 25
    },
    cajaPadreCities:{
        flex: 1,
        alignItems:'center',   
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
})

export default Cities
