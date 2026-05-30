import React, { useEffect } from "react";
import SignUp from "./SignUp.jsx";
import { Router, navigate } from "@reach/router";

import { userStore } from "./Store";
import AllMeetings from "./AllMeetings";
import { auth } from "../firebase";
import RegisterMeeting from "./RegisterMeeting.jsx";
import Audios from "./Audios.jsx";
import Player from "./Player.jsx";
import {
  AppBar,
  Box,
  Button,
  Typography,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  CircularProgress,
  Fab,
  Modal,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
  IconButton,
  Avatar,
} from "@material-ui/core";

import Footer from "./Footer.jsx";
import AppTour from "./AppTour.jsx";
import WelcomeModal, { WELCOME_KEY } from "./WelcomeModal.jsx";
import { LogoutOutlined, SmileFilled, SoundFilled, TeamOutlined } from "@ant-design/icons";
import { getThought } from "./thoughts.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  userLabel: {
    fontSize: "0.75rem",
    fontWeight: 400,
    opacity: 0.9,
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 180,
  },
  mainContent: {
    flexGrow: 1,
  },
  tabContent: {
    width: "100%",
  },
  desktopTabs: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
  },
  fab: {
    position: "fixed",
    right: 16,
    bottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
    zIndex: theme.zIndex.speedDial,
  },
  fabDesktop: {
    bottom: 24,
  },
  modalCard: {
    minWidth: 275,
    maxWidth: "min(90vw, 400px)",
    outline: "none",
    borderRadius: 12,
  },
  modalBackdrop: {
    backdropFilter: "blur(4px)",
  },
  loadingScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentWithBottomNav: {
    paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
  },
}));

export default function App(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const user = userStore.useState((s) => s.user);
  const [openModal, setOpen] = React.useState(false);
  const [thought, setthought] = React.useState(getThought());
  const [value, setValue] = React.useState(0);
  const [startTour, setStartTour] = React.useState(
    () => typeof localStorage !== "undefined" && !!localStorage.getItem(WELCOME_KEY)
  );

  useEffect(() => {
    if (location.pathname.startsWith("/audio")) setValue(1);
  }, []);

  useEffect(() => {
    if (user && location.pathname === "/signup") {
      navigate("/");
    }
  }, [user]);

  const handleOpen = () => {
    setthought(getThought());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const signOut = () => {
    auth.signOut().then(() => navigate("/signup"));
  };

  const handleChange = (event, newValue) => {
    navigate("/");
    setValue(newValue);
  };

  const handleBottomNavChange = (event, newValue) => {
    navigate("/");
    setValue(newValue);
  };

  const userDisplay =
    user && user.phoneNumber && user.phoneNumber.length > 0
      ? user.phoneNumber
      : user && user.displayName
      ? user.displayName
      : "";

  const avatarLetter = (userDisplay || user?.email || "U").charAt(0).toUpperCase();

  return (
    <div className={classes.root}>
      {user === false ? (
        <div className={classes.loadingScreen}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <div className={`${classes.title} header-user`}>
                {user && (
                  <Avatar
                    className="header-avatar"
                    src={user.photoURL || undefined}
                    alt=""
                  >
                    {avatarLetter}
                  </Avatar>
                )}
                <Typography variant="h6" component="div" style={{ minWidth: 0 }}>
                  <span className="display-font">Meetings</span>
                  {user && userDisplay && (
                    <Tooltip title={userDisplay}>
                      <span className={classes.userLabel}>{userDisplay}</span>
                    </Tooltip>
                  )}
                </Typography>
              </div>
              {user && (
                isMobile ? (
                  <IconButton color="inherit" onClick={signOut} aria-label="Logout">
                    <LogoutOutlined style={{ fontSize: 20 }} />
                  </IconButton>
                ) : (
                  <Button color="inherit" onClick={signOut} startIcon={<LogoutOutlined />}>
                    Logout
                  </Button>
                )
              )}
            </Toolbar>

            {user && !isMobile && (
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                className={classes.desktopTabs}
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab
                  className="tour-meetings"
                  label={
                    <span>
                      <TeamOutlined /> Meetings
                    </span>
                  }
                />
                <Tab
                  className="tour-recordings"
                  label={
                    <span>
                      <SoundFilled /> Recordings
                    </span>
                  }
                />
              </Tabs>
            )}
          </AppBar>
          {user && <div className="brand-sunrise-stripe" aria-hidden="true" />}

          <div
            className={`${classes.mainContent} ${isMobile && user ? classes.contentWithBottomNav : ""} safe-bottom`}
          >
            {!user ? (
              <Router>
                <SignUp path="/signup" />
                <SignUp default path="/" />
              </Router>
            ) : (
              <>
                <TabPanel value={value} index={0} classes={classes}>
                  <Router>
                    <>
                      <AllMeetings default path="/" />
                      <RegisterMeeting path="/register/:id" />
                    </>
                  </Router>
                </TabPanel>
                <TabPanel value={value} index={1} classes={classes}>
                  <Router>
                    <>
                      <Audios default path="/" />
                      <Player path="/audio/:id" />
                    </>
                  </Router>
                </TabPanel>
                <Router>
                  <Footer path="/" />
                </Router>
              </>
            )}
          </div>

          {user && isMobile && (
            <BottomNavigation
              value={value}
              onChange={handleBottomNavChange}
              className={classes.bottomNav}
              showLabels
            >
              <BottomNavigationAction className="tour-meetings" label="Meetings" icon={<TeamOutlined />} />
              <BottomNavigationAction className="tour-recordings" label="Recordings" icon={<SoundFilled />} />
            </BottomNavigation>
          )}

          {user && (
            <Fab
              onClick={handleOpen}
              className={`${classes.fab} fab-thoughts tour-thoughts-fab ${!isMobile ? classes.fabDesktop : ""}`}
              color="secondary"
              size={isMobile ? "medium" : "large"}
              aria-label="Thoughts"
            >
              <SmileFilled spin style={{ fontSize: isMobile ? 24 : 30 }} />
            </Fab>
          )}

          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropProps={{ className: classes.modalBackdrop }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card className={`${classes.modalCard} brand-card thoughts-modal`}>
              <CardContent>
                <span className="thoughts-quote-mark" aria-hidden="true">
                  "
                </span>
                <Typography align="center" color="textSecondary" gutterBottom className="display-font">
                  #Thoughts
                </Typography>
                <Typography align="center" variant="body1" component="div" className="thoughts-body">
                  {thought.split("\n").map((str, i) => (
                    <React.Fragment key={i}>
                      {str}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center", gap: 8 }}>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={() => setthought(getThought())}
                >
                  Another thought
                </Button>
                <Button size="small" onClick={handleClose}>
                  Close
                </Button>
              </CardActions>
            </Card>
          </Modal>

          <WelcomeModal active={!!user} onComplete={() => setStartTour(true)} />
          <AppTour active={!!user} start={startTour} />
        </div>
      )}
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, classes, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.tabContent}>
          {children}
        </Box>
      )}
    </div>
  );
}
