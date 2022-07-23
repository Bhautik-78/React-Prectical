import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserEntry from './component/UserEntry';
import { store } from './redux/helper';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './App.css';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <div className="App">
            <Route path='/' component={UserEntry} exact={true} />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
