import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FacSignin from "./pages/FacultySignin";
import StudSignin from "./pages/StudentSignin";
import Signup from "./pages/Signup";
import { useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/facsignin" component={FacSignin} />
          <Route exact path="/studsignin" component={StudSignin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
