import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'
import Login from './login'

function getLoggedin(){
    return new Promise(resolve=>{
        chrome.storage.local.get('auth',function(items){
            resolve(items.auth.value);
        })
    })
}


class LoginButton extends Component {
  
   constructor(){
     super()
     
     this.state = {
      isLogged: false
     }
     getLoggedin().then(result=> {
         this.state.isLogged= result;
     })
     this.login = this.login.bind(this);
     this.logout= this.logout.bind(this);
   }
     
   login() {
        console.log('login pushed');

        <Route path="/login" component={Login} />
   }

   logout(){
       this.setState({ isLogged: false });
       chrome.storage.local.set({'auth': false}, function() {
           console.log('User logged out')
      });

   }
     
   render(){
    if(this.state.isLogged === true){
      return(
      <div>
      <h3> Welcome Back </h3>
      <button  onClick={this.logout}>
        Logout
      </button>    
      </div>
      )
      }
    else{
      return(
      <div>
        <Router>
        <Link to="/login">
            <button type="button">
              Login
            </button>
        </Link>
        
        <Switch>          
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
    </Router>
      {/* </Router><button  onClick={this.login}>
        Login
      </button> */}    
      </div>
      )          
    }       
  }
 }
  
 export default LoginButton