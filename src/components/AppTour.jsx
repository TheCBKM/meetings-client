import React, { useState, useEffect } from "react";
import Tour from "reactour";
import { WELCOME_KEY } from "./WelcomeModal.jsx";

const TOUR_KEY = "meetings-app-tour-v1";

const steps = [
  {
    selector: ".tour-meetings",
    content: "Browse upcoming meetings and register for your Upasna session.",
  },
  {
    selector: ".tour-recordings",
    content: "Listen to recordings. Search by title, description, or date.",
  },
  {
    selector: ".tour-thoughts-fab",
    content: "Tap for a daily thought or inspiration.",
  },
];

export default function AppTour({ active, start }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!active || !start) return;
    if (localStorage.getItem(TOUR_KEY)) return;
    // Tour only after welcome has been seen (or was seen in a prior visit).
    if (!localStorage.getItem(WELCOME_KEY)) return;

    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, [active, start]);

  const close = () => {
    localStorage.setItem(TOUR_KEY, "1");
    setOpen(false);
  };

  if (!active) return null;

  return (
    <Tour
      steps={steps}
      isOpen={open}
      onRequestClose={close}
      accentColor="#ff0555"
      rounded={12}
      showNavigation={true}
      showNumber={true}
      lastStepNextButton={<span>Done</span>}
    />
  );
}
