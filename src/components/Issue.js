import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { issueListAsync, addIssueAsync, updateIssueStatusAsync } from '../actions/issue';

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
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  componentWillMount() {
    this.props.getIssues();
  }

  handleChange = name => (event) => {
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

  updateIssueStatusById = (issueId, statusIssue) => {
    this.props.updateIssuesStatus(issueId, statusIssue);
  };

  render() {
    const { issues } = this.props;
    const tableRows = issues ? issues.map(issue => (
      <TableRow key={issue.id}>
        <TableCell>{issue.id}</TableCell>
        <TableCell>{issue.title}</TableCell>
        <TableCell>
          <Checkbox
            checked={issue.isDone}
            onChange={() => this.updateIssueStatusById(issue.id, issue.isDone)}
          />
        </TableCell>
      </TableRow>
    )) : null;
    return (
      <Paper className={styles.root}>
        <Toolbar>
          <div>
            <Typography variant="title" id="tableTitle">
              Issues List
            </Typography>
          </div>
        </Toolbar>
        <Table className={styles.table}>
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
  addIssue(issue) {
    dispatch(addIssueAsync(issue));
  },
  getIssues() {
    dispatch(issueListAsync());
  },
  updateIssuesStatus(issueId, statusIssue) {
    dispatch(updateIssueStatusAsync(issueId, statusIssue));
  },
});

Issue.propTypes = {
  issues: PropTypes.array.isRequired,
  updateIssuesStatus: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  addIssue: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.issues;

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
