import React from "react";
import SignUp from "./SignUp.jsx";
import { Router, navigate } from "@reach/router";

import { userStore } from "./Store";
import AllMeetings from "./AllMeetings";
import { auth } from "../firebase";
import RegisterMeeting from "./RegisterMeeting.jsx";
import Audios from "./Audios.jsx";
import Player from "./Player.jsx";
import { AppBar, Box, Button, IconButton, Typography, makeStyles, Tab, Tabs, Toolbar, CircularProgress } from "@material-ui/core";
import Footer from "./Footer.jsx";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function App(props) {
  const user = userStore.useState((s) => s.user);
  console.log("user", user);
  const signOut = () => {
    auth.signOut().then(() => navigate("/signup"));
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    navigate("/")
    setValue(newValue);
  };

  const classes = useStyles();


  return (
    <div>
      {user == false ? (
        <center>
          <CircularProgress color="secondary" />
        </center>
      ) : (
        <div>
          <AppBar position="static">
            <Toolbar >
              <Typography className={classes.title}>Meetings : CBKM</Typography>
              {user && (
                <Button onClick={signOut}>Logout</Button>
              )}
            </Toolbar>

            {user && (
              <Tabs value={value} onChange={handleChange} centered aria-label="simple tabs example">
                <Tab label="Meetings" />
                <Tab label="Recordings" />
              </Tabs>
            )}
          </AppBar>




          {!user ? (
            <TabPanel value={value} index={0}>
              <SignUp />
            </TabPanel>) : (
            <>
              <TabPanel value={value} index={0}>
                <Router>

                  <>
                    <AllMeetings default path="/" />

                    <RegisterMeeting path="/register/:id" />

                  </>
                </Router>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Router>

                  <>
                    <Audios default path="/" />

                    <Player path="/audio/:id" />
                  </>
                </Router>
              </TabPanel>

            </>
          )}


          <Router>
            {!user ? (
              <SignUp default path="/signup" />
            ) : (
              <>
                <Footer path="/" />
              </>
            )}
          </Router>
        </div>
      )}
    </div>
  );
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
