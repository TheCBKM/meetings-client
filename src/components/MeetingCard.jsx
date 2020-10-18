import React from "react";
import { Card, Button } from "antd";
import { Link } from "@reach/router";

export default function MeetingCard(props) {
  const { title, mid, id, desc } = props.meeting;
  return (
    <div style={{ marginTop: 20 }}>
      <Card title={`${title ?? "no title"}`}>
        <p>
          {desc}
        </p>
        <Link to={`/register/${id}`}>
          <Button>Click to View or Register</Button>
        </Link>
      </Card>
    </div>
  );
}
