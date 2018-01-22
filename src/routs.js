import React from 'react';

import { Route, Switch, } from 'react-router-dom';

import Chat from './components/Chat/Chat';
import Programs from './components/Programs/Programs';
import Home from './components/Home/Home';
import GroupPage from './components/GroupPage/GroupPage';

const Routs = () => (
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  )

export default Routs;