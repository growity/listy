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
            text: "",
            errorText: "",
            siteList: []
        };
        this.handleButton = this.handleButton.bind(this);
    }

    httpGet(theUrl)
    {
        return new Promise( (resolve, reject) => {
            let xmlhttp = new XMLHttpRequest();

            xmlhttp.responseType = 'document';
            xmlhttp.onload = function () {
                if(xmlhttp.status === 200) {
                    resolve(this.responseXML);
                }
                else {
                    reject(Error(this.statusText));
                }
            };

            xmlhttp.onerror = function () {
                reject(Error("Network Error"));
            };

            xmlhttp.open('GET', theUrl, true);
            xmlhttp.send();
        });
    }

    handleButton() {

        if(this.state.text.length > 0) {

            let prevSiteList = this.state.siteList;
            let self = this;
            const currentUrl = this.state.text;

            if (App.isUrl(currentUrl)) {

                this.httpGet(currentUrl).then(function (response) {

                    let title = response.documentElement.querySelector('meta[property="og:title"]').getAttribute("content");
                    if(title === null)
                    {
                        title = response.documentElement.querySelector('title').getAttribute("content");
                    }

                    let description = response.documentElement.querySelector('meta[property="og:description"]').getAttribute("content");
                    if(description === null)
                    {
                        description = response.documentElement.querySelector('meta[name="description"]').getAttribute("content");
                    }

                    let image = response.documentElement.querySelector('meta[property="og:image"]').getAttribute("content");

                    prevSiteList.push({title: title, description: description, image: image, url: currentUrl});
                    self.setState( ({ siteList: prevSiteList }) );
                }, function (error) {
                    self.setState({errorText: "Failed!"});
                }).catch(function(err) {
                    self.setState({errorText: "It failed!"});
                });
                this.setState({errorText: ""});
            } else {
                this.setState({errorText: "Invalid URL"});
            }
            this.setState({text: ""});
            console.log(this.state.siteList);
        }
    }

    handleChangeInput(text) {
        this.setState({ text: text.target.value });
    }

    static isUrl(url) {
        const regex = /(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?([-a-z\d_]*)?/;
        return regex.test(url);
    }

  render() {
        let tableRows = this.state.siteList.map( (link, index) => {
            return(
                <TableRow key={index}>
                    <TableRowColumn>{index + 1}</TableRowColumn>
                    <TableRowColumn>{link.title}</TableRowColumn>
                    <TableRowColumn>{link.url}</TableRowColumn>
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
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Url</TableHeaderColumn>
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
