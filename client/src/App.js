import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import AdminRoute from './authentication/AdminRoute';
import PrivateRoute from './authentication/PrivateRoute';
import StepForm from './authentication/stepForm';
import { Home } from './components/Home';
import { PGs } from './components/PGs';
import Navbar from './components/Navbar';
import AdminDashboard from './user/AdminDashboard';
import Dashboard from './user/UserDashboard';
import { CreateCity } from './admin/CreateCity';
import { CreateHostel } from './admin/CreateHostel';
import { HostelForm } from './admin/HostelForm';
import { NotFound } from './404/NotFound';
import SigninStepForm from './authentication/signin/SigninStepForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/pgs' component={PGs} />
        <Route exact path='/signup' component={StepForm} />
        <Route exact path='/signin' component={SigninStepForm} />
        <PrivateRoute exact path='/user/dashboard' component={Dashboard} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/create/city' component={CreateCity} />
        <AdminRoute exact path='/create/hostel' component={CreateHostel} />
        <AdminRoute exact path='/create/hostel/:cityId' component={HostelForm} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;