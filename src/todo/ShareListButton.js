import React from 'react';
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
        <h5>Share list<button type="button" class="close close-share" aria-label="Close" onClick={this.onClick}>X</button></h5>

        <EmailForm list_id={this.props.list_id} />
      </div>
    }
  }

  showShareButton() {
    // if (!this.state.show) {
      return <button onClick={this.onClick} class="btn btn-primary list-button">Share</button>
    // }
  }

  render() {
    return <div>
      {this.showShareButton()}
      {this.showShareTab()}
    </div>
  }
}

export default ShareListButton