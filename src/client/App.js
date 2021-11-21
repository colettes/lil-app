import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useReducer } from "react";

import * as Main from './pages/Main';
import * as AdminIndex from './pages/AdminIndex';
import * as AdminNewItem from './pages/AdminNewItem';
import * as AdminEditItem from './pages/AdminEditItem';
import { SideBar } from './components/SideBar';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={(props) => <Main.Page state={state.main} dispatch={dispatch} {...props} />} />
        <Route exact path="/admin" render={(props) => <AdminIndex.Page state={state.adminIndex} dispatch={dispatch} {...props} />} />
        <Route exact path="/admin/items/new" render={(props) => <AdminNewItem.Page state={state.adminEditItem} dispatch={dispatch} {...props} />} />
        <Route exact path="/admin/items/:id/edit" render={(props) => <AdminEditItem.Page state={state.adminEditItem} dispatch={dispatch} {...props} />} />
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
  console.log(newState)
  return (newState);
}




