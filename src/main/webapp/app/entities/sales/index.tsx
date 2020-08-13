import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Sales from './sales';
import SalesDetail from './sales-detail';
import SalesUpdate from './sales-update';
import SalesDeleteDialog from './sales-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SalesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SalesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SalesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Sales} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SalesDeleteDialog} />
  </>
);

export default Routes;
