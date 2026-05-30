import React from "react";
import { Link } from "@reach/router";
import {
  Card,
  CardActions,
  Button,
  CardActionArea,
  Typography,
  CardContent,
} from "@material-ui/core";
import { LockOutlined, CalendarOutlined } from "@ant-design/icons";
import { useLayoutStyles } from "./layoutStyles";

function formatMeetingDate(timestamp) {
  if (!timestamp) return null;
  try {
    const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function MeetingCard(props) {
  const classes = useLayoutStyles();
  const { title, id, desc, lock, timestamp } = props.meeting;
  const dateLabel = formatMeetingDate(timestamp);
  const descText = desc || "";

  return (
    <Card className={`${classes.cardRoot} brand-card fade-in-up`}>
      <Link to={`/register/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardActionArea component="div">
          <CardContent className={classes.cardContent}>
            <div className="chip-row">
              {dateLabel && (
                <span className="chip chip--primary">
                  <CalendarOutlined style={{ marginRight: 4 }} />
                  {dateLabel}
                </span>
              )}
              {lock && (
                <span className="chip chip--locked">
                  <LockOutlined style={{ marginRight: 4 }} />
                  Locked
                </span>
              )}
            </div>
            <Typography gutterBottom variant="h6" component="h2" className="display-font">
              {`${title ?? "no title"}`}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="card-desc-clamp"
            >
              {descText}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.cardActions}>
        <Link to={`/register/${id}`} style={{ textDecoration: "none", width: "100%" }}>
          <Button
            fullWidth
            size="medium"
            color="secondary"
            variant="contained"
            disabled={!!lock}
          >
            {lock ? "Registration closed" : "Register / View details"}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
