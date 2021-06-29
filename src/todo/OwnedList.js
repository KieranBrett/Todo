import React from 'react';
import firebase from "@firebase/app"
import { FirestoreCollection } from 'react-firestore';

import db from '../firebase-config'
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
        db.collection("lists").doc(this.props.list_id).collection("todo").add({
            text: this.state.todo
        })

        e.preventDefault();
    }

    displayList() {
        return (<FirestoreCollection
            path={"lists/" + this.props.list_id + "/todo"}
            render={({ isLoading, data }) => {
                if (isLoading) {
                    return (<div class="list list-card">
                        <h2>Loading...</h2>
                    </div>);
                } else {
                    return (<div class="card list-card list">
                        <h3 class="active">{this.props.list_name}</h3>
                        <ul>
                            {data.map(todo => (
                                <li class="todo-li" key={todo.id}>
                                    {todo.text}

                                    <button class="btn btn-danger del-btn" onClick={() => {
                                        db.collection("lists").doc(this.props.list_id).collection("todo").doc(todo.id).delete()
                                    }}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        {/* Add Button */}
                        <form onSubmit={(this.handleSubmit)}>
                            <h5>Add new ToDo</h5>
                            <input id="todo_input" type="text" value={this.state.todo} onChange={(this.handleChange)}></input>
                            <button class="btn btn-success" type="submit">Add Item</button>
                        </form>
                        <button class="btn btn-danger" onClick={(e) => {
                            db.collection("lists").doc(this.props.list_id).delete()
                            e.preventDefault();
                        }}>Delete</button>

                        <ShareListButton list_id={this.props.list_id}/>
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