import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';
import { isUrl, httpGet } from '../common/fetchHelpers';
import { addSiteAsync, siteListAsync } from '../actions/site';

const styles = {
  propContainer: {
    width: 400,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  submitStyle: {
    width: 'auto',
    margin: '0 10px 0',
  },
};


class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errorText: '',
    };
    props.getSiteList();
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.onKeyPressInput = this.onKeyPressInput.bind(this);
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
      <div>
        <Table>
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
        <div style={styles.propContainer}>
          <TextField
            label="Enter link"
            value={this.state.text}
            onChange={this.handleChangeInput}
            onKeyPress={this.onKeyPressInput}
          />
          <Button onClick={this.handleButton} style={styles.submitStyle} variant="raised" primary="true">
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewSite(newSiteObject) {
    dispatch(addSiteAsync(newSiteObject));
  },
  getSiteList() {
    dispatch(siteListAsync());
  },
});

const mapStateToProps = state => state.sites;

export default connect(mapStateToProps, mapDispatchToProps)(Link);
