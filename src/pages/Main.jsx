import React, { Component } from 'react';
import gql from '../client/gql.js';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('http://localhost:3000/items')
            .then((res) => res.json())
            .then((json) => this.setState(json));
        
        gql('{ hello }', (result) => console.log(result));
    };

    favoriteItem(itemID, favorited) {
        const options = {
            method: favorited ? 'DELETE' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemID})
        };
        fetch('/favorites', options)
            .then(() => this.loadData());
    }

    render() {
        const { items } = this.state;

        return (
            <div className="Main Page">
                <h1>Lil App</h1>
                <ol>
                    {!items && <li>loading</li>}
                    {items && items.map( (item) => (
                    <li key={item.id}>
                        {item.title}
                        <div>
                            <img src={item.image_url} alt={item.description}/>
                        </div>
                        <div>
                            <FavoriteButton onClick={() => this.favoriteItem(item.id, item.favorited)} favorited={item.favorited}/>
                        </div>
                    </li>))}
                </ol>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        );
    };
}

const FavoriteButton = (props) => {
    const { onClick, favorited } = props;
    const text = favorited ? 'Unfavorite' : 'Favorite';
    return (
        <button onClick={ onClick }>{text}</button>
    );
}

export default Main;