import React, {Component} from 'react';
import { connect } from 'react-redux';



class UserQueueGallery extends Component {
  constructor(props) {
    super(props);
  }

  deleteQueue = () => {

  }

  renderQueue = () => {
    // if(this.props.user.queue){
    //   let queueFromUserArray = [...this.props.queue].filter((queue,index) => {
    //     return queue.user === this.props.user._id;
    //   })
    //   return queueFromUserArray.map((queue,index) => {
    //     return (
    //       //<QueueItemInAccount queue={queue} deleteQueue={this.deleteQueue}/>
    //     )
    //   })
    // }else{
    //   return (<div>you have not posted any queue</div>);
    // }

  }

  render() {
    let queue = this.renderQueue()
    return (
      <div>
        {queue}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    clinic: state.clinic,
    queue: state.queue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getReviewOfUser: (user_id) => { dispatch(getReviewOfUser(user_id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserQueueGallery);
