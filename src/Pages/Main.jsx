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
            <div className="Main">
                <h1>Lil App</h1>
                <ol>
                    {!items && <li>loading</li>}
                    {items && items.map( (item) => (
                    <li>{item.title}<br/>
                        <img src={item.image_url} alt={item.description}/>
                    </li>))}
                </ol>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        );
    };
}

export default Main;