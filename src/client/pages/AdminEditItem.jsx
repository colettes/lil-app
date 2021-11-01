import React, { Component, useReducer, useEffect } from "react";
import { cloneDeep } from "lodash";

export const initialState = {
  form: {
    title: "",
    description: "",
    url: "",
    artist: "",
  },
};

function PurePage(props) {
  const { form } = props.state;
  return (
    <div className="AdminNewItem Page">
      <form onSubmit={(e) => props.updateItem(e)}>
        <div>
          <input
            type="text"
            value={form.title}
            placeholder="Title"
            onChange={(e) => props.updateField("title", e)}
          />
        </div>
        <div>
          <input
            type="text"
            value={form.description}
            placeholder="Description"
            onChange={(e) => props.updateField("description", e)}
          />
        </div>
        <div>
          <input
            type="text"
            value={form.image_url}
            placeholder="Image URL"
            onChange={(e) => props.updateField("image_url", e)}
          />
        </div>
        <div>
          <input
            type="text"
            value={form.artist}
            placeholder="Artist"
            onChange={(e) => props.updateField("artist", e)}
          />
        </div>
        <div>
          <input type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
}

function updateItem(e, state, history, id) {
  e.preventDefault();
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state.form),
  };
  fetch("/items/" + id, options).then(() => history.push("/admin"));
}

function fetchItem(id, dispatch) {
  fetch("/items/" + id)
    .then((res) => res.json())
    .then((json) => dispatch({ type: "updateFormState", fields: json.item }));
}

export function Page(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const id = props.match.params.id;

  useEffect(() => {
    fetchItem(id, dispatch);
  }, [id]);

  return (
    <PurePage
      state={state}
      updateField={(fieldName, e) =>
        dispatch({
          type: "updateFormState",
          fields: { [fieldName]: e.target.value },
        })
      }
      updateItem={(e) => updateItem(e, state, props.history, id)}
    />
  );
}

export function reducer(oldState, action) {
  switch (action.type) {
    case "updateFormState":
      const newState = {
        form: Object.assign({}, oldState.form, action.fields),
      };
      return newState;
    default:
      return oldState;
  }
}
