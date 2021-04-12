import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './pages/Main';
import AdminIndex from './pages/AdminIndex';
import AdminNewItem from './pages/AdminNewItem';

function AppRouter() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
                <Route exact path="/admin" component={AdminIndex} />
                <Route exact path="/admin/items/new" component={AdminNewItem} />            </div>
        </Router>
    );
};

export default AppRouter;