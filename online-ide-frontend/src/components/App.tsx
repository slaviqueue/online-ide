import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import Editor from './screens/Editor/Editor'
import Landing from './screens/Landing/Landing'
import Main from './screens/Main/Main'
import theme from '../styles/theme'
import JwtAuth from './screens/JwtAuth/JwtAuth'
import PrivateRoute from './shared/PrivateRoute'
import Root from './Root'
import PublicRoute from './shared/PublicRoute'
import Logout from './screens/Logout/Logout'

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
  }

  body {
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    background-color: ${(props) => (props.theme as typeof theme).mainBackground};
    color: #ccc;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    height: 100%;
  }
`

function App () {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Router>
        <Root>
          <Switch>
            <PrivateRoute exact path="/app/projects/:projectId/editor" component={Editor} />
            <PrivateRoute exact path="/app" component={() => <Redirect to="/app/projects" />} />
            <PrivateRoute path="/app" component={Main} />

            <Route exact path="/auth/jwt" component={JwtAuth} />
            <PublicRoute exact path="/" forceTo="/app" component={Landing} />

            <Route exact path="/logout" component={Logout} />
          </Switch>
        </Root>
      </Router>
    </ThemeProvider>
  )
}

export default App
