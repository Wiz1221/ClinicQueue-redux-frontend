import React, {Component} from 'react';

class QueueItemInAccount extends Component{

  onClick = () => {
    this.props.deleteQueueButton(this.props.queue);
  }

  render(){
    return(
      <div className="queueItem">
        <img src={this.props.queue.pic} />
        <div>{this.props.queue.clinic.properties.name_full}</div>
        <div>{this.props.queue.comment}</div>
        <button onClick={this.onClick}>Delete this post</button>
      </div>
    )
  }
}

export default QueueItemInAccount;
