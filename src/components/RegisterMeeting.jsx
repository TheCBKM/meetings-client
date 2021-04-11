import React, { useState, useEffect } from "react";
import { Form, Input, Button, Result, message, Divider } from "antd";
import db from "../firebase";
import { userStore } from "./Store";
import { navigate, Router } from "@reach/router";
import { Select, Grid, Card, CardActionArea, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, InputBase, TextField, MenuItem } from "@material-ui/core";

const upasnas = [
  "Happy Club, Kandivali",
  "Happy Club Nagpur",
  "Happy Club Upasna Pune",
  "Sankalp Upasana Mandal Indore",
  "Happy Club Malshiras",
  "Happy Club Aurangabad",
  "None",
];
const cities = ["Indore", "Bhopal", "Pune", "Nagpur", "Bina", "Mumbai", "None"];

export default function RegisterMeeting(props) {
  const autUser = userStore.useState((s) => s.user);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("");
  const [zid, setZid] = useState("");
  const [desc, setDesc] = useState("");
  const [pass, setPass] = useState("");
  const [link, setLink] = useState("");
  const [available, setAvailable] = useState("");
  const [lock, setLock] = useState("");
  const [show, setShow] = useState("");
  const [isBooked, setBooked] = useState(false);
  const [logs, setLog] = useState([]);
  const [logsAttendeeCount, setLogsAttendeeCount] = useState(0);
  const [logsQuestionsCount, setLogsQuestionsCount] = useState(0);
  const [logsRegisterCount, setLogsRegisterCount] = useState(0);

  const onTitleChange = (e) => setTitle(event.target.value);
  const onMidChange = (e) => setMid(event.target.value);
  const onZidChange = (e) => setZid(event.target.value);
  const onDescChange = (e) => setDesc(event.target.value);
  const onPassChange = (e) => setPass(event.target.value);
  const onLinkChange = (e) => setLink(event.target.value);

  const [zoomname, setZoomname] = useState("");
  const [atendee, setAttendee] = useState(1);
  const [question, setQuestion] = useState(0);
  const [whatsapp, setWhatsapp] = useState(0);
  const [uk, setUk] = useState("");
  const [city, setCity] = useState("");

  const onZoomnameChange = (e) => setZoomname(event.target.value);
  const onAttendeeChange = (e) => setAttendee(event.target.value);
  const onQuestionChange = (e) => setQuestion(event.target.value);
  const onWhatsappChange = (e) => setWhatsapp(event.target.value);
  const onUkChange = (e) => setUk(e.target.value);
  const onCityChange = (e) => setCity(event.target.value);

  useEffect(() => {
    db.collection("meetings")
      .doc(props.id)
      .onSnapshot((snap) => {
        if (!snap.exists)
          navigate('/')
        console.log(snap.data());
        let {
          title,
          zid,
          mid,
          pass,
          desc,
          link,
          available,
          lock,
          show,
        } = snap.data();
        setTitle(title);
        setMid(mid);
        setZid(zid);
        setDesc(desc);
        setAvailable(available);
        setLink(link);
        setLock(lock);
        setPass(pass);
        setShow(show);
        if (!show) navigate('/')
      });
  }, []);

  useEffect(() => {
    if (isBooked) {
      db.collection("meetings")
        .doc(props.id)
        .collection("attendee")
        .orderBy("timestamp", "desc")
        .onSnapshot(async (snap) => {
          console.log(snap.docs[0].data());
          let c1 = 0,
            c2 = 0,
            c3 = 0;
          let documents = await snap.docs.map((post) => {
            let data = post.data();
            c1 += 1;
            c2 += data.question ? Number(data.question) : 0;
            c3 += data.atendee ? Number(data.atendee) : 0;
            return {
              ...data,
            };
          });
          console.log("documents", documents);
          setLog(documents);
          setLogsRegisterCount(c1)
          setLogsQuestionsCount(c2)
          setLogsAttendeeCount(c3)
          console.log("logs", logs);
        });
    }
  }, [isBooked]);

  useEffect(() => {
    console.log("WOW")
    db.collection("meetings")
      .doc(props.id)
      .collection("attendee")
      .doc(autUser.uid)
      .onSnapshot((snap) => {
        if (snap.exists) {
          setBooked(true);
          let { atendee, zoomname, question, whatsapp, uk, city } = snap.data();
          setAttendee(atendee);
          setZoomname(zoomname);
          setQuestion(question);
          setWhatsapp(whatsapp);
          setCity(city);
          setUk(uk);
        } else {
          db.collection("users")
            .doc(autUser.uid)
            .onSnapshot((snap) => {
              setUser(snap.data());
              let {
                atendee,
                zoomname,
                question,
                whatsapp,
                uk,
                city,
              } = snap.data();
              setAttendee(atendee);
              setZoomname(zoomname);
              setQuestion(question);
              setWhatsapp(whatsapp);
              setCity(city);
              setUk(uk);
              console.log(
                "user",
                atendee,
                zoomname,
                question,
                whatsapp,
                uk,
                city
              );
              console.log("Exists", snap.exists);
            });
        }
        console.log("Booked ", snap.exists, autUser.uid);
      });
  }, [autUser]);

  const onFinish = (values) => {
    if (city == 'None') {
      message.error('City cannot be None, Type your City Name');
      return false
    }
    console.log(
      "Success:",
      values,
      atendee,
      zoomname,
      question,
      whatsapp,
      uk,
      city,
      autUser
    );

    db.collection("meetings")
      .doc(props.id)
      .collection("attendee")
      .doc(autUser.uid)
      .set({
        atendee,
        zoomname,
        question,
        whatsapp,
        uk,
        city,
        autUser,
        timestamp: Date.now(),
      })
      .then(() =>
        db.collection("users").doc(autUser.uid).set({
          atendee,
          zoomname,
          question,
          whatsapp,
          uk,
          city,
        })
      )
      .then(() => message.success("Thank you for registering with us.."))
      .catch(console.log);
    window.location.reload()
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="details">
        <Card >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {`${title ?? "no title"}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${desc ?? ""}`}

                {isBooked ? (
                  <>
                    {available ? (
                      <div>

                        <p>ID:{zid}</p>
                        <p>Password:{pass}</p>
                        <p>Link:<a href={link}>{link}</a></p>
                      </div>
                    ) : (
                      <p>Meeting details will be available soon</p>
                    )}
                  </>
                ) : (
                  <p>You have to book first to see more details </p>
                )}
              </Typography>
            </CardContent>
          </CardActionArea>

        </Card>
      </div>
      {isBooked ? (
        <Result
          status="success"
          title="Congratulation !!"
          subTitle="You have Successfully Registered yourself. Please visit here (again) one hour prior the meeting starts for meeting details  "
        />
      ) : (
        ""
      )}
      <div style={{ margin: 10 }}>
        <Accordion>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>{
              isBooked
                ? "Click here to update your details"
                : "Click Here to register. "
            }</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ margin: 20 }}>
              <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <p>

                  <TextField id="standard-basic" label="Zoom Name" name="attendee"
                    required={true}
                    type="text"
                    value={zoomname}
                    onChange={onZoomnameChange} />
                </p>
                <p>
                  <TextField
                    label="Total Attendee"
                    name="attendee"
                    type="number"
                    required={true}
                    max={10}
                    min={1}
                    value={atendee}
                    onChange={onAttendeeChange}
                  />
                </p>
                <p>
                  <TextField
                    label="Total Questions"
                    type="number"
                    required={true}
                    max={10}
                    min={0}
                    value={question}
                    onChange={onQuestionChange}
                  />
                </p>
                <p>
                  <TextField
                    label="WhatsApp mobile number"
                    required={true}
                    max={9999999999}
                    min={1111111111}
                    value={whatsapp}
                    onChange={onWhatsappChange}
                  />
                </p>
                <p>
                  <Select
                    value={uk}
                    required={true}
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a Upasna Kendra"
                    optionFilterProp="children"
                    onChange={onUkChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {upasnas.map((u) => (
                      <MenuItem value={`${u}`}>{u}</MenuItem>
                    ))}
                  </Select>
                </p>

                <p>
                  <TextField
                    label="Cityr"
                    type="text"
                    required={true}
                    value={city}
                    onChange={onCityChange}
                  />

                </p>
                <p>
                  {lock ? (
                    "You can't register now meeting is LOCKED "
                  ) : (
                    <Button disabled={lock} htmlType="submit" type="primary">
                      {isBooked ? "Update" : "Submit"}
                    </Button>
                  )}
                </p>
              </Form>
            </div>
          </AccordionDetails>
        </Accordion>

      </div>
      {isBooked && (
        <div style={{ marginTop: 20 }}>
          <center>
            <Card style={{ marginBottom: 10 }} >
              <CardActionArea>

                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Analytics
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <p>Total Registered :{logsRegisterCount}</p>
                    <p>Total Attendee :{logsAttendeeCount}</p>
                    <p>Total Questions :{logsQuestionsCount}</p>
                  </Typography>
                </CardContent>
              </CardActionArea>

            </Card>
          </center>


          <Typography align="center" gutterBottom variant="h6" component="h2">
            Log Book
                  </Typography>


          {logs.map((l, i) => (

            <Grid container spacing={4} justify="space-between" >

              <Grid item lg={6}>
                <Typography gutterBottom variant="h6" component="h2">
                  {l.zoomname}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">

                  will attend
                {l.atendee > 1 && ` with ${l.atendee - 1} other(s) `}
                  {l.question > 0 && " and ask question(s)"}
                </Typography>
              </Grid>

              <Grid item lg={6}>
                <img
                  loading="lazy"
                  style={{ height: 50 }}
                  src={l.autUser.photoURL != "" ? `${l.autUser.photoURL}` : `http://dummy-data-cbkm.herokuapp.com/getProfile/l?g=${i}`}
                />
              </Grid>
              <Divider />

            </Grid>

          ))}
        </div>

      )}
    </div>
  );
}
