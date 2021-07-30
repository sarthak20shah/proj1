import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Link, Route } from "react-router-dom";
import EditableTable from "./components/EditableTable";
import Head from "./components/Head";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/header" component={Head} exact />
        <Route path="/table" component={EditableTable} exact />
        <Route path="/signup" component={Signup} exact />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
