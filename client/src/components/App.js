import React from "react"
import Navbar from "./Navbar"
import Signup from "./Signup"
import Login from "./Login"
import Dashboard from "./Dashboard"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Search from "../pages/Search"
import {Container} from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PrivateRoute from "./PrivateRoute"

function App() {
  return (

        <Router>
        <Navbar />
          <Container className="flexbox align-items-center justify-content-center mt-3" style={{minHeight: "100vh"}}>
          <div className="w-100" width={{maxWidth:"400px"}}>
            <AuthProvider>
              <Switch>
                <Route exact path="/" component={Search} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/dashboard" component={Dashboard} />

                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />

                <Route path="/search" component={Search} />
              </Switch>
            </AuthProvider>
            </div>
          </Container>
        </Router>

  );
}

export default App;
