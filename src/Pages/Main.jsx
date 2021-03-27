import React, { Component } from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch('http://localhost:3001/items')
            .then((res) => res.json())
            .then((json) => this.setState(json));
    }

    render() {
        const { items } = this.state;

        return (
            <div>
                <h1>Lil App</h1>
                <ol>
                    {!items && <li>loading</li>}
                    {items && items.map( (item) => (<li>{item}</li>))}
                </ol>
            </div>
        )
    }
}

export default Main;