import React, { Component } from 'react';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let response = fetch('http://localhost:3000/items');
    response = response.then((res) => res.json());
    response = response.then((json) => this.setState(json));
  }

  deleteItem(itemID) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      const options = {method: 'delete'}
      fetch('http://localhost:3000/items/' + itemID, options)
        .then((res) => {
          this.loadData();
        });
      
    }
  }

  render() {
    const { items } = this.state;

    return (
      <div className="Admin Page">
        <ol>
          {!items && <li>loading</li>}
          {items &&
            items.map(item => (
              <li key={item.id}>
                {item.title}
                <div className="Admin-image">
                  <img src={item.image_url} alt={item.description} />
                </div>
                <div className="Admin-button">
                  <button onClick={() => this.deleteItem(item.id)}>Delete</button>
                </div>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default Admin;
