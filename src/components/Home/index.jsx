import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Check, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "40%",
    height: "600px",
    marginTop: "5% ",
    paddingTop: "10px",
  },
  title: {},
  textInput: {
    width: "90%",
  },
  lineContainer: {
    display: "flex",
    width: "90%",
  },
  list: {
    width: "90%",
    maxHeight: "90%",
    overflow: "scroll",
  },
}));
export default function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => setEvents(res.data))
      .catch((err) => alert(err));
  }, []);
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const approveEvent = (id) => {
    axios
      .patch(`http://localhost:5000/events/${id}/waiting_approval`)
      .then((res) => {
        if (res.data.nModified === 1) {
          const newEvents = [...events];
          const event = newEvents.find((event) => event._id === id);
          event.waiting_approval = false;
          setEvents(newEvents);
          return event;
        }
      })
      .catch((err) => alert(err));
  };
  const deleteEvent = (id) => {
    axios
      .delete(`http://localhost:5000/events/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.deletedCount === 1) {
          const newEvents = [...events].filter((event) => event._id !== id);
          setEvents(newEvents);
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div className={classes.root}>
      <Paper elevation={8} className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          Pending Approval
        </Typography>
        <List className={classes.list}>
          {events.length > 0 &&
            events
              .filter((event) => event.waiting_approval === true)
              .map((event) => (
                <ListItem key={event._id}>
                  <ListItemText primary={`${event.name} (${event.date})`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => approveEvent(event._id)}
                    >
                      <Check color="primary" />
                    </IconButton>{" "}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteEvent(event._id)}
                    >
                      <Delete color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
        </List>
      </Paper>
      <Paper elevation={8} className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          Approved Events
        </Typography>
        <List className={classes.list}>
          {events.length > 0 &&
            events
              .filter((event) => event.waiting_approval !== true)
              .map((event) => (
                <ListItem key={event._id}>
                  <ListItemText primary={`${event.name} (${event.date})`} />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteEvent(event._id)}
                  >
                    <Delete color="secondary" />
                  </IconButton>
                </ListItem>
              ))}
        </List>
      </Paper>
    </div>
  );
}
