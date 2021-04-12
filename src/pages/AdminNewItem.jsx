import React, { Component } from 'react';
import { withRouter } from 'react-router';

class AdminNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                description: '',
                url: '',
            }
        };
    }

    createItem(e) {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
        };
        fetch('/items', options)
            .then(() => this.props.history.push('/admin'));
    }

    updateFormState(field, e) {
        const newForm = Object.assign({}, this.state.form, { [field]: e.target.value });
        this.setState({ form: newForm });
    }

    render() {
        const { form } = this.state;
        return (
            <div className="AdminNewItem Page">
                <form onSubmit={(e) => this.createItem(e)}>
                    <div>
                        <input type="text" value={form.title} placeholder="Title" onChange={(e) => this.updateFormState('title', e)} />
                    </div>
                    <div>
                        <input type="text" value={form.description} placeholder="Description" onChange={(e) => this.updateFormState('description', e)} />
                    </div>
                    <div>
                        <input type="text" value={form.url} placeholder="Image URL" onChange={(e) => this.updateFormState('url', e)} />
                    </div>
                    <div>
                        <input type="submit" value="Create" />
                    </div>
                </form>
            </div>
        );
    }
}

const AdminNewItemWithRouter = withRouter(AdminNewItem);
export default AdminNewItemWithRouter;