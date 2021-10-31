import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useReducer } from "react";

import * as Main from './pages/Main';
import * as AdminIndex from './pages/AdminIndex';
import AdminNewItem from './pages/AdminNewItem';
import AdminEditItem from './pages/AdminEditItem';


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => <Main.Page state={state.main} dispatch={dispatch} />} />
        <Route exact path="/admin" render={() => <AdminIndex.Page state={state.adminIndex} dispatch={dispatch} />} />
        <Route exact path="/admin/items/new" render={() => <AdminNewItem />} />
        <Route exact path="/admin/items/:id/edit" render={() => <AdminEditItem />} />
      </Router>
    </div>
  );
}

const initialState = {
  main: Main.initialState,
  adminIndex: AdminIndex.initialState
};

function reducer(oldState, action) {
  const newState = {
    main: Main.reducer(oldState.main, action),
    adminIndex: AdminIndex.reducer(oldState.adminIndex, action)
  };
  console.log(newState)
  return (newState);
}




