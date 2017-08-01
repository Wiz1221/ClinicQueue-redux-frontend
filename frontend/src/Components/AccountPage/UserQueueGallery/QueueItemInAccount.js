import React, {Component} from 'react';

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
      <div className="queueItemContainer">
      <a href="#" class="close-thin">×</a>
      <div className="queueItem">
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
        <span class="pull-right clickable" data-effect="fadeOut"><i class="fa fa-times"></i></span>
        <button onClick={this.onClick}>Delete this post</button>
      </div>
      </div>
    )
  }
}

// <div>
// {queue.user.role =="clinicAdmin" ?
// (<div className={"queueItem "+ this.queueBorderParse(queue.status) + " container"}>
//  <div className="queue-image">
//     <img src={queue.pic} />
// </div>
// <p className="queue-timestamp">Submitted at {this.dateParse(queue.createdAt,8)}</p>
// <p className="queue-comments">"{queue.comment}"</p>
// <div className= {"queue-status " + this.queueClassParse(queue.status)}>{queue.status}</div>
// </div>) :
// (<div className="queueItem container">
//  <div className="queue-image">
//     <img src={queue.pic} />
// </div>
// <p className="queue-timestamp">Submitted at {this.dateParse(queue.createdAt,8)}</p>
//   <p className= "queue-user">by @{queue.user.username}</p>
//   <p className="queue-comments">"{queue.comment}"</p>
// </div>
// )}
// </div>

export default QueueItemInAccount;
