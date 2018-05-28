import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { issueListAsync, addIssueAsync } from '../actions/issue';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  checkBox: {
    overflow: 'hidden',
    margin: '20px 20px 0',
  },
});


class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
      title: '',
    };
    props.getIssues();
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  handleButton = () => {
    const issueParam = { title: this.state.title, isDone: this.state.isDone };
    this.props.addIssue(issueParam);
    this.setState({ title: '', isDone: false });
  };

  render() {
    const tableRows = this.props.issues ? this.props.issues.map(link => (
      <TableRow key={link.id}>
        <TableCell>{link.id}</TableCell>
        <TableCell>{link.title}</TableCell>
        <TableCell>{ String(link.isDone) }</TableCell>
      </TableRow>
    )) : null;
    return (
      <Paper className={styles.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status (Is done?)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
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
            <FormControlLabel
              style={styles.checkBox}
              control={
                <Checkbox
                  checked={this.state.isDone}
                  onChange={this.handleChange('isDone')}
                  value="isDone"
                />
              }
              label="Is done?"
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
  addIssue(issueArgument) {
    dispatch(addIssueAsync(issueArgument));
  },
  getIssues() {
    dispatch(issueListAsync());
  },
});

const mapStateToProps = state => state.issues;

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
