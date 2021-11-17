import React from 'react';
import { FirestoreCollection } from 'react-firestore';

class SharedList extends React.Component {
  render() {
    return (<FirestoreCollection
      path={"lists/" + this.props.list_id + "/todo"}
      sort={"text:asc"}
      render={({ isLoading, data }) => {
        if (isLoading) {
          return (<div class="list">
            <h1>Loading...</h1>
          </div>);
        } else {
          return (
            <div class="card list mx-auto">
              <h4 class="card-title">{this.props.list_name} (Shared List)</h4>
              <div class="card-body">
                <ul>
                  {data.map(todo => (
                    <li key={todo.id}>{todo.text} </li>
                  ))}
                </ul>
              </div>
              <div class="card-footer"></div>
            </div>);
        }
      }}
    />)
  }

  // This is a button just for testing
  delete_button() {
    return <button onClick={() => {
      this.props.db.collection("lists").doc(this.props.list_id).delete();
    }}>Delete this users list!!! MUAH HA HAAAA</button>
  }
}

export default SharedList