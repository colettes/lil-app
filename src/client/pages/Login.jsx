import React, {Component} from 'react';

function login(loadData) {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: 'Colette', password: 'password'})
    };
    fetch('/login', options)
        .then(() => loadData());
};

function logout(loadData) {
    fetch('/logout', {method: 'POST'})
        .then(() => loadData());
}

function Login(props) {
    if (props.loggedIn) {
        return <button onClick={() => logout(props.loadData)}>Log Out</button>
    } else {
        return <button onClick={() => login(props.loadData)}>Log In</button>
    }
}

export default Login;