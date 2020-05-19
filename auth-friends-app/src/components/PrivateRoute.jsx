import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Private Route rules:
// 1. It has the same API as <Route />
// 2. It renders a <Route /> and passes all the props through to it
// 3. It checks if the user is authenticated, if they are, it renders the component prop


const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={() => {
        if(token) {
          //render component
          return <Component />
        } else {
          //redirect to login
          return <Redirect to='/login' />
        }
      }} 
    />
  )
}

export default PrivateRoute