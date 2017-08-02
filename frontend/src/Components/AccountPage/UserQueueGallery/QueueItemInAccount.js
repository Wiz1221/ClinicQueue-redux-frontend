import React, {Component} from 'react';

import './QueueItemInAccount.css';

class QueueItemInAccount extends Component{

  dateParse = (date,offsethours) => {
    const newDate = new Date(date)// + offsethours*60*60*1000
    let mth = parseInt(newDate.getMonth()) + 1
    const datev = newDate.getDate() + '-' + mth.toString() + '-' + newDate.getFullYear() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' +newDate.getSeconds()
    return datev;
  }

  queueBorderParse = (status) => {
    switch(status) {
      case 'Very Busy':
        return "vbusy-border";
        break;
      case 'Busy':
        return "busy-border";
        break;
      case 'Normal':
        return "normal-border";
        break;
      case 'Light':
        return "light-border";
        break;
      default:
        return "normal-border";
        break;
    }
  }

  queueClassParse = (status) => {
    switch(status) {
      case 'Very Busy':
        return "vbusy";
        break;
      case 'Busy':
        return "busy";
        break;
      case 'Normal':
        return "normal";
        break;
      case 'Light':
        return "light";
        break;
      default:
        return "normal";
        break;
    }
  }

  onClick = () => {
    this.props.deleteQueueButton(this.props.queue);
  }

  render(){
    const queue = this.props.queue;
    return(
      <div className={"queueItem "+ this.queueBorderParse(queue.status) + " container"}>
      <a className="boxclose" onClick={this.onClick}></a>
        <div className="queue-image">
          <img src={queue.pic} />
        </div>
        <div>For {queue.clinic.properties.name_full}</div>
        <p className="queue-timestamp">Submitted at {this.dateParse(queue.createdAt,8)}</p>
        <p className="queue-comments">"{queue.comment}"</p>
        {
          queue.status ?
          <div className= {"queue-status " + this.queueClassParse(queue.status)}>{queue.status}</div> : null
        }
      </div>

    )
  }
}

export default QueueItemInAccount;
