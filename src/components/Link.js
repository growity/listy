import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { isUrl, httpGet } from '../common/fetchHelpers';
import { addSiteAsync, siteListAsync } from '../actions/site';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  propContainer: {
    width: 400,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  submitStyle: {
    width: 'auto',
    margin: '0 10px 0',
  },
  table: {
    minWidth: 700,
  },
});


class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errorText: '',
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.onKeyPressInput = this.onKeyPressInput.bind(this);
  }

  componentWillMount() {
    this.props.getSiteList();
  }

  onKeyPressInput(e) {
    if (e.key === 'Enter') {
      this.handleButton();
    }
  }

  handleChangeInput(e) {
    this.setState({ text: e.target.value });
  }

  handleButton() {
    if (this.state.text.length > 0) {
      const url = this.state.text;

      if (isUrl(url)) {
        httpGet(url).then((response) => {
          let title = response.documentElement.querySelector('meta[property="og:title"]').getAttribute('content');
          if (title === null) {
            title = response.documentElement.querySelector('title').getAttribute('content');
          }

          let description = response.documentElement.querySelector('meta[property="og:description"]').content;
          if (description === null) {
            description = response.documentElement.querySelector('meta[name="description"]').getAttribute('content');
          }

          const image = response.documentElement.querySelector('meta[property="og:image"]').getAttribute('content');

          this.props.addNewSite({
            title,
            description,
            image,
            url,
          });
        }).catch((error) => {
          this.setState({ errorText: 'It failed!' });
          console.error('Error', error);
        });
        this.setState({ errorText: '' });
      } else {
        this.setState({ errorText: 'Invalid URL' });
      }
      this.setState({ text: '' });
    }
  }

  render() {
    const tableRows = this.props.sites ? this.props.sites.map(link => (
      <TableRow key={link.id}>
        <TableCell>{link.id}</TableCell>
        <TableCell>{link.title}</TableCell>
        <TableCell>{link.url}</TableCell>
      </TableRow>
    )) : null;
    return (
      <Paper className={styles.root}>
        <Toolbar>
          <div>
            <Typography variant="title" id="tableTitle">
              Link List
            </Typography>
          </div>
        </Toolbar>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter link"
              value={this.state.text}
              onChange={this.handleChangeInput}
              onKeyPress={this.onKeyPressInput}
              margin="normal"
            />
            <Button onClick={this.handleButton} variant="raised" primary="true">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} />
        </Grid>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewSite(site) {
    dispatch(addSiteAsync(site));
  },
  getSiteList() {
    dispatch(siteListAsync());
  },
});

const mapStateToProps = state => state.sites;

export default connect(mapStateToProps, mapDispatchToProps)(Link);
