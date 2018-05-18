import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux';
import { isUrl, httpGet } from './common/fetchHelpers';
import { addSite } from './actions/site';

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


class App extends Component {
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
    const tableRows = this.props.data.sites.map((link, index) => (
      <TableRow key={index}>
        <TableRowColumn>{index + 1}</TableRowColumn>
        <TableRowColumn>{link.title}</TableRowColumn>
        <TableRowColumn>{link.url}</TableRowColumn>
      </TableRow>
    ));
    return (
      <div className="App">
        <AppBar
          title="Listy"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Table
          selectable={false}
          multiSelectable={false}
          showCheckboxes={false}
        >
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
          >

            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Url</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {tableRows}
          </TableBody>
        </Table>
        <div style={styles.propContainer}>
          <TextField
            floatingLabelText="Enter link"
            value={this.state.text}
            onChange={this.handleChangeInput}
            errorText={this.state.errorText}
            onKeyPress={this.onKeyPressInput}
          />
          <RaisedButton onClick={this.handleButton} style={styles.submitStyle} label="Submit" primary />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewSite(newSiteObject) {
    dispatch(addSite(newSiteObject));
  },
});

const mapStateToProps = state => ({ data: state.sites });

export default connect(mapStateToProps, mapDispatchToProps)(App);
