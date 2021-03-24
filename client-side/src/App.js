import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddVacation from './components/AddVacation';
import Chart from './components/Chart';
import HeaderBar from './components/HeaderBar';
import {LogCheck} from './components/LogCheck';
import Login from './components/Login';
import Signin from './components/Signin';
import Vacations from './components/Vacations';

function App() {

  return (
    <Router>
<LogCheck /> 
<HeaderBar />
<Route path="/signin" component={Signin}/>
<Route path="/login" component={Login}/>
<Route path="/vacations" component={Vacations}/>
<Route path="/add" component={AddVacation}/>
<Route path="/chart" component={Chart} />
</Router>
  );
}

export default App;



