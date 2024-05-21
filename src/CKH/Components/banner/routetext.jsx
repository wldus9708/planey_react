import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin" component={AdminPage} />
                <Route path="/" component={UserPage} />
            </Switch>
        </Router>
    );
};

export default App;