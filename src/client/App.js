import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useReducer } from "react";

import * as Main from './pages/Main';
import * as AdminIndex from './pages/AdminIndex';
import * as AdminNewItem from './pages/AdminNewItem';
import * as AdminEditItem from './pages/AdminEditItem';


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => <Main.Page state={state.main} dispatch={dispatch} />} />
        <Route exact path="/admin" render={() => <AdminIndex.Page state={state.adminIndex} dispatch={dispatch} />} />
        <Route exact path="/admin/items/new" render={() => <AdminNewItem state={state.adminNewItem} dispatch={dispatch} />} />
        <Route exact path="/admin/items/:id/edit" render={() => <AdminEditItem state={state.adminEditItem} dispatch={dispatch} />} />
      </Router>
    </div>
  );
}

const initialState = {
  main: Main.initialState,
  adminIndex: AdminIndex.initialState,
  adminNewItem: AdminNewItem.initialState,
  adminEditItem: AdminEditItem.initialState
};

function reducer(oldState, action) {
  const newState = {
    main: Main.reducer(oldState.main, action),
    adminIndex: AdminIndex.reducer(oldState.adminIndex, action),
    adminNewItem: AdminNewItem.reducer(oldState.adminNewItem, action),
    adminEditItem: AdminEditItem.reducer(oldState.adminEditItem, action)
  };
  console.log(newState, 1)
  return (newState);
}




