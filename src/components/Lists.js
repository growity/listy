import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Item from './Item';
import { addListAsync, getListsAsync } from '../actions/lists';


class Lists extends Component {
  componentWillMount() {
    this.props.getLists();
  }

  render() {
    const { lists } = this.props;
    return (
      lists.map(list => (
        <Grid item xs={12} lg={12} md={12} sm={12} key={list.id}>
          <Item list={list} />
        </Grid>
      ))
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addList(list) {
    dispatch(addListAsync(list));
  },
  getLists() {
    dispatch(getListsAsync());
  },
});

const mapStateToProps = state => state.lists;

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
