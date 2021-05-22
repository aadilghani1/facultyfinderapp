import React, { useEffect } from "react";
import "./App.css";
import Header from "./layout/Header";
// import Landing from "./pages/Landing";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import FacSignin from "./pages/FacultySignin";
import StudSignin from "./pages/StudentSignin";
import Signup from "./pages/Signup";
import { useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
import { auth } from "./firebase";
import animate from "./animation.gif";
import FacultyInfo from "./pages/FacultyInfo";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [description, setDescription] = useState("");
  useEffect(() => {
    setTimeout(async () => {
      await setLoading(false);
    }, 1500);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          role: localStorage.getItem("role"),
        });
      }
    });
  }, []);
  console.log(user);
  return loading === true ? (
    <div className="logo__container">
      <img src={animate} alt="loader" className="logo__image" />
    </div>
  ) : (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Switch>
          <Route exact path="/">
            {/* {console.log(user)} */}
            {user ? (
              user?.role === "student" ? (
                <StudentDashboard />
              ) : (
                <FacultyDashboard />
              )
            ) : (
              <Redirect to="/signup" />
            )}
          </Route>
          <Route exact path="/facsignin">
            {user ? <Redirect to="/" /> : <FacSignin />}
          </Route>
          <Route exact path="/studsignin">
            {user ? <Redirect to="/" /> : <StudSignin />}
          </Route>
          <Route exact path="/signup">
            {user ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route exact path="/facultyinfo">
            {user?.role !== "student" ? <Redirect to="/" /> : <FacultyInfo />}
          </Route>
          <Route exact path="*" component={PageNotFound}></Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
