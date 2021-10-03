import React, { Component, useReducer } from 'react';
import { useHistory } from "react-router-dom";
import { cloneDeep, trim } from 'lodash';

function PureAdminNewItem(props) {
    return (
        <div className="AdminNewItem Page">
            <form onSubmit={(e) => props.createItem(e)}>
                <div>
                    <input type="text" value={props.state.form.title} placeholder="Title" onChange={(e) => props.updateFormState('title', e)} />
                </div>
                <div>
                    <input type="text" value={props.state.form.description} placeholder="Description" onChange={(e) => props.updateFormState('description', e)} />
                </div>
                <div>
                    <input type="text" value={props.state.form.url} placeholder="Image URL" onChange={(e) => props.updateFormState('url', e)} />
                </div>
                <div>
                    <input type="text" value={props.state.form.artist} placeholder="Artist" onChange={(e) => props.updateFormState('artist', e)} />
                </div> 
                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        </div>
    );
}

const initialState = {
    form: {
        title: '',
        description: '', 
        url: '',
        artist: '',
    }
};

function reducer(oldState, action) {
    switch(action.type) {
        case 'updateFormState':
            const newState = cloneDeep(oldState);
            newState.form[action.fieldName] = trim(action.fieldValue);
            console.log(action);
            return(newState);
        default:
            throw new Error('Unknown action type!');
    }
};
function useAdminNewItem(){
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const updateFormState = (fieldName, e) => dispatch({type:'updateFormState', fieldName:fieldName, fieldValue:e.target.value});
    
    return(
        {
            state, 
            updateFormState, 
            createItem: (e) => createItem(history, state, e)
        }
    );
}
function AdminNewItem() {
    const {state, updateFormState, createItem} = useAdminNewItem();

    return(
        <PureAdminNewItem 
            state={state} 
            createItem={createItem} 
            updateFormState={updateFormState}
        />
    );
}

function createItem(history, state, e) {
    e.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.form)
    };
    fetch('/items', options)
        .then(() => history.push('/admin'));
}

export default AdminNewItem;