import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { addItemAsync, getItemsAsync } from '../actions/item';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  expansion: {
    alignItems: 'center',
    display: 'block',
  },
  textField: {
    width: '100%',
    marginTop: 0,
    overflowX: 'auto',
  },
});

class TableItem extends React.Component {
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

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

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
    const { expanded } = this.state;
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
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{list.title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansion}>
                    <List component="nav">
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
                  </ExpansionPanelDetails>
                </ExpansionPanel>
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

TableItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TableItem));
