import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { addListAsync, getListsAsync } from '../actions/lists';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
});

class ListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      symbol: '',
      id: new Date(),
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
  }

  componentWillMount() {
    this.props.getLists();
  }

  handleButton() {
    this.props.addList({
      title: this.state.title,
      symbol: this.state.symbol,
      id: this.state.id,
      items: [],
    });
    this.setState({ title: '', symbol: '', id: new Date() });
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleChangeSymbol(e) {
    this.setState({ symbol: e.target.value });
  }

  render() {
    return (
      <Paper className={styles.root}>
        <Toolbar>
          <div>
            <Typography variant="title" id="tableTitle">
              Add new List
            </Typography>
          </div>
        </Toolbar>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={3} />
          <Grid item xs={12} sm={2}>
            <TextField
              label="Title"
              value={this.state.title}
              onChange={this.handleChangeTitle}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Symbol"
              value={this.state.symbol}
              onChange={this.handleChangeSymbol}
              margin="normal"
            />
            <Button onClick={this.handleButton} variant="raised" primary="true">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={3} />
        </Grid>
      </Paper>
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

ListForm.propTypes = {
  addList: PropTypes.func.isRequired,
  getLists: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.lists;

export default connect(mapStateToProps, mapDispatchToProps)(ListForm);
