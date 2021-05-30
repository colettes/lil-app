import React, { Component } from 'react';

class AdminEditItem extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            form: {
                title: '',
                description: '',
                url: '',
            }
        };
    }

    componentDidMount() {
        fetch('/items/' + this.id)
            .then((res) => res.json())
            .then((json) => this.updateForm(json.item));
    }

    updateForm(item) {
        this.setState({
            form: {
                title: item.title,
                description: item.description,
                url: item.image_url,
            }
        });
    }

    updateField(field, e) {
        const newForm = Object.assign({}, this.state.form, { [field]: e.target.value });
        this.setState({ form: newForm });
    }

    updateItem(e) {
        e.preventDefault();
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
        };
        fetch('/items/' + this.id, options)
            .then(() => this.props.history.push('/admin'));
    }

    render() {
        const { form } = this.state;
        return (
            <div className="AdminNewItem Page">
                <form onSubmit={(e) => this.updateItem(e)}>
                    <div>
                        <input type="text" value={form.title} placeholder="Title" onChange={(e) => this.updateField('title', e)} />
                    </div>
                    <div>
                        <input type="text" value={form.description} placeholder="Description" onChange={(e) => this.updateField('description', e)} />
                    </div>
                    <div>
                        <input type="text" value={form.url} placeholder="Image URL" onChange={(e) => this.updateField('url', e)} />
                    </div>
                    <div>
                        <input type="submit" value="Update" />
                    </div>
                </form>
            </div>
        );
    }
}
export default AdminEditItem;