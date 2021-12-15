import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './component/Home';
import CreateEmployee from './component/CreateEmployee'
import ViewEmployee from './component/ViewEmployee'

function App() {   

  return (
      <div className="container">
          {/* <Menu open>
              <MenuItem>Create</MenuItem>
              <MenuItem>View</MenuItem>
          </Menu> */}
          <Router>
              <div className="col-md-12">
                  <Switch>
                      <Route path="/" exact component={Home} />
                      <Route path="/create" component={CreateEmployee} />
                      <Route path="/view" component={ViewEmployee} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
