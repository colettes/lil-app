import React, { useReducer, useEffect } from "react";

function PurePage(props) {
  const { items } = props.state;

  return (
    <div className="AdminIndex Page">
      <a href="/admin/items/new">Add Item</a>
      <ol>
        {!items && <li>loading</li>}
        {items &&
          items.map((item) => (
            <li key={item.id}>
              {item.title}
              <br />
              {item.artist}
              <div className="AdminIndex-image">
                <img src={item.image_url} alt={item.description} />
              </div>
              <div className="AdminIndex-button">
                <button onClick={() => props.editItem(item.id)}>Edit</button>
                <button onClick={() => props.deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}

function loadData(dispatch) {
  let response = fetch("/items");
  response = response.then((res) => res.json());
  response = response.then((json) =>
    dispatch({ type: "adminIndexReceiveItems", json })
  );
}

// TODO: history is undefined
function editItem(itemID, history) {
  history.push("/admin/items/" + itemID + "/edit");
}

function deleteItem(itemID, dispatch) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (confirmed) {
    const options = { method: "delete" };
    fetch("/items/" + itemID, options).then((res) => {
      loadData(dispatch);
    });
  }
}

export function reducer(oldState, action) {
  switch (action.type) {
    case "adminIndexReceiveItems":
      const newState = Object.assign({}, oldState, {
        items: action.json.items,
      });
      return newState;
    default:
      return oldState;
  }
}

export const initialState = {};

export function Page(props) {
  const { state, dispatch } = props;

  useEffect(() => {
    loadData(dispatch);
  }, []);

  return (
    <PurePage
      state={state}
      editItem={(itemID) => editItem(itemID, props.history)}
      deleteItem={(itemID) => deleteItem(itemID, dispatch)}
    />
  );
}
