import React, { Component } from 'react';

class TestQueue extends Component {
  componentWillReceiveProps(nextProps){
    console.log("next Props", this.props.queue)
  }

  render() {
    console.log("inside render", this.props.queue)
    return (
      <div>My Component</div>
    )
  }


}

export default TestQueue;
