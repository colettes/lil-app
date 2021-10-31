import React, { Component, useEffect, useReducer } from "react";
import gql from "../gql.js";
import Login from "./Login";
import { isEmpty } from "lodash";

function PureMain(props) {
  const { items } = props.state;
  console.log(props);
  const loggedIn = !isEmpty(props.state.user);
  console.log(loggedIn);

  return (
    <div className="Main Page">
      <h1>Lil App</h1>
      <Login loadData={() => props.loadData()} loggedIn={loggedIn} />
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
      <pre>{JSON.stringify(props.state, null, 2)}</pre>
    </div>
  );
}

function loadData(dispatch) {
  fetch("/me")
    .then((res) => res.json())
    .then((json) => dispatch({ type: "receiveUser", user: json }));
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((json) => dispatch({ type: "receiveItems", items: json.items }));
}

function favoriteItem(itemID, favorited, dispatch) {
  const options = {
    method: favorited ? "DELETE" : "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemID }),
  };
  fetch("/favorites", options).then(() => loadData(dispatch));
}
export const initialState = { user: {} };

function Main(props) {
  const { state, dispatch } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    loadData(dispatch);
  }, []);

  return (
    <PureMain
      state={state}
      loadData={() => loadData(dispatch)}
      favoriteItem={(itemID, itemFavorited) =>
        favoriteItem(itemID, itemFavorited, dispatch)
      }
    />
  );
}

export function reducer(oldState, action) {
  switch (action.type) {
    case "receiveUser":
      return Object.assign({}, oldState, { user: action.user });
    case "receiveItems":
      return Object.assign({}, oldState, { items: action.items });
    default:
      throw new Error();
  }
}

const FavoriteButton = (props) => {
  const { onClick, favorited } = props;
  const text = favorited ? "Unfavorite" : "Favorite";
  return <button onClick={onClick}>{text}</button>;
};

export default Main;
