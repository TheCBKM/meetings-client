import React from "react";
import { Typography } from "@material-ui/core";

export default function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <Typography variant="h5" component="h1" className="page-title display-font">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="textSecondary" className="page-subtitle">
          {subtitle}
        </Typography>
      )}
    </header>
  );
}
