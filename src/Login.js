import React,  { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })
  const { push } = useHistory()

  const { setTokenState } = props

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      push('/the-market')
    }
  },[])

  function onChangeHandler(e) {
    e.target.name === 'username' ? 
    setLoginForm({...loginForm, username: e.target.value}) : 
    setLoginForm({...loginForm, password: e.target.value})
  }

  function onSubmit(e) {
    e.preventDefault()
    // need url
    axios.post('https://Build-Week-African-Marketplace-Project.herokuapp.com/api/auth/login', loginForm)
      .then(r => {
        console.log(r)
        localStorage.setItem('token', r.data.token)
        setTokenState(true)
        push('/the-market')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      {/* <img src={loginImage}></img> */}
      <h2>Login</h2>
      <form>
        <input 
          placeholder='Username' 
          name='username' 
          value={loginForm.username} 
          type='text'
          onChange={onChangeHandler}/>
          
        <input 
          placeholder='Password' 
          name='password' 
          value={loginForm.password}
          type='password'
          onChange={onChangeHandler}/>
        <br></br>
        <a onClick={onSubmit} 
          href="#">
          Submit
        </a>
      </form>
    </div>
  )
}

export default Login
