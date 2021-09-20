import React from 'react';
import firebase from "@firebase/app"

import Button from '@material-ui/core/Button';

class NewList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list_name: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            list_name: e.target.value
        })
    }

    handleSubmit(e) {
        this.props.db.collection("lists").add({
            owner_id: firebase.auth().currentUser.uid,
            list_name: this.state.list_name,
            read_access: [],
        })

        e.preventDefault();
    }

    render() {
        return <form onSubmit={(this.handleSubmit)} class="new-list">
            <h3>Make a new list!</h3>
            <input id="todo_input" type="text" value={this.state.list_name} onChange={(this.handleChange)}></input>
            <Button color="primary" variant="contained" type="submit">Submit</Button>
        </form>
    }
}

export default NewList