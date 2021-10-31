import React, { Component, useEffect, useReducer } from "react";
import gql from "../gql.js";
import Login from "./Login";
import { isEmpty } from "lodash";

function PurePage(props) {
  const { items } = props.state;
  const loggedIn = !isEmpty(props.state.user);

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
    .then((json) => dispatch({ type: "mainReceiveUser", user: json }));
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((json) => dispatch({ type: "mainReceiveItems", items: json.items }));
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

export function Page(props) {
  const { state, dispatch } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    loadData(dispatch);
  }, []);

  return (
    <PurePage
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
    case "mainReceiveUser":
      return Object.assign({}, oldState, { user: action.user });
    case "mainReceiveItems":
      return Object.assign({}, oldState, { items: action.items });
    default:
      return oldState;
  }
}

const FavoriteButton = (props) => {
  const { onClick, favorited } = props;
  const text = favorited ? "Unfavorite" : "Favorite";
  return <button onClick={onClick}>{text}</button>;
};
