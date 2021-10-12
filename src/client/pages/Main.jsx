import React, { Component, useEffect, useReducer } from "react";
import gql from "../gql.js";
import Login from "./Login";

function PureMain(props) {
  const { items } = props.state;

  return (
    <div className="Main Page">
      <h1>Lil App</h1>
      <Login loadData={(user) => props.loadData(user)} />
      <ol>
        {!items && <li>loading</li>}
        {items &&
          items.map((item) => (
            <li key={item.id}>
              {item.title}
              {item.artist}
              <div>
                <img src={item.image_url} alt={item.description} />
              </div>
              <div>
                <FavoriteButton
                  onClick={() => props.favoriteItem(item.id, item.favorited)}
                  favorited={item.favorited}
                />
              </div>
            </li>
          ))}
      </ol>
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
    </div>
  );
}

const FavoriteButton = (props) => {
  const { onClick, favorited } = props;
  const text = favorited ? "Unfavorite" : "Favorite";
  return <button onClick={onClick}>{text}</button>;
};

function loadData2(user, dispatch) {
  fetch("/me")
    .then((res) => res.json())
    .then((json, user) => dispatch({ type: "receiveData", user: json }));
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((json) => dispatch({ type: "receiveData", json }));
}

function favoriteItem2(itemID, favorited, dispatch) {
  const options = {
    method: favorited ? "DELETE" : "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemID }),
  };
  fetch("/favorites", options).then((user) => loadData(user, dispatch));
}

function Main2(props) {
  const [state, dispatch] = useReducer(reducer, {});
  useEffect((user) => {loadData(user, dispatch);}, []);

  return(
      <PureMain
        state={state}
        loadData={(user) => loadData(user, dispatch)}
        favoriteItem={(itemID, favorited) => favoriteItem(itemID, favorited)}/>
  );
}

function reducer(oldState, action) {
  console.log(action);
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(user) {
    fetch("/me")
      .then((res) => res.json())
      .then((json) => this.setState({ user: json }));
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((json) => this.setState(json));
  }

  favoriteItem(itemID, favorited) {
    const options = {
      method: favorited ? "DELETE" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemID }),
    };
    fetch("/favorites", options).then(() => this.loadData());
  }

  render() {
    const { items } = this.state;

    return (
      <div className="Main Page">
        <h1>Lil App</h1>
        <Login loadData={(user) => this.loadData(user)} />
        <ol>
          {!items && <li>loading</li>}
          {items &&
            items.map((item) => (
              <li key={item.id}>
                {item.title}
                {item.artist}
                <div>
                  <img src={item.image_url} alt={item.description} />
                </div>
                <div>
                  <FavoriteButton
                    onClick={() => this.favoriteItem(item.id, item.favorited)}
                    favorited={item.favorited}
                  />
                </div>
              </li>
            ))}
        </ol>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

const FavoriteButton = (props) => {
  const { onClick, favorited } = props;
  const text = favorited ? "Unfavorite" : "Favorite";
  return <button onClick={onClick}>{text}</button>;
};

export default Main;
