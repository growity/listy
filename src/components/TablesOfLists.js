import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TableItem from './TableItem';
import { addListAsync, getListsAsync } from '../actions/lists';


class TableOfLists extends Component {
  constructor(props) {
    super(props);
    props.getLists();
  }

  render() {
    const { lists } = this.props;
    return (
      lists.map(list => (
        <Grid item xs={12} lg={12} md={12} sm={12} key={list.id}>
          <TableItem list={list} />
        </Grid>
      ))
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addList(listArgument) {
    dispatch(addListAsync(listArgument));
  },
  getLists() {
    dispatch(getListsAsync());
  },
});

const mapStateToProps = state => state.lists;

export default connect(mapStateToProps, mapDispatchToProps)(TableOfLists);
