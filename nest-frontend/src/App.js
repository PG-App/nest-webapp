import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import AdminRoute from './authentication/AdminRoute';
import PrivateRoute from './authentication/PrivateRoute';
import StepForm from './authentication/stepForm';
import { Home } from './components/Home';
import { Hostels } from './components/Hostels';
import Navbar from './components/Navbar';
import AdminDashboard from './user/AdminDashboard';
import Dashboard from './user/UserDashboard';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/hostels' component={Hostels} />
        <Route exact path='/signup' component={StepForm} />
        <PrivateRoute exact path='/user/dashboard' component={Dashboard}/>
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
      </Fragment>
    </Router>
  );
}

export default App;