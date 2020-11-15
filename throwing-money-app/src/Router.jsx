import React from 'react'
import { Route, Switch } from "react-router";
import { SignIn, SignUp, UsersList } from "./templates"
import Auth from './Auth'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />

      <Auth>
        <Route exact path="/" component={UsersList} />
      </Auth>

    </Switch>
  );
};

export default Router;