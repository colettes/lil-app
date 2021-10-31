import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useReducer } from "react";

import Main, { initialState, reducer } from './pages/Main';
import AdminIndex from './pages/AdminIndex';
import AdminNewItem from './pages/AdminNewItem';
import AdminEditItem from './pages/AdminEditItem';


export default function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => <Main state={state} dispatch={dispatch} />} />
        <Route exact path="/admin" render={() => <AdminIndex />} />
        <Route exact path="/admin/items/new" render={() => <AdminNewItem />} />
        <Route exact path="/admin/items/:id/edit" render={() => <AdminEditItem />} />
      </Router>
    </div>
  );
}



