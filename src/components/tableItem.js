import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { addItemAsync, getItemsAsync } from '../actions/item';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },
});

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      list_id: props.list.id,
      enterText: 'Enter item...',
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  componentDidMount() {
    this.props.getItems(this.state.list_id);
  }

  handleChangeTitle = (e, id) => {
    this.setState({ text: e.target.value, list_id: id });
  };

  handleButton = (e) => {
    if (e.key === 'Enter' && this.state.list_id != null) {
      this.props.addItem(this.state);
      this.setState({ text: '', list_id: null });
    }
  };

  render() {
    const { list, classes } = this.props;
    const Rows = list.items ? list.items.map((item, index) => (
      <ListItem button divider key={item.text + index}>
        <ListItemText primary={item.text} />
      </ListItem>
    )) : (
      <Divider />
    );
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={16}>
            <Grid key={0} item lg={6} md={6} sm={6}>
              <Paper className={classes.paper}>
                <List component="nav">
                  <ListItem button>
                    <b>{list.title}</b>
                  </ListItem>
                  <ListItem button>
                    <TextField
                      className={classes.textField}
                      label={this.state.enterText}
                      value={this.state.text}
                      onChange={e => this.handleChangeTitle(e, list.id)}
                      margin="normal"
                      onKeyDown={e => this.handleButton(e)}
                    />
                  </ListItem>
                  <Divider />
                  {Rows}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Item));
