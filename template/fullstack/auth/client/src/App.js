import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/auth/signin" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
