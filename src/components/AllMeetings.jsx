import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import MeetingCard from "./MeetingCard";

export default function AllMeetings() {
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    db.collection("meetings")
      .orderBy("timestamp", "desc")
      .where("show", "==", true)
      .onSnapshot(async (snap) => {
        let documents = await snap.docs.map((post) => {
          let data = post.data();
          return {
            id: post.id,
            ...data,
          };
        });
        setMeetings(documents);
      });
  }, []);
  console.log(meetings);
  return (
    <div style={{ topMargin: 3 }}>
      <Grid container justify="center" spacing={10}>

        {meetings.length > 0 ? meetings.map((m) => (
          <Grid key={m.id} item>

            <MeetingCard meeting={m} />
          </Grid>
        )) : <Grid > <br/><br/>No new meeting right now try in some time..</Grid>}
      </Grid>
    </div>
  );
}
