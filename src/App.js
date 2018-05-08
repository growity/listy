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
            links: [],
            text: "",
            errorText: "",
        };
        this.handleButton = this.handleButton.bind(this);
    }

    handleButton() {

        if(this.state.text.length > 0) {
            if (this.isUrl(this.state.text)) {
                let links = this.state.links;
                links.push(this.state.text);
                this.setState({links: links});
                this.setState({errorText: ""});
            } else {
                this.setState({errorText: "Invalid URL"});
            }
            this.setState({text: ""});
        }
    }

    handleChangeInput(text) {
        this.setState({ text: text.target.value });
    }

    isUrl(url) {
        var regex = /(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?([-a-z\d_]*)?/;
        return regex.test(url);
    }

  render() {
        let tableRows = this.state.links.map( (link, index) => {
            return(
                <TableRow key={index}>
                    <TableRowColumn>{index + 1}</TableRowColumn>
                    <TableRowColumn>{link}</TableRowColumn>
                </TableRow>
            );
        });
    return (
        <div className="App">
        <AppBar
            title="Listy"
            iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <Table
                selectable={false}
                multiSelectable={false}
                showCheckboxes={false}>
                <TableHeader
                    displaySelectAll={false}
                    enableSelectAll={false}>

                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Link</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}>
                    {tableRows}
                </TableBody>
            </Table>
            <div style={styles.propContainer}>
                <TextField
                    floatingLabelText="Enter link"
                    value={this.state.text}
                    onChange={this.handleChangeInput.bind(this)}
                    errorText={this.state.errorText}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            this.handleButton();
                        }
                    }}
                />
                <RaisedButton onClick={this.handleButton} style={styles.submitStyle} label="Submit" primary={true} />
            </div>
        </div>
    );
  }
}

export default App;
