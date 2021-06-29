import React from 'react';
import firebase from "@firebase/app"
import { FirestoreCollection } from 'react-firestore';
import db from '../firebase-config'

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";

import SharedList from './SharedList'
import OwnedList from './OwnedList'

class ItemList extends React.Component {
  constructor() {
    super()
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
    db.collection("lists").add({
      owner_id: firebase.auth().currentUser.uid,
      list_name: this.state.list_name,
      read_access: [],
    })

    e.preventDefault();
  }

  getMyLists() {
    return (<FirestoreCollection
      path="lists"
      filter={['owner_id', '==', firebase.auth().currentUser.uid]}
      render={({ isLoading, data }) => {
        if (isLoading) {
          return (<div class="list">
            <h1>Loading...</h1>
          </div>);
        } else {
          return (<div>
            <h1>Your To Do Lists</h1>
            <form onSubmit={(this.handleSubmit)}>
              <h3>Make a new list!</h3>
              <input id="todo_input" type="text" value={this.state.list_name} onChange={(this.handleChange)}></input>
              <button type="submit">Create List</button>
            </form>

            <div class="card-columns">
              {data.map(list => {
                return <OwnedList list_id={list.id} list_name={list.list_name} />
              })}
            </div>
          </div>);
        }
      }}
    />);
  }

  getSharedLists() {
    return (<FirestoreCollection
      path="lists"
      filter={['read_access', 'array-contains', firebase.auth().currentUser.uid]} // Get every list where read_access contains the users UID
      render={({ isLoading, data }) => {
        if (isLoading) {
          return (<div class="list">
            <h1>Loading...</h1>
          </div>);
        } else {
          return (
            <div>
              {data.map(list => {
                if (list.owner_id != firebase.auth().currentUser.uid) {
                  return <SharedList list_id={list.id} list_name={list.list_name} />
                }
              })}
            </div>
          )
        }
      }}
    />);
  }

  render() {
    return (
      <div class="row">
        { this.getMyLists()}
        { this.getSharedLists()}
      </div>);
  }
}

export default ItemList