import React from 'react';
import firebase from "@firebase/app"

import Button from '@material-ui/core/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

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
        return <>
            <TextField placeholder="List Name" label={"Make a new list!"} value={this.state.list_name} onChange={(this.handleChange)} />
            <Button color="primary" variant="contained" onClick={(this.handleSubmit)}>Submit</Button>
        </>
    }
}

export default NewList