import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';
import { addProjectAsync, projectListAsync } from '../actions/project';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
    props.getProjects();
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }

  handleButton = () => {
    const projectParam = { title: this.state.title, description: this.state.description };
    this.props.addProject(projectParam);
    this.setState({ title: '', description: '' });
  };

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  render() {
    const tableRows = this.props.projects ? this.props.projects.map(link => (
      <TableRow key={link.id}>
        <TableCell>{link.id}</TableCell>
        <TableCell>{link.title}</TableCell>
        <TableCell>{link.description}</TableCell>
      </TableRow>
    )) : null;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
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
            <TextField
              label="Description"
              value={this.state.description}
              onChange={this.handleChangeDescription}
              margin="normal"
            />
            <Button onClick={this.handleButton} variant="raised" primary="true">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={3} />
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProject(projectArgument) {
    dispatch(addProjectAsync(projectArgument));
  },
  getProjects() {
    dispatch(projectListAsync());
  },
});

const mapStateToProps = state => state.projects;

export default connect(mapStateToProps, mapDispatchToProps)(Project);
