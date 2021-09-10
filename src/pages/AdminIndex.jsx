import React, { Component } from 'react';

class AdminIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let response = fetch('/items');
    response = response.then((res) => res.json());
    response = response.then((json) => this.setState(json));
  }

  deleteItem(itemID) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      const options = {method: 'delete'}
      fetch('/items/' + itemID, options)
        .then((res) => {
          this.loadData();
        });
    }
  }

  editItem(itemID) {
    this.props.history.push('/admin/items/' + itemID + '/edit');
  }

  render() {
    const { items } = this.state;

    return (
      <div className="AdminIndex Page">
        <a href='/admin/items/new'>Add Item</a>
        <ol>
          {!items && <li>loading</li>}
          {items &&
            items.map(item => (
              <li key={item.id}>
                {item.title}
                <br/>
                {item.artist}
                <div className="AdminIndex-image">
                  <img src={item.image_url} alt={item.description} />
                </div>
                <div className="AdminIndex-button">
                  <button onClick={() => this.editItem(item.id)}>Edit</button>
                  <button onClick={() => this.deleteItem(item.id)}>Delete</button>
                </div>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default AdminIndex;
