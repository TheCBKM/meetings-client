import { Grid, Typography } from "@material-ui/core";
import { TeamOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import MeetingCard from "./MeetingCard";
import PageHeader from "./PageHeader";
import SkeletonGrid from "./SkeletonGrid";
import { useLayoutStyles } from "./layoutStyles";

export default function AllMeetings() {
  const classes = useLayoutStyles();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = db
      .collection("meetings")
      .orderBy("timestamp", "desc")
      .where("show", "==", true)
      .onSnapshot(
        (snap) => {
          const documents = snap.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          }));
          setMeetings(documents);
          setLoading(false);
        },
        () => setLoading(false)
      );
    return () => unsub();
  }, []);

  return (
    <div className={`${classes.pageContainer} app-content`}>
      <PageHeader
        title="Meetings"
        subtitle="Register for upcoming Upasna sessions"
      />

      {loading ? (
        <SkeletonGrid count={6} />
      ) : meetings.length > 0 ? (
        <Grid container spacing={3} className="card-grid">
          {meetings.map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3}>
              <MeetingCard meeting={m} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="empty-state">
          <TeamOutlined style={{ fontSize: 48, color: "#ffae00" }} />
          <Typography variant="body1">
            No new meeting right now — please check again soon.
          </Typography>
        </div>
      )}
    </div>
  );
}
