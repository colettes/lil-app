import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './pages/Main'
import Admin from './pages/Admin'

function AppRouter() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
                <Route exact path="/admin" component={Admin} />
            </div>
        </Router>
    );
};

export default AppRouter;