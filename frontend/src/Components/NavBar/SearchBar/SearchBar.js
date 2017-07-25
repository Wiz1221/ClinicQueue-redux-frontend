import React, {Component} from 'react';
import { connect } from 'react-redux';
import TypeAhead from 'react-bootstrap-typeahead';

class SearchBar extends Component {

  render() {

    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
