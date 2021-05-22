import React, { useContext, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { auth, db, storage } from "../firebase";
import { UserContext } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Faculty Finder App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [facultyId, setFacultyId] = useState("");
  const [email, setEmail] = useState("");
  const password = useRef(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { setUser } = useContext(UserContext);
  const handleCheckChange = (e) => {
    setChecked(e.target.checked);
  };
  const style = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const notify = () => {
    toast.error("Creating an Account", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,

      progress: progress,
    });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    notify();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            auth
              .createUserWithEmailAndPassword(email, password.current.value)
              .then((userAuth) => {
                userAuth.user
                  .updateProfile({
                    displayName: firstName,
                    photoURL: url,
                  })
                  .then(() => {
                    setUser({
                      email: userAuth.user.email,
                      uid: userAuth.user.uid,
                      photoURL: url,
                      name: firstName,
                      role: checked ? "faculty" : "student",
                    });
                  })
                  .then(() => {
                    if (checked) {
                      db.collection("faculties")
                        .doc(userAuth.user.uid)
                        .set({
                          id: userAuth.user.uid,
                          name: firstName,
                          lastName: lastName,
                          email: email,
                          photoURL: url,
                          feedbacks: [],
                        })
                        .then(localStorage.setItem("role", "faculty"));
                    } else {
                      db.collection("students")
                        .add({
                          name: firstName,
                          lastName: lastName,
                          email: email,
                          photoURL: url,
                        })
                        .then(localStorage.setItem("role", "student"));
                    }
                  });
              })
              .catch((error) => alert(error));
          });
      }
    );
  };
  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Are you a Faculty?"
              />
              {/* {checked ? (
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="facultyId"
                    label="Faculty ID"
                    name="facultyId"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                  />
                </Grid>
              ) : (
                <></>
              )} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={password}
              />
            </Grid>
          </Grid>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
              style={{ marginTop: "15px" }}
            >
              Upload Profile Picture
            </Button>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={style}
            className={classes.submit}
            onClick={handleUpload}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/studsignin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
