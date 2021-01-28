import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Error from './components/Error';
import Post from './components/Post';
import Create from './components/Create';
import CreateBlog from './components/CreateBlog';

function App() {
  return (
    <div className="app">
      <Router>           
        <Switch>
          <Route exact path='/' component={Home}  />
          <Route component={Create} path='/blog' />
          <Route path='/:slug' component={Post} />
          <Route path='/404' component={Error}  />
g         
        
        </Switch>
      
    </Router>
      
    </div>
  );
}

export default App;
