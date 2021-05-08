import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import logo from '../../../public/icons/icon_128.png'
import LoginButton from './login_state'
import Insights from '../Insights/insights'
import Report from '../Report/report'

function App() {
  return (
    <div className="App">
      <Router>
        <img 
        width={48}
        height={48}
        src={logo}/>
        <div>
          <Link to="/insights">
            <button type="button">
              Insights
            </button>
          </Link>
          <Link to="/report">
            <button type="button">
              Report
            </button>
          </Link>
          <LoginButton/>
         </div>
         
         <Switch>
                  
          <Route path="/insights">
            <Insights />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
        </Switch>
      </Router>
        
      
    </div>
  );
}

export default App
