import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import firebase from "@firebase/app"
import db from '../firebase-config';
import EmailForm from './EmailForm';

class ShareListButton extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false,
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    this.setState({
      show: !this.state.show,
    })
  }

  showShareTab() {
    if (this.state.show) {
      return <div class="share-box">
        <h5>Share list</h5>
        <EmailForm list_id={this.props.list_id} />
      </div>
    }
  }

  render() {
    return <div>
      <button onClick={this.onClick} class="btn btn-primary">Share</button>
      {this.showShareTab()}
    </div>
  }
}

export default ShareListButton