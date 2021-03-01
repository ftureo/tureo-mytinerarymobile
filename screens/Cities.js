import React, {useRef, useState, useEffect} from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView, Text, View, Image, ImageBackground, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Cities =(props) => {
    console.log(props)
    const backgroundCities = require('../assets/01-snow ice.jpg')
    const [cities, setCities] = useState([])
    useEffect(()=> {
        fetch('https://tureomytinerary.herokuapp.com/api/cities')
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
                        <Text style={styles.cityNameTitle}>{cityName}</Text>        
                        <Image style={styles.photoCity} source={{uri:`${cityPic}`}}/>               
                    </View>
                </TouchableOpacity>
                ))}
                </ScrollView> 
                <View style={{width:"100%",alignItems:"center"}}>
                        <View style={styles.botoncito}>
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
        fontSize:30,
        fontWeight:"bold",
        color:"rgb(253, 142, 122)",
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
        color:'rgb(103, 132, 194)',
        fontWeight:"600",
        fontSize: RFValue(20, 580),
    },
    photoCity: {
        width: 350,
        height: 250,
        borderRadius:45,
        borderWidth: 1,
      },
    cajaPadreCities:{
        flex: 1,
        alignItems:'center',   
    },
    buttonHome:{
        color: 'rgb(103, 132, 194)',
        fontWeight:"bold",
        fontSize:20
    },
    botoncito:{
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        height:50,
        marginTop:"4%",
        marginBottom:"4%",
        width:'50%',
        borderRadius:15,
        borderWidth: 3,
        borderColor:'rgb(253, 142, 122)'
      },
})

export default Cities
