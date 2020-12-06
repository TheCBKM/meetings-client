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
    <div>
      {meetings.length > 0 ? meetings.map((m) => (
        <MeetingCard meeting={m} />
      )) : "No new meeting right now try in some time.."}
      {/* {meetings.length==0 && <p>No New Meetings</p>} */}
    </div>
  );
}
