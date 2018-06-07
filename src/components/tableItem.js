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
import Downshift from 'downshift';
import MenuItem from '@material-ui/core/MenuItem';

import { addItemAsync, getItemsAsync, getItemsBySymbolAsync } from '../actions/item';

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
    zIndex: -991,
  },
  textField: {
    width: '100%',
    marginTop: 0,
    overflowX: 'auto',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    zIndex: 1,
    zDepth: 1,
    marginTop: theme.spacing.unit,
  },
  items: {
    flexGrow: 1,
    position: 'absolute',
    zIndex: 999,
  },
  item: {
    position: 'absolute',
    zIndex: 1000,
  },
});

function renderInput(inputProps) {
  const {
    InputProps,
    classes,
    ref,
    ...other
  } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.textField,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion(argSuggestion) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = argSuggestion;

  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.text) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.text}
    </MenuItem>
  );
}

class TableItem extends React.Component {
  constructor(props) {
    super(props);
    const { list } = props;
    this.state = {
      text: '',
      list_id: list.id,
      enterText: 'Enter item...',
      selectedItem: [],
      symbolItems: [],
      backspace: false,
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

  handleChangeDownshift = (item) => {
    let { selectedItem } = this.state;
    const words = this.state.text.split(' ');
    const lastWord = words[words.length - 1];
    let text = this.state.text;

    if (selectedItem.indexOf(lastWord[0].concat(item)) === -1) {
      selectedItem = [...selectedItem, lastWord[0].concat(item)];
      text = this.state.text.slice(0, this.state.text.length - (lastWord.length - 1));
      text = text.concat(item);
    }

    this.setState({
      text,
      backspace: true,
      selectedItem,
    });
  };

  handleChangeTitle = (e) => {
    this.setState({ text: e.target.value });
    const item = e.target.value.split(' ');
    const symbol = item[item.length - 1];
    if (symbol.length > 0 && symbol.replace(/\s/g, '').length > 0) {
      this.props.getItemsBySymbol(symbol, this.state.list_id);
    }

    if (symbol === '' || symbol[0].match(/^[A-Za-z]+$/)) {
      this.setState({ backspace: true });
    } else {
      this.setState({ backspace: false });
    }
  };

  handleButton = (e) => {
    if (e.key === 'Enter' && this.state.list_id != null) {
      this.props.addItem({
        id: new Date(),
        text: this.state.text,
        list_id: this.state.list_id,
        selectedItem: [],
      });
      this.setState({ text: '' });
    }
    const { text, selectedItem } = this.state;
    if (selectedItem.length && !text.length && e.key === 'Backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  render() {
    const { list, classes } = this.props;
    let items = this.props.symbolItems;
    const { text, selectedItem, expanded } = this.state;
    if (this.state.backspace === true) {
      items = [];
    }

    const Rows = list.items ? list.items.map(item => (
      <ListItem button divider key={item.id}>
        <ListItemText primary={item.text} />
      </ListItem>
    )) : (
      <Divider />
    );

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            <Grid key={0} item lg={6} md={6} sm={6}>
              <Paper className={classes.paper}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{list.title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansion}>
                    <List component="nav">
                      <Downshift inputValue={text} onChange={this.handleChangeDownshift} selectedItem={selectedItem}>
                        {({
                            getInputProps,
                            getItemProps,
                            isOpen,
                            inputValue: inputValue2,
                            selectedItem: selectedItem2,
                            highlightedIndex,
                          }) => (
                            <div className={classes.container}>
                              {renderInput({
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({
                                  onChange: this.handleChangeTitle,
                                  onKeyDown: this.handleButton,
                                  placeholder: 'Enter item...',
                                  id: 'integration-downshift-multiple',
                                }),
                              })}
                              <div className={classes.items}>
                                {isOpen ? (
                                  <Paper className={classes.paper} square>
                                    {items.map((suggestion, index) =>
                                      renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.text }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                      }))
                                    }
                                  </Paper>
                                ) : null}
                              </div>
                            </div>
                        )}
                      </Downshift>
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
  getItemsBySymbol(symbol, listId) {
    dispatch(getItemsBySymbolAsync(symbol, listId));
  },
});

const mapStateToProps = state => ({ symbolItems: state.lists.symbolItems });

TableItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TableItem));
