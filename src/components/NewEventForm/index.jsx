import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Snackbar,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Api from "../../service/Api";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "50%",
    height: "600px",
    marginTop: "5% ",
  },
  title: {
    flexGrow: 1,
  },
  textInput: {
    width: "90%",
  },
  lineContainer: {
    display: "flex",
    width: "90%",
  },
  button: {
    width: "50%",
    height: "56px",
    marginTop: "20px",
  },
}));
export default function NewEventForm() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [name, setName] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2020-06-15");
  const handleFormSubmit = () => {
    const newEvent = {
      name,
      social_media_link: socialMediaLink,
      date,
      description,
    };
    setIsWaitingResponse(true);
    axios
      .post("http://localhost:5000/events", newEvent)
      .then((res) => {
        console.log(res);
        setOpen(true);
        setIsWaitingResponse(false);
      })
      .catch((err) => console.log(err));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={8} className={classes.paper}>
        <div className={classes.lineContainer}>
          <TextField
            style={{ width: "70%" }}
            variant="outlined"
            label="Nome do Evento"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            style={{ width: "25%", marginLeft: "5%" }}
            label="Data do Evento"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <TextField
          className={classes.textInput}
          variant="outlined"
          label="Link de Midia Social"
          value={socialMediaLink}
          onChange={(e) => setSocialMediaLink(e.target.value)}
        />
        <TextField
          className={classes.textInput}
          variant="outlined"
          label="Descriçao do Evento"
          multiline={true}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Paper>
      <Button
        onClick={handleFormSubmit}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        {isWaitingResponse ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Criar Evento"
        )}
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Evento criado com sucesso!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
