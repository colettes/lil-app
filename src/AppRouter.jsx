import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './Pages/Main'

function AppRouter() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
            </div>
        </Router>
    );
};

export default AppRouter;