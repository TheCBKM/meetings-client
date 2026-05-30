import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer">
      <span className="display-font">Meetings App</span>
      <span> · Community meetings & recordings</span>
      <br />
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
