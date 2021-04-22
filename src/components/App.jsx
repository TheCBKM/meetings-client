import React, { useEffect } from "react";
import SignUp from "./SignUp.jsx";
import { Router, navigate } from "@reach/router";

import { userStore } from "./Store";
import AllMeetings from "./AllMeetings";
import { auth } from "../firebase";
import RegisterMeeting from "./RegisterMeeting.jsx";
import Audios from "./Audios.jsx";
import Player from "./Player.jsx";
import { AppBar, Box, Button, Typography, makeStyles, Tab, Tabs, Toolbar, CircularProgress, Fab, Modal, Card, CardContent, CardActions, Backdrop } from "@material-ui/core";

import Footer from "./Footer.jsx";
import { LogoutOutlined, SmileFilled, SoundFilled, TeamOutlined } from "@ant-design/icons";
import { getThought } from "./thoughts.jsx";
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
  useEffect(() => {
    if (location.pathname.startsWith("/audio"))
      setValue(1);
  }, [])
  const [openModal, setOpen] = React.useState(false);
  const [thought, setthought] = React.useState(getThought());
  const handleOpen = () => {
    setthought(getThought())
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
              <Typography variant="h6" className={classes.title}>Meetings   {user ? user.phoneNumber.length > 0 ? user.phoneNumber : user.displayName : ""}
              </Typography>
              {user && (
                <Button color="secondary" onClick={signOut}><LogoutOutlined /> Logout</Button>
              )}
            </Toolbar>

            {user && (
              <Tabs value={value} onChange={handleChange} centered aria-label="simple tabs example">
                <Tab label={<Typography color="secondary"> <TeamOutlined /> Meetings</Typography>} />
                <Tab label={<Typography color="secondary"> <SoundFilled /> Recordings</Typography>} />
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
          <Fab
            onClick={handleOpen}
            style={{
              margin: 0,
              top: 'auto',
              right: 20,
              bottom: 20,
              left: 'auto',
              position: 'fixed',
            }} color="secondary" aria-label="add">
<SmileFilled spin={true} style={{ fontSize: '30px'}} />            </Fab>
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <Card className={{
                minWidth: 275,
              }}>
                <CardContent >
                  <Typography align="center" className={classes.title} color="textSecondary" gutterBottom>
                    Thought of the Day
        </Typography>
                  <Typography align="center" variant="h5" component="h1">
                    {thought.split('\n').map(str => <>{str}<br /></>)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
                    setthought(getThought())
                  }}>More</Button>
                </CardActions>
              </Card>
            </div>
          </Modal>
        </div>
      )
      }
    </div >
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
