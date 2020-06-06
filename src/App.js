import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NewEventForm from "./components/NewEventForm";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/events/new">
          <NewEventForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
