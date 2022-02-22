import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import JobOrders from '../views/JobOrders';
import OrderView from '../views/OrderView';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Orders">
          <JobOrders />
        </Route>
        <Route exact path="/Order:job">
          <OrderView />
        </Route>
      </Switch>
    </>
  );
}
