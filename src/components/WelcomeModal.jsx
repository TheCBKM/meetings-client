import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import {
  TeamOutlined,
  SoundFilled,
  MobileOutlined,
  SmileFilled,
  StarOutlined,
  EditOutlined,
} from "@ant-design/icons";

export const WELCOME_KEY = "meetings-app-welcome-v1";

const highlights = [
  {
    icon: <StarOutlined />,
    title: "A fresh new look",
    text: "Warm colours, cleaner cards, and a friendlier feel throughout.",
  },
  {
    icon: <MobileOutlined />,
    title: "Made for your phone",
    text: "Bottom navigation and layouts that work beautifully on mobile.",
  },
  {
    icon: <TeamOutlined />,
    title: "Meetings, made simple",
    text: "Browse sessions and register in fewer taps.",
  },
  {
    icon: <SoundFilled />,
    title: "Recordings & search",
    text: "Find talks faster with improved search and playback.",
  },
  {
    icon: <SmileFilled />,
    title: "#Thoughts",
    text: "Tap the smile button anytime for a moment of inspiration.",
  },
];

export default function WelcomeModal({ active, onComplete }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (active && !localStorage.getItem(WELCOME_KEY)) {
      const t = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, [active]);

  const handleContinue = () => {
    localStorage.setItem(WELCOME_KEY, "1");
    setOpen(false);
    onComplete?.();
  };

  if (!active) return null;

  return (
    <Modal
      open={open}
      onClose={handleContinue}
      aria-labelledby="welcome-title"
      className="welcome-modal-root"
      BackdropProps={{ className: "welcome-modal-backdrop" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflow: "auto",
      }}
    >
      <div className="welcome-card-outer">
      <Card className="welcome-card brand-card">
        <div className="welcome-card-band" aria-hidden="true" />
        <div className="welcome-card-scroll">
          <CardContent className="welcome-card-content">
            <p className="welcome-eyebrow">Something new for you</p>
            <Typography id="welcome-title" variant="h4" component="h2" className="welcome-title display-font">
              Welcome, everyone!
            </Typography>
            <Typography variant="body1" className="welcome-lead">
              We have refreshed the Meetings App with care — a new design, smoother
              experience, and little touches we hope you will enjoy.
            </Typography>

            <aside className="welcome-dev-note" aria-label="A note from the developers">
              <div className="welcome-dev-note-header">
                <EditOutlined className="welcome-dev-note-icon" aria-hidden="true" />
                <span className="welcome-dev-note-label">A note from the developers</span>
              </div>
              <p className="welcome-dev-note-body">
                Thank you for being part of this for more than five years. We launched in
                2020 — and every day since, you have chosen to show up here. That means a
                lot to us. We are happy, grateful, and glad you are with us.
              </p>
              <p className="welcome-dev-note-sign">— The Meetings App team</p>
            </aside>

            <p className="welcome-section-label">What&apos;s new</p>
            <ul className="welcome-highlights">
              {highlights.map((item) => (
                <li key={item.title} className="welcome-highlight-item">
                  <span className="welcome-highlight-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <span className="welcome-highlight-text">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="welcome-closing display-font">
              Hope you like it. <span className="welcome-naam">Take naam — be happy.</span> 🙏
            </p>
          </CardContent>
        </div>
        <CardActions className="welcome-actions">
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleContinue}
            className="welcome-cta"
          >
            Explore the new app
          </Button>
        </CardActions>
      </Card>
      </div>
    </Modal>
  );
}
