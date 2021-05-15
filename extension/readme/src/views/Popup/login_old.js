import React from 'react';
 

const Login = () => {
   const handleSubmit = event=>{
      event.preventDefault();
      console.log('form submitted')
   }
    return (
      <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    );
}
 
export default Login;