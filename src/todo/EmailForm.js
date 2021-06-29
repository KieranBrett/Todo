import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import firebase from "@firebase/app"
import db from '../firebase-config';

class EmailForm extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            shared: false,
            message: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            email: e.target.value,
            shared: this.state.shared,
            message: '',
        })
    }

    handleSubmit(e) {
        console.log("Sharing with " + this.state.email);

        db.collection("users").where("email", "==", this.state.email).get().then((querySnapshot) => {

            if (querySnapshot.size >= 1) {
                querySnapshot.forEach((user) => {
                    db.collection("lists").doc(this.props.list_id).update({
                        read_access: firebase.firestore.FieldValue.arrayUnion(user.id)
                    })
                });

                this.setState({
                    email: this.state.email,
                    shared: this.state.shared,
                    message: "Shared with " + this.state.email,
                })
            }
            else {
                this.setState({
                    email: this.state.email,
                    shared: this.state.shared,
                    message: this.state.email + " does not exist",
                })
            }

        })
            .catch((error) => {
                this.setState({
                    email: this.state.email,
                    shared: this.state.shared,
                    message: "There was an unexpected error",
                })
            });

        e.preventDefault();
    }

    render() {
        return <form onSubmit={(this.handleSubmit)}>
            <h5>Enter email:</h5>
            <h6>{ this.state.message }</h6>
            <input id="todo_input" type="text" value={this.state.email} onChange={(this.handleChange)}></input>
            <button class="btn btn-success" type="submit">Share!</button>
        </form>
    }
}

export default EmailForm