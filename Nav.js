import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./routes/StackNavigator";

const Nav = () => {
    return (
        <NavigationContainer >
          
          <StackNavigator/>
          
        </NavigationContainer>
    );
  }

  export default Nav