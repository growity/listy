import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { connect } from 'react-redux';
import { addItemAsync, getItemsAsync } from '../actions/item';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      list_id: props.list.id,
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    props.getItems(this.state.list_id);
  }

  handleChangeTitle = (e, id) => {
    this.setState({ text: e.target.value, list_id: id });
  };

  handleButton = () => {
    if (this.state.list_id != null) {
      this.props.addItem(this.state);
      this.setState({ text: '', list_id: null });
    }
  };

  render() {
    const tableRows = this.props.list.items ? this.props.list.items.map(item => (
      <TableRow key={item.text}>
        <TableCell>{item.list_id}</TableCell>
        <TableCell>{item.text}</TableCell>
      </TableRow>
    )) :
      (
        <TableRow key={1} />
      );
    return (
      <Paper className={styles.root}>
        <Toolbar>
          <div>
            <Typography variant="title" id="tableTitle">
              List: { this.props.list.title }
            </Typography>
          </div>
        </Toolbar>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>ListId</TableCell>
              <TableCell>Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={3} />
          <Grid item xs={12} sm={6}>
            <TextField
              label="Add new item"
              value={this.state.text}
              onChange={e => this.handleChangeTitle(e, this.props.list.id)}
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
  addItem(itemArgument) {
    dispatch(addItemAsync(itemArgument));
  },
  getItems(listId) {
    dispatch(getItemsAsync(listId));
  },
});

const mapStateToProps = state => state.lists;

export default connect(mapStateToProps, mapDispatchToProps)(Item);
