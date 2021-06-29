import React from 'react';
import { FirestoreCollection } from 'react-firestore';

class SharedList extends React.Component {
    render() {
        return (<FirestoreCollection
            path={"lists/" + this.props.list_id + "/todo"}
            render={({ isLoading, data }) => {
              if (isLoading) {
                return (<div class="col-xs-6">
                  <h1>Loading...</h1>
                </div>);
              } else {
                return (<div class="col-xs-6 list">
                  <h1 class="active">{ this.props.list_name }</h1>
                  <ul>
                    {data.map(todo => (
                      <li key={todo.id}>
                        {todo.text}
                      </li>
                    ))}
                  </ul>
                </div>);
              }
            }}
          />)
    }
}

export default SharedList