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
<<<<<<< HEAD
              <h4 class="card-title">{this.props.list_name} (Shared List)</h4>
=======

              <div class="card-header">
                <h4 class="card-title">{this.props.list_name}</h4>
                
                {/* Make sure this is only used when testing firebase rules, not to be deployed */}
                {/* { this.delete_button()} */}

              </div>

>>>>>>> f444b2bddde396377806bdaa4a692ca9c6738423
              <div class="card-body">
                <ul>
                  {data.map(todo => (
                    <li key={todo.id}>{todo.text} </li>
                  ))}
                </ul>
              </div>
<<<<<<< HEAD
=======

>>>>>>> f444b2bddde396377806bdaa4a692ca9c6738423
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