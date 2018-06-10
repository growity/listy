import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Item from './Item';
import { getListsAsync } from '../actions/lists';


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
  getLists() {
    dispatch(getListsAsync());
  },
});

Lists.defaultProps = {
  getLists: () => {},
};

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  getLists: PropTypes.func,
};

const mapStateToProps = state => state.lists;

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
