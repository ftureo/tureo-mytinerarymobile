import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Cities from "../screens/Cities";
import Itineraries from "../screens/Itineraries";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import {connect} from 'react-redux'
const StackNavigator = (props) => {
    const Stack = createStackNavigator();
    var routes = null
    if(props.loggedUser){
      routes=
      <>
        <Stack.Screen name="Cities" component={Cities} />
        <Stack.Screen name="Itineraries" component={Itineraries} />
      </>
    }

  return (
    <Stack.Navigator initialRouteName="" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {routes}
    </Stack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
      loggedUser: state.auth.loggedUser
  }
} 

export default connect(mapStateToProps)(StackNavigator);