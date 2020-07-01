import React from 'react';
import App from './Components/Layouts/App';
import './index.css';
import EventContainer from './Components/Containers/Event-container'
import AddEditPersonFormContainer from './Components/Containers/AddEditPersonForm-container'
import ExpenseFormContainer from './Components/Containers/ExpenseForm-container'
import Home from "./Components/Views/Home"
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import store from './store'
import {cleanEvent } from './actions/event-actions'

browserHistory.listen(location => {
  if(location.pathname === "/")
    store.dispatch(cleanEvent())
})

export default (
<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute hideAppBar={true} component={Home}/>
      <Route path="/event/:id" example={false} component={EventContainer} />
      <Route path="/example" example={true} component={EventContainer} />
      <Route path="/event/:eventId/person/(:personId)" component={AddEditPersonFormContainer} />
      <Route path="/event/:eventId/expense/(:expenseId)" component={ExpenseFormContainer} />
    </Route>
  </Router>
)
