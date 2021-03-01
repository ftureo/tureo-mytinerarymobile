import React /*, {useRef, useState, useEffect} */ from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import authActions from '../redux/actions/authActions'

 function Home(props) {
  const {width: screenWidth} = Dimensions.get('window');
  const prueba = require('../assets/01-MYtineraryLogoTransparency.png')
  // const img= [{
  //     title: "Maldivas",
  //     illustration:'https://wallpapercave.com/wp/XpDxzYW.jpg',
  // },
  // {
  //     title: "New York",
  //     illustration:'https://images5.alphacoders.com/108/1081801.jpg',
  // },
  // {
  //     title: "Amsterdam",
  //     illustration:'https://i.pinimg.com/originals/bd/24/8a/bd248a4521e2277ea1be5ae6a64c6de0.jpg',
  // },
  // {
  //     title: "Berlin",
  //     illustration: 'https://images4.alphacoders.com/552/thumb-1920-552459.jpg',
  // },
  // {
  //     title: "Venecia",
  //     illustration:'https://wallpapercave.com/wp/w9DrSmA.jpg',
  // }]
  // const [imagen, setImagen] = useState([]);
  // const carouselRef = useRef(null);

  // const goForward = () => {
  //   carouselRef.current.snapToNext();
  // };
  const signOut = async()=>{
    await props.signOut()
    props.navigation.navigate('Home')
  }

  // useEffect(() => {
  //   setImagen(img);
  // }, []);

  // const renderItem = ({item, index}, parallaxProps) => {
  //   return (
  //     <View style={styles.itemCarrousel}>
  //       <ParallaxImage
  //         source={{uri: item.illustration}}
  //         containerStyle={styles.imageContainerCarrousel}
  //         style={styles.imageCarrousel}
  //         parallaxFactor={0.4}
  //         {...parallaxProps}
  //       />
  //     </View>
  //   );
  // };
  return (
    <ScrollView>
        <View style={styles.container}>
            <ImageBackground source={require('../assets/01-routeHQ.jpg')} style={styles.image}>
                <ImageBackground source={prueba} style={styles.firstCont}>
                    <Text style={styles.texto}>Welcome to MyTinerary</Text>
                </ImageBackground>
            </ImageBackground>
            {/* <View style={styles.secCont}>
            <TouchableOpacity onPress={goForward}>
                    
                    </TouchableOpacity>
                    <Carousel
                      ref={carouselRef}
                      sliderWidth={screenWidth}
                      sliderHeight={screenWidth}
                      itemWidth={screenWidth - 100}
                      data={imagen}
                      renderItem={renderItem}
                      hasParallaxImages={true}
                    />
            </View> */}
            <View style={{width:"100%", alignItems:"center", flexDirection:"row", justifyContent:"center"}}>
            <View style={styles.buttonCities}>
                <Text>Ready for your next adventure?</Text>
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
    height:1300
  },
  image: {
    flex: 0.9,
    resizeMode: "contain",
    justifyContent: "flex-start",
    alignItems:"flex-end",
    width: Dimensions.get('window').width,
    paddingTop:"5%",
  },
  firstCont:{
    justifyContent:"center",
    resizeMode: "contain",
    marginTop:"3.5%",
    marginRight:"3%",
    width:"68.35%",
    height:"44.9%",
  },
  // secCont:{
  //   flex:0.5,
  //   marginTop:"-5%",
  //   backgroundColor:"whitesmoke"
  // },
  texto: {
    fontSize: 32,
    fontWeight:"bold",
    color: "rgb(253, 142, 122)",
    marginLeft:"-1%",
    marginTop:"6%"
  },

  // itemCarrousel: {
  //   width: '100%',
  //   height: '60%',
  // },
  // imageContainerCarrousel: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  // },
  // imageCarrousel: {
  //   ...StyleSheet.absoluteFillObject,
  //   resizeMode: 'cover',
  // },
textButton:{
  color: 'rgb(103, 132, 194)',
  fontWeight:"bold",
  fontSize:20
},
buttonCities:{
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    marginTop:"-32%",
    marginBottom:50,
    width:'40%',
    borderRadius:25,
    borderWidth: 3,
    borderColor:'rgb(253, 142, 122)'
  },
  buttonAccess:{
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    marginTop:"-32%",
    marginBottom:50,
    marginLeft:"4%",
    width:'40%',
    borderRadius:25,
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