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

function Login(props) {
    return <button onClick={() => login(props.loadData)}>login</button>;
}

export default Login;