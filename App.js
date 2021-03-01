import React from "react";
import Nav from './Nav'
import {Provider} from "react-redux"
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from './redux/reducers/rootReducers'

const miStore = createStore(rootReducer, applyMiddleware(thunk))

 const App = () => {
  return (
    <Provider store={miStore}>
      <Nav/> 
    </Provider>
  );
}
export default App