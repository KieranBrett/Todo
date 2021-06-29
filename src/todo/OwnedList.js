import React from 'react';
import { FirestoreCollection } from 'react-firestore';

import ShareListButton from './ShareListButton';

class OwnedList extends React.Component {
    constructor() {
        super()
        this.state = {
            todo: [],
            owner_id: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            todo: e.target.value
        })
    }

    handleSubmit(e) {
        this.props.db.collection("lists").doc(this.props.list_id).collection("todo").add({
            text: this.state.todo
        })

        this.setState({
            todo: ''
        })

        e.preventDefault();
    }

    displayList() {
        return (<FirestoreCollection
            path={"lists/" + this.props.list_id + "/todo"}
            sort={"text:asc"}
            render={({ isLoading, data }) => {
                if (isLoading) {
                    return (<div class="card list mx-auto">
                        <h2>Loading List...</h2>
                    </div>);
                } else {
                    return (<div class="card list mx-auto">

                        <div class="card-header">
                            <h4 class="card-title">{this.props.list_name}</h4>
                        </div>

                        <div class="card-body">
                            <ul>
                                {data.map(todo => (
                                    <li class="todo-li" key={todo.id} onClick={(e) => {
                                        this.props.db.collection("lists").doc(this.props.list_id).collection("todo").doc(todo.id).delete()
                                    }}>
                                        {todo.text}
                                    </li>
                                ))}
                            </ul>

                            <form onSubmit={(this.handleSubmit)} class="todo-form">
                                <input id="todo_input" type="text" value={this.state.todo} onChange={(this.handleChange)}></input>
                                <button class="btn btn-success list-button" type="submit">Add</button>
                            </form>
                        </div>

                        <div class="card-footer">
                            <div class="row">
                                <ShareListButton list_id={this.props.list_id} />
                                <button class="btn btn-danger list-button" onClick={(e) => {
                                    this.props.db.collection('lists').doc(this.props.list_id).collection('todo').get().then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            doc.ref.delete();
                                        });
                                    });

                                    this.props.db.collection("lists").doc(this.props.list_id).delete()
                                }}>Delete List</button>
                            </div>
                        </div>
                    </div>);
                }
            }}
        />)
    }

    render() {
        return (<div>
            { this.displayList()}
        </div>)
    }
}

export default OwnedList