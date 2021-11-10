import React from 'react';
import firebase from "@firebase/app"
import { FirestoreCollection } from 'react-firestore';

// import './list.css'

import SharedList from './SharedList'
import OwnedList from './OwnedList'
import NewList from './NewList';

import { Container } from '@material-ui/core';
import { Typography } from '@mui/material';

class ToDo extends React.Component {
  getMyLists() {
    return (<FirestoreCollection
      path="lists"
      filter={['owner_id', '==', firebase.auth().currentUser.uid]}
      render={({ isLoading, data }) => {
        if (isLoading) {
          return (<div>
            <h1>Loading...</h1>
          </div>);
        } else {
          if (data.length > 0) {
            return (<div>
              <NewList db={this.props.db} />
                {data.map(list => {
                  return <OwnedList db={this.props.db} list_id={list.id} list_name={list.list_name} />
                })}
            </div>);
          }
          else {
            return <div >
              <h1>No Lists</h1>
              <NewList db={this.props.db} />
            </div>
          }
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
          return (<div class="list-pane">
            <h1>Loading...</h1>
          </div>);
        } else {
          if (data.length > 0) {
            return <div>
              <Typography>Shared Lists</Typography>
              <div>
                {data.map(list => {
                  return <SharedList list_id={list.id} list_name={list.list_name} />
                })}
              </div>
            </div>
          }
          else {
            return <div>
              <h6>Shared lists will appear here</h6>
            </div>
          }
        }
      }}
    />);
  }

  render() {
    return <Container>
      {this.getMyLists()}
      {this.getSharedLists()}
    </Container>
  }
}

export default ToDo