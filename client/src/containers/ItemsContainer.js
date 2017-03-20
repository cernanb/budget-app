import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/itemActions.js'
import { Link } from 'react-router';
import Assets from '../components/Assets';
import Liabilities from '../components/Liabilities'

class ItemsContainer extends Component {

  componentDidMount(){
    if (this.props.items.length === 0) {
      console.log('in component did mount')
      this.props.actions.fetchItems();
    }
  }

  const assets = this.props.items.filter(item => item.amount >= 0);
  const liabilities = this.props.items.filter(item => item.amount < 0);

  render() {
    return (
      <div>
        <div className='col-lg-12'>
          <Assets assets={assets} />
          <Liabilities liabilities={liabilities} />
          <Link to="/items/new">Add a New Item</Link>
        </div>
      </div>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    items: state.items
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: bindActionCreators(fetchItems, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
