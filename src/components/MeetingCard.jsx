import React from "react";
import { Link } from "@reach/router";
import { Card, CardActions, Button, CardActionArea, Typography, makeStyles, CardContent } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },

});
export default function MeetingCard(props) {
  const classes = useStyles();

  const { title, mid, id, desc } = props.meeting;
  return (
    <div style={{ marginTop: 20 }}>

      <Card className={classes.root}>
        <CardActionArea>
        
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
            {`${title ?? "no title"}`}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Link to={`/register/${id}`}>

          <Button  size="small" color="secondary">
          View  
        </Button>
        <Button  size="small" color="secondary">
          Register
        </Button>
        </Link>

        </CardActions>
      </Card>
     
    </div>
  );
}
