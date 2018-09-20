import React, { Component } from 'react';
import Login from './components/login/login'
import Main from './components/main/main'
import Upload from './components/upload/upload'

import './App.css'
import 'antd/dist/antd.css';



import {
  HashRouter,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
//import store from 'redux/store'

class App extends Component {
    constructor() {
        super()
    }

  render() {
    return (
    <Provider>
      <HashRouter>

        <div className="bake">
          <Route path='/' exact component={Login}/>
          <Route path='/main' component={Main}/>
           <Route path='/upload' component={Upload}/>
         
        </div>
      </HashRouter>
      </Provider>
     
    );
  }
}

export default App;