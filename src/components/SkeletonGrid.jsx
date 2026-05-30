import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";

export default function SkeletonGrid({ count = 6 }) {
  return (
    <Grid container spacing={3} className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Card className="skeleton-card brand-card">
            <CardContent>
              <div className="skeleton-line skeleton-line--short" />
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-line--medium" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
