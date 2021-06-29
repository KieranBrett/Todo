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

                        <div class="card-header">
                            <h4 class="card-title">{this.props.list_name}</h4>
                        </div>

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
}

export default SharedList