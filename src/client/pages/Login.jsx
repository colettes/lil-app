import React, {Component} from 'react';

class Login extends Component {
    login() {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: 'Colette', password: 'password'})
        };
        fetch('/login', options)
            .then(() => this.props.loadData());
    };

    render() {
        return(
            <button onClick={() => this.login()}>login</button>
        );
    }
}

export default Login;