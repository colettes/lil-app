import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './pages/Main';
import AdminIndex from './pages/AdminIndex';
import AdminNewItem from './pages/AdminNewItem';
import AdminEditItem from './pages/AdminEditItem';

function AppRouter() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
                <Route exact path="/admin" component={AdminIndex} />
                <Route exact path="/admin/items/new" component={AdminNewItem} /> 
                <Route exact path="/admin/items/:id/edit" component={AdminEditItem} />       
            </div>
        </Router>
    );
};

export default AppRouter;